import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';

dotenv.config();

const check_envs = () => {
    const CLIENT_ID = process.env.SECRET_GOOGLE_ID;
    const CLIENT_SECRET = process.env.SECRET_GOOGLE_CLIENT;

    if (CLIENT_ID && CLIENT_SECRET) {
        return {'CLIENT_ID':CLIENT_ID, 'CLIENT_SECRET': CLIENT_SECRET}
    }
    console.error("");
}

const instaniate_connection = () => {
    const res = check_envs();
    if (res){
        const client = new OAuth2Client(
            res["CLIENT_ID"],
            res["CLIENT_ID"]
        );
        if (client) {
            return google.youtube({
                version: 'v3',
                auth: client
            });
        }
    }
}


export async function fetchYoutubeData(): Promise<any> {
    console.log('WE ARE ABOUT TO START');
    let connection = instaniate_connection();
    if (connection){
        try{
            const {data} = await connection.playlists.list({
                key:"AIzaSyAn11Ne-zT0CnV5Qa_5_iVdQtCqQRfyTgw",
                channelId:'UC8Z9bpoFO2qTwE90ODhZQ9A'
            });
            
            if (data) {
                console.log(data);
            } 
            return data;
        } catch(error){
            console.log('We got an error');
        }
        console.log('WE ARE FINISHED');
    }

}