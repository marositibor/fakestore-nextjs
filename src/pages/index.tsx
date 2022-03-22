import type { NextPage } from "next";
import ProductList from "../features/products/ProductList";

const Home: NextPage = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Home;
