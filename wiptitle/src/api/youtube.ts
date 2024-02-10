
import { google } from 'googleapis';
import path from 'path';
import { authenticate } from '@google-cloud/local-auth';

// initialize the Youtube API library
const youtube = google.youtube('v3');

export async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../client_secret.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  });
  google.options({auth});

  // the first query will return data with an etag
  const res = await getPlaylistData(null);
  const etag = res.data.etag;
  console.log(`etag: ${etag}`);

  // the second query will (likely) return no data, and an HTTP 304
  // since the If-None-Match header was set with a matching eTag
  const res2 = await getPlaylistData(etag ?? null);
  console.log(res2.status);
}

async function getPlaylistData(etag: string | null) {
  // Create custom HTTP headers for the request to enable use of eTags
  const headers: Record<string, string> = {};
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  const res = await youtube.playlists.list({
    channelId: 'UC8Z9bpoFO2qTwE90ODhZQ9A',
  });
  console.log('Status code: ' + res.status);
  console.log(res.data);
  return res;
}
