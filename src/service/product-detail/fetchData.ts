import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get('/api/products/fetch/');
    return data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error: ${error.message}`);
    }
  }
};
