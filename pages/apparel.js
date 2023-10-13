import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Apparel = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg"
                  key={products[item]._id}
                >
                  <a
                    passhref="true"
                    href={`/product/${products[item].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="m-auto h-[30vh] md:h-[36vh] block"
                      // src="x"
                      src={products[item].img}
                    />
                  </a>
                  <div className="mt-4 text-center">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("Red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Purple") && (
                        <button className="border-2 border-gray-300 ml-1 bg-purple-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
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
  let products = await Product.find({ category: "apparel" });
  let apparel = {};
  for (let item of products) {
    if (item.title in apparel) {
      if (
        !apparel[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        apparel[item.title].color.push(item.color);
      }
      if (
        !apparel[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        apparel[item.title].size.push(item.size);
      }
    } else {
      apparel[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        apparel[item.title].color = [item.color];
        apparel[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(apparel)) },
  };
}
export default Apparel;
