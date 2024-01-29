import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

export async function listPlaylists(channelId:string) {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.SECRET_GOOGLE_CLIENT;

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Missing required variables: CLIENT_ID or CLIENT_SECRET');
    }
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    const youtube = google.youtube({version: 'v3', auth:oauth2Client})

    try {
        const res = await youtube.playlists.list({
            channelId,  
        });
        console.log(res.data)
        return res.data;
    } catch(error){ 
        console.error('Error fetching playlists:', error);
        throw error;
    }
}
export default listPlaylists;