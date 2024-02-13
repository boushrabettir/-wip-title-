import * as dotenv from 'dotenv';

dotenv.config()

function initGapi(apiKey: string, clientId: string, discoveryDocs: string[], scopes: string[]) {
  return new Promise<void>((resolve, reject) => {
      gapi.load('client:auth2', async () => {
          try {
              await gapi.client.init({
                  apiKey,
                  clientId,
                  discoveryDocs,
                  scope: scopes.join(' ')
              });
              resolve();
          } catch (error) {
              reject(error);
          }
      });
  });
}


async function getUserPlaylists() {
  try {
      // Ensure gapi is initialized
      if (!gapi.auth2.getAuthInstance()) {
          throw new Error('gapi is not initialized. Call initGapi() first.');
      }

      // Authenticate the user
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      if (!user.isSignedIn()) {
          throw new Error('User is not signed in.');
      }

      // Fetch playlists
      const response = await gapi.client.youtube.playlists.list({
          part: 'snippet',
          mine: true
      });

      // Extract playlist information
      const playlists = response.result.items.map((playlist: any) => ({
          id: playlist.id,
          title: playlist.snippet.title
      }));

      return playlists;
  } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
  }
}

export async function main() {
  try {
      // Initialize gapi
      await initGapi('', '', ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'], ['https://www.googleapis.com/auth/youtube.readonly']);

      // Fetch and log user's playlists
      const playlists = await getUserPlaylists();
      console.log('User Playlists:', playlists);
  } catch (error) {
      console.error('Error:', error);
  }
}


main();