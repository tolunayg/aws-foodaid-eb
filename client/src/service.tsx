import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IGetProducts } from "./models/IGetProducts";
import { IGetInventories } from "./models/IGetInventories";
const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = "http://localhost:5000"

const config = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

export const login = async (username: string, password: string) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const requestBody = {
    username: username,
    password: password,
  };
  try {
    const response = await config.post('/api/auth/login', requestBody, { headers });
    console.log("response", response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// get all products
export const getProducts = async (accessToken: string) => {

  const headers = {
    Authorization: `Bearer ${accessToken}`,
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
export const getProductById = async (accessToken: string, productId: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
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
export const createProduct = async (accessToken: string, product: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
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
export const updateProduct = async (accessToken: string, productId: number, product: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
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

// get all demands
export const getDemands = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/demands', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get demand by id
export const getDemandById = async (accessToken: string, demandId: number) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/demands/${demandId}`, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create Demand
export const createDemand = async (accessToken: string, demand: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/demands', demand, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get all product categories
export const getProductCategories = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/product-categories', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get product category by id
export const getProductCategoryById = async (accessToken: string, productCategoryId: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/product-categories/${productCategoryId}`, { headers });

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
export const getDistributionPointById = async (accessToken: string, distributionPointId: string) => {
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
export const createDistributionPoint = async (accessToken: string, distributionPoint: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
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
export const updateDistributionPoint = async (accessToken: string, distributionPointId: number, distributionPoint: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
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


// get all inventoryData
export const getInventory = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/inventories', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// add inventory
export const addInventory = async (accessToken: string, inventory: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/inventories', inventory, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// get all collectionPoints
export const getCollectionPoints = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/collection-points', { headers });
    return response.data;


  } catch (error) {
    console.error(error);
    throw error;
  }
}


// get collectionPoints by id
export const getCollectionPointById = async (accessToken: string, collectionPointId: number) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/collection-points/${collectionPointId}`, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create collectionPoints
export const createCollectionPoint = async (accessToken: string, collectionPoint: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/collection-points', collectionPoint, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create product
export const updateCollectionPoint = async (accessToken: string, collectionPointId: number, collectionPoint: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.put(`/api/collection-points/${collectionPointId}`, collectionPoint, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// get all transportations
export const getTransportations = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/transportations', { headers });
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// create transportation
export const createTransportation = async (accessToken: string, transportation: {}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.post('/api/transportations', transportation, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// approve transportation by id
export const approveTransportationById = async (accessToken: string, transportationId: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.patch(`/api/transportations/${transportationId}/approve`, {}, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// get all users
export const getUsers = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get('/api/users', { headers });
    return response.data;


  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get user by id
export const getUserById = async (accessToken: string, userId: number) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await config.get(`/api/users/${userId}`, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}