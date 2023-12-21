import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const actions={
    OAuth2: async({})=>
    {
        const redirectURL = 'http://localhost:5173/oauth';
        const oAuth2Client = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            redirectURL
        )
        const authorize_url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope:'https://www.googleapis.com/auth/userinfo.profile openid',
            prompt: 'consent'
        });
        throw redirect(302,authorize_url);
    }
}