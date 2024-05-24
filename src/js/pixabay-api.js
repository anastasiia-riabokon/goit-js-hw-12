import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

export const searchParams = {
  query: '',
  perPage: 15,
  maxPage: 1,
  currentPage: 1,
};

export async function searchPhoto(query, page) {
  const API_KEY = '43980241-153c3487497bc06835a433946';

  const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: page,
    },
  });

  return response.data;
}
