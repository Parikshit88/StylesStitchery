import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Apparel = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((item) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg"
                  key={item._id}
                >
                  <a
                    passhref="true"
                    href={`/product/${item.slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="m-auto h-[30vh] md:h-[36vh] block"
                      // src="x"
                      src={item.img}
                    />
                  </a>
                  <div className="mt-4 text-center">
                    
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">₹{item.price}</p>
                    <p className="mt-1">S, M, L, XL, XXL</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: 'apparel'});
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
export default Apparel;
