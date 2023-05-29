import '@/styles/globals.css';
import axios from 'axios';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.log(error);
      }
    }, 4 * 60 * 1000); // Refresh every 5 minutes (5 minutes * 60 seconds * 1000 milliseconds)

    return () => clearInterval(refreshInterval); // Clear the interval when the component is unmounted
  }, []);

  return <Component {...pageProps} />;
}

async function refreshAccessToken() {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
    console.log(response.data.access);
    localStorage.setItem('access_token', response.data.access);
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
