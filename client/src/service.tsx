import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IGetProducts } from "./models/IGetProducts";
const baseUrl = process.env.REACT_APP_BASE_URL


const config = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' }
});

// get data
export const getProducts = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/products', {}, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}