import React, { useState, useEffect } from "react";
import { makePaymentUrl, getCartItemsUrl, headers } from "../../utils/urls";
import { errorToast } from "../../utils/ErrorToast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(getCartItemsUrl, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const responseData = await response.json();
        if (responseData.success === true) {
          setCart(responseData.data);
          calculateTotalPrice(responseData.data); // Calculate total price
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        setError(error.message);
        errorToast(error.message);
      }

      setLoading(false);
    };

    fetchCartItems();
  }, []);

  //Get Payment Link

  const makePayment = async () => {
    try {
      const response = await fetch(makePaymentUrl, {
        method: "GET",
        headers: headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment link");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success === true) {
        window.location = `${responseData.data}`;
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
      errorToast(error.message);
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.productprice * item.productquantity;
    });
    setTotalPrice(totalPrice);
  };

  let output;

  if (loading) {
    output = <p>Loading...</p>;
  } else if (error) {
    output = <p>Error: {error}</p>;
  } else if (!cart || cart.length === 0) {
    output = (
      <p className="text-center">You haven't added anything to cart yet 😯</p>
    );
  } else {
    output = (
      <>
        <h2 className="text-center text-3xl text-semibold mb-3">
          What's in your cart
        </h2>
        {cart.map((product) => (
          <li
            key={product.productid}
            className="flex justify-between gap-x-6 py-5 border-b"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <Link
                  to={`/product/${product.productid}`}
                  className="text-sm font-semibold leading-6 text-blue-700"
                >
                  {product.productname}
                </Link>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <h4 className="text-bold text-lg">${product.productprice}</h4>
              <p className="text-sm leading-6 text-gray-900">
                <span>x{product.productquantity}</span>
              </p>
            </div>
          </li>
        ))}
        ;
        <p className="text-center text-xl text-bold mt-4">
          Total : ${totalPrice}
        </p>
        <div className="text-center mt-4">
          <button
            onClick={makePayment}
            className=" bg-indigo-600 px-8 py-4 text-md rounded-full font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Proceed To Checkout
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <ul
        role="list"
        className="divide-y divide-gray-100 max-w-2xl mt-32 mx-auto"
      >
        {output}
      </ul>
    </div>
  );
}
