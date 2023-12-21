import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library"; 

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
 
export const GET = async ({url}:any)=>{
    const redirectURL = 'http://localhost:5173/oauth';
    const url_search: string = window.location.search;
    const url_params: URLSearchParams = new URLSearchParams(url_search);
    const code_param: string | null = url_params.get('code');
    
    try{
        const oAuth2Client = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            redirectURL
        );

        if(code_param)
        {
            const r = await oAuth2Client.getToken(code_param);

            if(r) 
            {
                oAuth2Client.setCredentials(r.tokens);
                console.log('Auth Tokens received');
                const user = oAuth2Client.credentials;
                console.log('Credentials', user);
            }
        }
    }catch(err){
        console.log("Error logging in with Google", err)
    }
    throw redirect(303,'http://localhost:5173');
}