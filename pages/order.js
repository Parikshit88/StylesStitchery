import React from "react";

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                StylesStitchery
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #871978971
              </h1>
              <p className="leading-relaxed font-semibold mb-4">
                Your Order has been placed successfully
              </p>
              <div className="flex mb-4">
                <a className="flex-grow text-center text-black py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow text-center text-black  py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow text-center text-black py-2 text-lg px-1">
                  Item Price
                </a>
              </div>
              <div className="flex border-t border-gray-200 py-2 text-center">
                <span className="text-gray-600">Style Your Way (XL/Blue)</span>
                <span className="ml-auto text-gray-600">1</span>
                <span className="ml-auto text-gray-600">₹499</span>

              </div>
              <div className="flex border-t border-gray-200 text-center py-2">
              <span className="text-gray-600">Style Your Way (XL/Red)</span>
                <span className="ml-auto text-gray-600">1</span>
                <span className="ml-auto text-gray-600">₹399</span>

              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 text-center py-2">
              <span className="text-gray-600">Style Your Way (XL/White)</span>
                <span className="ml-auto text-gray-600">1</span>
                <span className="ml-auto text-gray-600">₹449</span>

              </div>
              <div className="flex py-2">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal: ₹58.00
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
                
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
