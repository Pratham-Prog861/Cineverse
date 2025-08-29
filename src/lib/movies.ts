export type Movie = {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  posterAiHint: string;
  releaseYear: number;
  rating: number;
  genre: string[];
  cast: string[];
  trailerUrl: string;
  movieUrl: string;
};

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Cosmic Odyssey',
    description:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://picsum.photos/400/600?random=1',
    posterAiHint: 'space galaxy',
    releaseYear: 2014,
    rating: 8.6,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 'The Silent Thief',
    description:
      'A skilled thief has a change of heart when he falls for the daughter of his latest target.',
    posterUrl: 'https://picsum.photos/400/600?random=2',
    posterAiHint: 'night city',
    releaseYear: 2022,
    rating: 7.8,
    genre: ['Crime', 'Thriller', 'Romance'],
    cast: ['Ryan Reynolds', 'Zoe Saldana', 'Ben Kingsley'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 3,
    title: 'Echoes of the Past',
    description:
      'A historian discovers a diary that transports her back to the 19th century, where she must navigate a world of political intrigue and forbidden love.',
    posterUrl: 'https://picsum.photos/400/600?random=3',
    posterAiHint: 'vintage letter',
    releaseYear: 2020,
    rating: 8.1,
    genre: ['Fantasy', 'Romance', 'History'],
    cast: ['Emilia Clarke', 'Sam Heughan', 'Charles Dance'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 4,
    title: 'Cybernetic Revolt',
    description:
      'In a futuristic city, a detective hunts down a rogue android that has developed self-awareness and is leading a rebellion.',
    posterUrl: 'https://picsum.photos/400/600?random=4',
    posterAiHint: 'futuristic robot',
    releaseYear: 2024,
    rating: 9.2,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    cast: ['Keanu Reeves', 'Carrie-Anne Moss', 'Laurence Fishburne'],
    trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 5,
    title: 'Beneath the Waves',
    description: 'A marine biologist on a deep-sea expedition discovers a previously unknown species and a hidden underwater civilization.',
    posterUrl: 'https://picsum.photos/400/600?random=5',
    posterAiHint: 'underwater ocean',
    releaseYear: 2019,
    rating: 7.5,
    genre: ['Adventure', 'Mystery', 'Sci-Fi'],
    cast: ['Jason Statham', 'Li Bingbing', 'Rainn Wilson'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 6,
    title: 'The Last Stand',
    description: 'A small town sheriff and his deputies must defend their home from a cartel leader and his army of mercenaries.',
    posterUrl: 'https://picsum.photos/400/600?random=6',
    posterAiHint: 'desert town',
    releaseYear: 2013,
    rating: 6.3,
    genre: ['Action', 'Crime'],
    cast: ['Arnold Schwarzenegger', 'Forest Whitaker', 'Johnny Knoxville'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 7,
    title: 'A Journey Within',
    description:
      'A burnt-out executive embarks on a spiritual journey to the Himalayas, finding more than just peace of mind.',
    posterUrl: 'https://picsum.photos/400/600?random=7',
    posterAiHint: 'mountain landscape',
    releaseYear: 2018,
    rating: 8.9,
    genre: ['Drama', 'Adventure', 'Comedy'],
    cast: ['Julia Roberts', 'Richard Jenkins', 'Javier Bardem'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 8,
    title: 'Zero Hour',
    description: 'A team of elite soldiers are sent on a mission to stop a global terrorist organization from launching a deadly weapon.',
    posterUrl: 'https://picsum.photos/400/600?random=8',
    posterAiHint: 'soldier silhouette',
    releaseYear: 2023,
    rating: 7.1,
    genre: ['Action', 'Thriller', 'War'],
    cast: ['Chris Hemsworth', 'Idris Elba', 'Olga Kurylenko'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 9,
    title: 'The Alchemist\'s Secret',
    description: 'A young apprentice uncovers his master\'s dark secret, a powerful artifact that could change the world forever.',
    posterUrl: 'https://picsum.photos/400/600?random=9',
    posterAiHint: 'fantasy potion',
    releaseYear: 2017,
    rating: 8.3,
    genre: ['Fantasy', 'Adventure', 'Family'],
    cast: ['Tom Holland', 'Zendaya', 'Jake Gyllenhaal'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    id: 10,
    title: 'City of Laughs',
    description: 'A struggling stand-up comedian gets his big break, but finds that fame comes with a price.',
    posterUrl: 'https://picsum.photos/400/600?random=10',
    posterAiHint: 'microphone stage',
    releaseYear: 2019,
    rating: 9.0,
    genre: ['Comedy', 'Drama'],
    cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz'],
    trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY',
    movieUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
];
