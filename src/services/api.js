import axios from 'axios';

const API_BASE_URL = 'https://caffinity-api.vercel.app/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getProducts = async (
  sort = "-createdAt,price,-ratingsAverage",
  params = {},
) => {
  try {
    const response = await apiClient.get("/products", {
      params: {
        sort,
        ...params,
      },
    });

    // Handle different API response formats: { data: [...] }, { data: { data: [...] } }, or [...]
    const result = response.data;

    if (Array.isArray(result)) {
      return result;
    }

    if (result && Array.isArray(result.data)) {
      return result.data;
    }

    if (result && result.data && Array.isArray(result.data.data)) {
      return result.data.data;
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    const result = response.data;

    if (result && result.data) {
      // If result.data is an object containing product
      if (result.data._id) return result.data;
      if (result.data.data && result.data.data._id) return result.data.data;
    }
    return result.data || result;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export default apiClient;
