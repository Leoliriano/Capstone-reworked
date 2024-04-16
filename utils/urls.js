const baseUrl = `http://localhost:8080/api`;

export const registerUrl = `${baseUrl}/auth/register`;
export const loginUrl = `${baseUrl}/auth/login`;

export const getProductsUrl = `${baseUrl}/product/get-all-products`;

export const getOneProductsUrl = (productid) =>
  `${baseUrl}/product/get-one-product/${productid}`;

export const getExisitingUserDataUrl = `${baseUrl}/auth/gather-data`;

export const addToCartUrl = `${baseUrl}/user/add-to-cart`;

export const getCartItemsUrl = `${baseUrl}/user/get-cart-items`;

export const makePaymentUrl = `${baseUrl}/payment/place-order`;

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
