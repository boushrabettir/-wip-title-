import { google } from 'googleapis';
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
        const oauth2Client = new google.auth.OAuth2(
            res["CLIENT_ID"],
            res["CLIENT_SECRET"]
        );
    
        if (oauth2Client) {
            return google.youtube({
                version: 'v3',
                auth: oauth2Client
            });
        }
    }
}


export async function fetchYoutubeData(): Promise<any> {
    console.log('WE ARE ABOUT TO START');
    let connection = instaniate_connection();
    if (connection){
        try{
            const res = await connection.playlists.list({
                channelId:'UC8Z9bpoFO2qTwE90ODhZQ9A'
            });
            if (res) {
                console.log(res.data);
            } 
            return res;
        } catch(error){
            console.log('We got an error');
        }
        console.log('WE ARE FINISHED');
    }

}