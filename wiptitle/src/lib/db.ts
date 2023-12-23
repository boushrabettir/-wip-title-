import { Pool, PoolClient, QueryResult } from 'pg';
import { SongList, SongObject } from './song';

const TABLE_NAME: String = "";


export const instantiate_connection = async(): Promise<PoolClient> => {
    const db: Pool = new Pool({ connectionString: process.env.DB_URI });
    const live_client: PoolClient = await db.connect();
    
    return live_client;
}

export const deinstantiate_connection = async(live_client: PoolClient): Promise<null> => {
    await live_client.release();
    return null;
}

export const create = () => {}

const is_link_same = (current_link: string, new_link: string): boolean => {
    return current_link === new_link;
}

export const update_links_db = async(current_song: SongObject): Promise<null> => {
    const ARTIST_NAME: string = current_song.artist_name;
    const YOUTUBE_LINK: [string, string] | null = current_song.youtube;
    const SPOTIFY_LINK: [string, string] |  null = current_song.spotify;

    const CONNECTED_CURSOR: PoolClient = await instantiate_connection();
    

    try {
        const query: QueryResult = await CONNECTED_CURSOR.query(
            `SELECT * FROM ${TABLE_NAME} WHERE ARTIST_NAME = $1`,
            [ARTIST_NAME]
        );

        const found_artist: any[] = query.rows;
        if (found_artist.length > 0) {
            let { artist_name, youtube, spotify}: SongObject = found_artist[0];

            if (youtube && YOUTUBE_LINK && !(is_link_same(youtube[1], YOUTUBE_LINK[1]))) {
                await CONNECTED_CURSOR.query(
                    {
                        text: `UPDATE ${TABLE_NAME} SET youtube = $1 WHERE artist = $2`,
                        values: [YOUTUBE_LINK, artist_name]
                    }
                );
            };

            if (spotify && SPOTIFY_LINK && !(is_link_same(spotify[1], SPOTIFY_LINK[1]))) {
                await CONNECTED_CURSOR.query(
                    {
                        text: `UPDATE ${TABLE_NAME} SET spotify = $1 WHERE artist = $2`,
                        values: [SPOTIFY_LINK, artist_name]
                    }
                );                
            };

        }

    } catch {
        throw new Error("");
    } finally {

        await deinstantiate_connection(CONNECTED_CURSOR);

    }
    
    return null;
}

export const add_song_row_in_db = async(current_song: SongObject): Promise<null> => {
    const ARTIST_NAME: string = current_song.artist_name;
    const YOUTUBE_LINK: [string, string] | null = current_song.youtube;
    const SPOTIFY_LINK: [string, string] |  null = current_song.spotify;

    const CONNECTED_CURSOR = await instantiate_connection();

    try {

        await CONNECTED_CURSOR.query(
            {
                text: `INSERT INTO ${TABLE_NAME} (artist, youtube, spotify) VALUES ($1, $2, $3)`,
                values: [ARTIST_NAME, YOUTUBE_LINK, SPOTIFY_LINK]
            }
        );

    } catch {
        throw new Error("");
    } finally {

        await deinstantiate_connection(CONNECTED_CURSOR);

    }
    return null;
}

export const query_song = async(artist_name: string, youtube_link: string): Promise<[string, string, string] | null> => {

    // TODO 
    // discuss with group

    return Promise.resolve(['value1', 'value2', 'value3']);

}

export const delete_song = async(artist_name: string, song_name: string): Promise<null> => {
    // TODO
    // discuss with group

    return null;
}