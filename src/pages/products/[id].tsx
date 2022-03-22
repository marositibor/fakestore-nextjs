import ProductPage from "../../features/products/ProductPage";
import { GetServerSideProps } from "next";

interface PageProps {
  id: number;
}
function Page({ id }: PageProps) {
  return <ProductPage id={id} />;
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { id: ctx.params?.id } };
};

export default Page;
