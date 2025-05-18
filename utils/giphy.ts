import axios from 'axios';

export const searchGifs = async (searchTerm: string): Promise<string[]> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: import.meta.env.VITE_GIPHY_API_KEY || 'MJl1g7gKCMiKc5NTLi37d2FKBgmXUkT6', 
        q: searchTerm,
        limit: 3,
        rating: 'g'
      }
    });

    if (response.status === 200) {
      return response.data.data.map((gif: any) => gif.images.original.url);
    } else {
      console.error('API response error:', response.status, response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    return [];
  }
};