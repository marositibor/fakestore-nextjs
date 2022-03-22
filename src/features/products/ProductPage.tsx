import { Container, Grid, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createSelectProductById } from "./productsSlice";
import { addProduct } from "../cart/cartSlice";

interface ProductPageProps {
  id: number;
}

function ProductPage({ id }: ProductPageProps) {
  const selectProduct = createSelectProductById(id);
  const product = useAppSelector(selectProduct);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      {product ? (
        <Container maxWidth={"xl"}>
          <Grid container spacing={2} sx={{ padding: 10 }} direction={"row"}>
            <Grid item xs={6} sx={{ padding: 10 }}>
              <img
                src={product.image}
                width={"100%"}
                alt={"Image of " + product.title}
              />
            </Grid>
            <Grid
              xs={6}
              item
              container
              direction={"column"}
              flexWrap={"nowrap"}
              justifyItems={"start"}
            >
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  $ {product.price}
                </Typography>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  Back
                </Button>{" "}
                <Button
                  variant="contained"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    dispatch(addProduct(product));
                  }}
                >
                  <AddShoppingCartIcon />
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <div>Error: product does not exist</div>
      )}
    </>
  );
}

export default ProductPage;
