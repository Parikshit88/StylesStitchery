import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";
import {
  BsPatchMinusFill,
  BsPatchPlusFill,
  BsFillBagCheckFill,
} from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Navbar = ({ cart, addToCart, clearCart, removeFromCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start items-center justify-center py-2 shadow-lg sticky top-0 z-10 bg-white">
      <div className="logo mx-4">
        <Link href={"/"}>
          <Image src="/logo1.png" alt="" width={200} height={40} />
        </Link>
      </div>
      <div className="nav mx-4">
        <ul className="flex items-center space-x-6 font-semibold md:text-md">
          <Link href={"/apparel"} className="hover:text-indigo-700">
            <li>Apparel</li>
          </Link>
          <Link href={"/footwear"} className="hover:text-indigo-700">
            <li>Footwear</li>
          </Link>
          <Link href={"/accessories"} className="hover:text-indigo-700">
            <li>Accessories</li>
          </Link>
          <Link href={"/eyewear"} className="hover:text-indigo-700">
            <li>Eyewear</li>
          </Link>
        </ul>
      </div>
      <div className="cursor-pointer cart absolute right-0 top-5 mx-5 flex">
        <Link href={"/login"}>
          <RiAccountPinCircleFill className=" text-xl md:text-2xl mx-2" />
        </Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className=" text-xl md:text-2xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] z-10 sideCart absolute top-0 right-0 bg-indigo-100 px-10 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-3 cursor-pointer text-2xl text-indigo-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-normal">No items present in the cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant}){" "}
                  </div>
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
        <div className="font-bold my-1 mb2">Subtotal: ₹{subTotal}</div>

        <div className="flex mt-6">
          <Link href={"/checkout"}>
            {" "}
            <button className="flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-700 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 mx-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-700 rounded text-sm"
          >
            {/* <TbShoppingCartX className="m-1"/> */}
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
