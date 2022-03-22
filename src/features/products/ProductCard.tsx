import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../app/hooks";
import Link from "../../utils/Link";
import { Product } from "./productsSlice";
import { addProduct } from "../cart/cartSlice";

interface ProductCardProps {
  product: Product;
  url: string;
}

export default function ProductCard({ product, url }: ProductCardProps) {
  const { id, title, price, image } = product;
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Grid sx={{ maxHeight: 400 }} key={id} item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          sx={{ objectFit: "contain", cursor: "pointer" }}
          component="img"
          height="140"
          image={image}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            router.push(url);
          }}
        />
        <CardContent>
          <Link
            sx={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "100%",
              textOverflow: "ellipsis",
            }}
            href={url}
          >
            {title}
          </Link>
          <Typography sx={{ textAlign: "right" }} variant="h5" component="div">
            $ {price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
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
        </CardActions>
      </Card>
    </Grid>
  );
}
