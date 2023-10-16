import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Accessories = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).length ===0 && <p>Accessories Out Of Stock. New Stock coming soon. Stay Tuned!</p> }
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
                      {products[item].size.includes("6") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          6
                        </span>
                      )}
                      {products[item].size.includes("7") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          7
                        </span>
                      )}
                      {products[item].size.includes("8") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          8
                        </span>
                      )}
                      {products[item].size.includes("9") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          9
                        </span>
                      )}
                      {products[item].size.includes("10") && (
                        <span className="border rounded-sm border-gray-300 px-1 mx-1">
                          10
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("Red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>
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
                      {products[item].color.includes("Green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>
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
  let products = await Product.find({ category: "accessories" });
  let accessories = {};
  for (let item of products) {
    if (item.title in accessories) {
      if (
        !accessories[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        accessories[item.title].color.push(item.color);
      }
      if (
        !accessories[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        accessories[item.title].size.push(item.size);
      }
    } else {
      accessories[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        accessories[item.title].color = [item.color];
        accessories[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(accessories)) },
  };
}
export default Accessories;
