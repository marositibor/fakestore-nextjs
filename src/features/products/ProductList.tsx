import { Container, Grid } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "./productsSlice";
import ProductCard from "./ProductCard";

function ProductList() {
  const products = useAppSelector(selectProducts);

  return (
    <Container maxWidth={"xl"}>
      <Grid container spacing={2} sx={{ padding: 10 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            url={`/products/${product.id}`}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
