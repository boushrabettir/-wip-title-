import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.SECRET_GOOGLE_CLIENT;
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET
);

const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
});

const res = await youtube.playlists.list({
    channelId:'UC8Z9bpoFO2qTwE90ODhZQ9A'
});

console.log(res.data); 