// export const BASE_URL = process.env.NODE_ENV === 'development'? 'http://localhost:5000':'';

export const BASE_URL = '';

//we are not using the above base_url since we are using proxy if we were not using proxy then we can use the former base_url and enable the CORS in backend.

export const PRODUCT_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/comfig/paypal';
export const PRODUCT_BY_ID = '/api/products/:id';
export const UPLOAD_URL = '/api/upload'