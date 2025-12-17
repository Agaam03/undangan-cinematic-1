import { WeddingData } from "../types";

 
export const WEDDING_DATA: WeddingData = {
  metadata: {
    title: 'Ciputra & Azizah - A Journey Begins',
    description: 'We invite you to celebrate our wedding in Kyoto, Japan.',
  },
  hero: {
    videoUrl: "https://res.cloudinary.com/dyk3nghtf/video/upload/f_auto,q_auto:best/Engagement_day_ghdwkw.mp4",
    targetDate: '2026-07-14T00:00:00',
    location: 'Kyoto, Japan',
    // Tambahkan poster untuk hero
    posterUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop',
  } as any, // Bypass type temporarily for the new field
  intro: {
    title: 'WE INVITE YOU TO JOIN US AS WE\nEXCHANGE VOWS AND CELEBRATE THE LOVE\nTHAT HAS BROUGHT US HERE.',
    description: 'A journey years in the making, now culminating in a moment we can\'t wait to share with you. We hope you can join us in the beautiful city of Kyoto.',
    verseText: '"And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy."',
    verseReference: 'Ar-Rum 30:21',
  },
  couple: {
    groom: {
      name: 'Leo Alexander',
      firstName: 'Ciputra',
      role: 'The Groom',
      handle: '@leo.alexander',
      instagramUrl: 'https://instagram.com',
      photoUrl: 'https://picsum.photos/600/800?random=10',
    },
    bride: {
      name: 'Kaia Amara',
      firstName: 'Azizah',
      role: 'The Bride',
      handle: '@kaia.amara',
      instagramUrl: 'https://instagram.com',
      photoUrl: 'https://picsum.photos/600/800?random=11',
    },
  },
  schedule: [
    {
      id: 'event-1',
      date: '14th July 2026',
      title: 'Akad\nNikah',
      primaryTime: '5:00 PM',
      primaryLocation: 'Hyatt Regency Kyoto',
      imageMain: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
      imageDetail: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=500&auto=format&fit=crop',
    },
    {
      id: 'event-2',
      date: '15th July 2026',
      title: 'Ceremony &\nReception',
      imageMain: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      subEvents: [
        { time: '3:00 PM', title: 'Ceremony', location: 'at Kinkaku-ji' },
        { time: '5:00 PM', title: 'Welcome Drink', location: 'at The Ritz-Carlton Kyoto' },
        { time: '6:30 PM', title: 'Reception', location: 'at The Ritz-Carlton Kyoto' },
      ]
    }
  ],
  loveStory: {
    title: 'Our Love Story',
    quote: '"We loved with a love that was more than love."',
    quoteAuthor: '— Edgar Allan Poe',
    videoUrl: "https://res.cloudinary.com/dyk3nghtf/video/upload/f_auto,q_auto:best/Engagement_day_ghdwkw.mp4",
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop', // Poster story
    estYear: 'Est. 2023',
    stories: [
      {
        title: 'How We Met',
        content: 'It started with a chance encounter at a local coffee shop in Kyoto. Rain was pouring down, and we both reached for the last umbrella in the rack. That awkward laugh turned into a conversation that lasted for hours.'
      },
      {
        title: 'The Proposal',
        content: 'Three years later, under the cherry blossoms of Maruyama Park, Leo got down on one knee. It was simple, private, and absolutely perfect.'
      }
    ]
  } as any,
  gallery: {
    title: 'Captured Moments',
    images: [
      { src: 'https://picsum.photos/600/900?random=1', spanClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2' },
      { src: 'https://picsum.photos/900/600?random=2', spanClass: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' },
      { src: 'https://picsum.photos/600/900?random=3', spanClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2' },
      { src: 'https://picsum.photos/600/600?random=4', spanClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
      { src: 'https://picsum.photos/600/600?random=5', spanClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
      { src: 'https://picsum.photos/600/600?random=6', spanClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
      { src: 'https://picsum.photos/900/600?random=7', spanClass: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' },
      { src: 'https://picsum.photos/600/600?random=8', spanClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
      { src: 'https://picsum.photos/900/500?random=9', spanClass: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' },
      { src: 'https://picsum.photos/900/500?random=10', spanClass: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' },
    ]
  },
  gift: {
    description: 'Your blessing is the greatest gift we could ask for. However, if you wish to honor us with a token of love, we have provided the following options.',
    accounts: [
      {
        bankName: 'BCA',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png',
        accountNumber: '123 456 7890',
        holderName: 'Leo Alexander'
      },
      {
        bankName: 'MANDIRI',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png',
        accountNumber: '098 765 4321',
        holderName: 'Kaia Amara'
      }
    ],
    address: {
      street: 'Jalan Bunga Sakura No. 88, Cluster Kyoto',
      city: 'Jakarta Selatan, DKI Jakarta 12345',
      receiver: 'Leo & Kaia'
    }
  },
  rsvp: {
    deadline: 'January 1st, 2026'
  },
  footer: {
    hashtags: ['#KaiaLeoBegin', '#KyotoLoveStory'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com' }
    ],
    backgroundImage: 'https://picsum.photos/900/500?random=10'
  }
};