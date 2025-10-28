export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformInfo {
  platform: Platform;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
}

export interface StoreInfo {
  store: Store;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description?: string;
  description_raw?: string;
  metacritic?: number;
  metacritic_platforms?: any[];
  released?: string;
  tba: boolean;
  updated: string;
  background_image?: string;
  background_image_additional?: string;
  website?: string;
  rating: number;
  rating_top: number;
  ratings: any[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: any;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url?: string;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  short_screenshots: Screenshot[];
  parent_platforms: { platform: Platform }[];
  platforms: PlatformInfo[];
  stores?: StoreInfo[];
  developers: Developer[];
  genres: Genre[];
  tags: any[];
  publishers: Developer[];
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  };
  clip?: any;
  user_game?: any;
}

export interface GamesResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Game[];
}

export interface LegacyGame {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  screenshots?: string[];
  genres?: string[];
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  rating?: number;
  platforms?: string[];
}