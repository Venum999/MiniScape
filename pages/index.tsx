import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the GameCanvas component with no SSR
// This is necessary since Three.js uses browser APIs
const DynamicGameCanvas = dynamic(() => import('../components/GameCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '100%', 
      fontSize: '24px',
      fontWeight: 'bold' 
    }}>
      Loading game engine...
    </div>
  ),
});

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the socket server by making a fetch request to the socket API endpoint
    const initializeSocket = async () => {
      try {
        await fetch('/api/socket');
        console.log('Socket server initialized');
      } catch (error) {
        console.error('Failed to initialize socket server:', error);
      }
    };

    // Simulate loading process
    const timer = setTimeout(async () => {
      // Initialize socket connection before showing the game
      await initializeSocket();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>MiniScape - Browser MMO</title>
        <meta name="description" content="A browser-based MMO inspired by RuneScape" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: '100%', height: '100%' }}>
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100%', 
            fontSize: '24px',
            fontWeight: 'bold' 
          }}>
            Game is loading...
          </div>
        ) : (
          <DynamicGameCanvas />
        )}
      </main>
    </div>
  );
};

export default Home; 