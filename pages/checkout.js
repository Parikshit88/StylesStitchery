import React, { useState } from "react";
import {
  BsPatchMinusFill,
  BsPatchPlusFill,
  BsFillBagCheckFill,
} from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, addToCart, subTotal, removeFromCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");


  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    }
    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        pincode.length > 3 &&
        address.length > 3
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    //get a transaction token

    const data = { cart, subTotal, oid, email: "email" };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName =>", eventName);
          console.log("data =>", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="container p-5 md:m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossOrigin="anonymus"
        src={`{process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <h1 className="font-semibold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-3">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-base text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="email"
              className="leading-7 text-base text-gray-600"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label
            htmlFor="address"
            className="leading-7 text-base text-gray-600"
          >
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            cols="20"
            rows="3"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-3">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="phone"
              className="leading-7 text-base text-gray-600"
            >
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-base text-gray-600"
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-3">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="state"
              className="leading-7 text-base text-gray-600"
            >
              State
            </label>
            <input
            onChange={handleChange}
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-base text-gray-600">
              City
            </label>

            <input
              onChange={handleChange}
              value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}
            />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Cart Items & Checkout</h2>
      <div className=" z-10 sideCart bg-indigo-100 p-5 m-2 ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 mt-0 font-normal">
              No items present in the cart
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className=" font-semibold">{cart[k].name}</div>
                  <div className=" w-1/3 flex items-center font-semibold justify-center text-lg">
                    <BsPatchMinusFill
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-indigo-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <BsPatchPlusFill
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-indigo-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="font-bold">Subtotal: ₹{subTotal}</span>
      </div>
      <Link href={"/checkout"}>
        <button
          disabled={disabled}
          onClick={initiatePayment}
          className=" disabled:bg-indigo-300 flex ml-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-700 rounded text-base"
        >
          <BsFillBagCheckFill className="m-1" />
          Pay ₹{subTotal}
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
