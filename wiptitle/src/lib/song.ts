export interface SongObject {
    artist_name: string;
    youtube: [string, string] | null;
    spotify: [string, string] | null;
};

export interface SongList {
    list_of_songs: SongObject[];
};

export class Convert {
    private song_list: SongList;

    constructor(song_list: SongList) {
        this.song_list = song_list;
    }

    public create_playlist = (): string => {
        return "";
    }
    
    // does playlist exist
    // add song
    // spotify to youtube, youtube to spotify
    // deelte songs in -playulist
}   