export interface Game {
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