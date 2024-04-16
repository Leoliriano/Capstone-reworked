import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneProductsUrl, addToCartUrl, headers } from "../../utils/urls";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { UpdateUser } from "../store/userSlice.js";

export default function SingleProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const params = useParams();
  const productid = params.productid;

  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        let response = await fetch(getOneProductsUrl(productid), {
          method: "GET",
          headers: headers,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        response = await response.json();
        if (response.success === true) {
          let filePath = response?.data?.productimage;
          filePath = filePath.split("\\").pop();
          filePath = `http://localhost:8080/uploads/${filePath}`;
          const updatedProduct = {
            ...response.data,
            productimage: filePath,
          };
          setProduct(updatedProduct);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
        errorToast(error.message);
      }

      setLoading(false);
    };

    productid && fetchProduct();
  }, [productid]);

  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  //Handle Add To cart
  const addToCart = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      errorToast("Please login to perform this action ");
      return;
    }
    const productData = {
      productid: productid,
      productquantity: 1,
    };

    try {
      let response = await fetch(addToCartUrl, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      response = await response.json();
      if (response.success === true) {
        successToast(response.message);
        dispatch(UpdateUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <div className="bg-white">
        {loading && (
          <p className="text-center mt-36 text-green-500">Loading...</p>
        )}
        {error && (
          <p className="text-center mt-36 text-red-600">Error: {error}</p>
        )}
        {product && (
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 mt-32">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 lg:border-r  sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.productimage}
                  alt={product?.productname}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="lg:col-span-2 lg:pr-8 py-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-0xl">
                  {product?.productname}
                </h1>
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {showFullDescription
                          ? product?.productdescription
                          : product?.productdescription.slice(0, 200)}
                        {product?.productdescription.length > 200 && (
                          <button
                            className="text-indigo-600 underline"
                            onClick={handleReadMoreClick}
                          >
                            Read more
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 lg:row-span-3 lg:mt-0  text-center max-w-lg mx-auto">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${product?.productprice}
                  </p>

                  <div className="mt-10">
                    <button
                      type="submit"
                      onClick={(e) => {
                        addToCart(e);
                      }}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
