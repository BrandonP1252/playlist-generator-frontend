export interface PlaylistItemType {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
    owner: {
        external_urls: { spotify: string };
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: { href: string; total: number };
    type: string;
    uri: string;
}

export interface SpotifyImage {
    url: string;
    height?: number;
    width?: number;
}

export interface SpotifyExternalUrl {
    spotify: string;
}

export interface SpotifyArtist {
    external_urls: SpotifyExternalUrl;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrl;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: SpotifyArtist[];
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc?: string;
        ean?: string;
        upc?: string;
    };
    external_urls: SpotifyExternalUrl;
    href: string;
    id: string;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url?: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export interface SpotifyTrackItem {
    added_at: string;
    is_local: boolean;
    track: SpotifyTrack;
}

export interface SpotifyTracks {
    href: string;
    items: SpotifyTrackItem[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

export interface SpotifyOwner {
    external_urls: SpotifyExternalUrl;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

export interface PlaylistType {
    collaborative: boolean;
    description: string;
    external_urls: SpotifyExternalUrl;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: SpotifyOwner;
    public: boolean;
    snapshot_id: string;
    tracks: SpotifyTracks;
    type: string;
    uri: string;
}
