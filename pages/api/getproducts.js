import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
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
  res.status(200).json({ apparel });
};

export default connectDb(handler);
