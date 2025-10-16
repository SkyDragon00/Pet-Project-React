import type { Game } from '../types/Game';

export const sampleGames: Game[] = [
  {
    id: 1,
    name: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamour, and ceaseless body modification.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=200&fit=crop"
    ],
    genres: ["RPG", "Action", "Open World"],
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "December 10, 2020",
    rating: 7.5,
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 2,
    name: "The Witcher 3: Wild Hunt",
    description: "As war rages on throughout the Northern Realms, you take on the contract to track down Ciri, the Child of Destiny, a living weapon that can alter the shape of the world.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
    ],
    genres: ["RPG", "Fantasy", "Open World"],
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "May 19, 2015",
    rating: 9.3,
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"]
  },
  {
    id: 3,
    name: "Valorant",
    description: "Valorant is a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.",
    price: 0,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop"
    ],
    genres: ["FPS", "Tactical", "Competitive"],
    developer: "Riot Games",
    publisher: "Riot Games",
    releaseDate: "June 2, 2020",
    rating: 8.1,
    platforms: ["PC"]
  },
  {
    id: 4,
    name: "Elden Ring",
    description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    ],
    genres: ["RPG", "Souls-like", "Fantasy"],
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    releaseDate: "February 25, 2022",
    rating: 9.5,
    platforms: ["PC", "PlayStation", "Xbox"]
  },
  {
    id: 5,
    name: "Minecraft",
    description: "Minecraft is a game made up of blocks, creatures, and community. You can survive the night or build a work of art – the choice is all yours.",
    price: 26.95,
    image: "https://images.unsplash.com/photo-1606142116054-8a64fac817d2?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1606142116054-8a64fac817d2?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
    ],
    genres: ["Sandbox", "Survival", "Creative"],
    developer: "Mojang Studios",
    publisher: "Microsoft",
    releaseDate: "November 18, 2011",
    rating: 8.7,
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"]
  },
  {
    id: 6,
    name: "Counter-Strike 2",
    description: "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe.",
    price: 0,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=200&fit=crop"
    ],
    genres: ["FPS", "Tactical", "Competitive"],
    developer: "Valve",
    publisher: "Valve",
    releaseDate: "September 27, 2023",
    rating: 8.3,
    platforms: ["PC"]
  }
];