import os

from googleapiclient.discovery import build

from dotenv import load_dotenv

load_dotenv()

YT_KEY = os.getenv("YT_KEY")

youtube = build('youtube', 'v3', developerKey=YT_KEY)

request = youtube.playlists().list(
    part="snippet",
    channelId="UC8Z9bpoFO2qTwE90ODhZQ9A",
    maxResults=25
)

response = request.execute()

playlist_ids = [item['id'] for item in response['items']]
print(playlist_ids)
print(response)

# how to get channel ID? (need to look into this)
# 1. We should check if a playlist with the same name already exists, if it does skip creation
# 2. If that playlist does not exist we make a new playlist and then we have to look for all the songs that we are going to transfer into that playlist