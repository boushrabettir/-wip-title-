"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
var dotenv = require("dotenv");
dotenv.config();
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.SECRET_GOOGLE_CLIENT;
var oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
var youtube = googleapis_1.google.youtube({
    version: 'v3',
    auth: oauth2Client
});
var res = await youtube.playlists.list({
    channelId: 'UC8Z9bpoFO2qTwE90ODhZQ9A'
});
console.log(res.data);
