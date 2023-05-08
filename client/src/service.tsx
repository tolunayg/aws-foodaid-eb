import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IGetProducts } from "./models/IGetProducts";
const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = "http://localhost:5000"
const baseToken = '123'


const config = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' }
});

const configAuth0 = axios.create({
  baseURL: 'https://fars-metu.eu.auth0.com/oauth/token',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'audience': 'https://fars-metu.eu.auth0.com/api/v2/',
    'client_id': 'KGW6SDS3zMrecFa5XX3XnJjUoTIszDWu',
    'client_secret': 'A7kjY0HwyAVO0yL_fgqKVnfcjyrTVWGVTCyrZY7Zi1DZ0KRGIuSqMi5z_rHB96d9',
    'grant_type': 'password'
  },
  withCredentials: true
});

export const login = async (username: string, password: string) => {
  const headers = {
    username: username,
    password: password
  };
  try {
    return await configAuth0.get('/oauth/token', { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all products
export const getProducts = async (accessToken: string) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/products', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get product by id
export const getProductById = async (accessToken: string, productId: number) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/products/${productId}`, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create product
export const createProduct = async (accessToken: string, product: {} ) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/products', product, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create product
export const updateProduct = async (accessToken: string, productId: number, product: {} ) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.put(`/api/products/${productId}`, product, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



// get all distributionPoints
export const getDistributionPoints = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/distribution-points', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get distributionPoint by id
export const getDistributionPointById = async (accessToken: string, distributionPointId: number) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/distribution-points/${distributionPointId}`, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create product
export const createDistributionPoint = async (accessToken: string, distributionPoint: {} ) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/distribution-points', distributionPoint, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create product
export const updateDistributionPoint = async (accessToken: string, distributionPointId: number, distributionPoint: {} ) => {
  const headers = {
    // Authorization: `Bearer ${accessToken}`,
    Authorization: `Bearer ${baseToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.put(`/api/distribution-points/${distributionPointId}`, distributionPoint, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
