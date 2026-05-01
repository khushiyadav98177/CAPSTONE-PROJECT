export const mockMovies = [
  {
    id: 1,
    title: "Cyberpunk City",
    name: "Cyberpunk City",
    overview: "In a dystopian future, a rogue AI hunter discovers a secret that could shatter the fragile balance of power between megacorporations and the underground resistance.",
    backdrop_path: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=500&auto=format&fit=crop",
    vote_average: 8.5,
    first_air_date: "2023-10-15",
    adult: false
  },
  {
    id: 2,
    title: "Neon Dreams",
    name: "Neon Dreams",
    overview: "A visually stunning journey through the mind of an artist who paints with light and shadow in a futuristic metropolis.",
    backdrop_path: "https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=500&auto=format&fit=crop",
    vote_average: 9.1,
    first_air_date: "2024-01-20",
    adult: true
  },
  {
    id: 3,
    title: "The Silent Forest",
    name: "The Silent Forest",
    overview: "A group of explorers uncover ancient mysteries hidden deep within an uncharted, perpetually misty forest.",
    backdrop_path: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=500&auto=format&fit=crop",
    vote_average: 7.8,
    first_air_date: "2022-11-05"
  },
  {
    id: 4,
    title: "Stellar Odyssey",
    name: "Stellar Odyssey",
    overview: "When Earth faces a catastrophic cosmic event, humanity's last hope rests on an experimental faster-than-light vessel and its intrepid crew.",
    backdrop_path: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop",
    vote_average: 8.9,
    first_air_date: "2025-05-12"
  },
  {
    id: 5,
    title: "Urban Samurai",
    name: "Urban Samurai",
    overview: "A modern-day warrior must navigate the treacherous criminal underworld to rescue his master's stolen heirloom.",
    backdrop_path: "https://images.unsplash.com/photo-1542051812871-757500850269?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1542051812871-757500850269?q=80&w=500&auto=format&fit=crop",
    vote_average: 8.2,
    first_air_date: "2021-08-30"
  },
  {
    id: 6,
    title: "Ocean's Echo",
    name: "Ocean's Echo",
    overview: "Deep sea divers stumble upon a submerged city that shouldn't exist, awakening dormant guardians.",
    backdrop_path: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=500&auto=format&fit=crop",
    vote_average: 7.5,
    first_air_date: "2023-03-14"
  },
  {
    id: 7,
    title: "Desert Mirage",
    name: "Desert Mirage",
    overview: "Survival takes a hallucinatory turn when scavengers get lost in the endless dunes of a forgotten wasteland.",
    backdrop_path: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=500&auto=format&fit=crop",
    vote_average: 8.0,
    first_air_date: "2024-07-22"
  },
  {
    id: 8,
    title: "Midnight Racing",
    name: "Midnight Racing",
    overview: "High-stakes underground racing where drivers wager not just cars, but their very freedom.",
    backdrop_path: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920&auto=format&fit=crop",
    poster_path: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=500&auto=format&fit=crop",
    vote_average: 8.7,
    first_air_date: "2023-11-18"
  }
];

// Helper to shuffle array for variety in rows
export const getMockMovies = () => {
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  return shuffled;
};

export const getMockHero = () => {
  return mockMovies[Math.floor(Math.random() * mockMovies.length)];
};
