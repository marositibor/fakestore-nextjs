import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";

import store from "../app/store";
import { getProducts } from "../features/products/productsSlice";
import { getCartCount } from "../features/cart/cartSlice";
import createEmotionCache from "../utils/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import { useAppSelector } from "../app/hooks";

store.dispatch(getProducts());

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyAppBar = () => {
  const cartCount = useAppSelector(getCartCount);
  return (
    <AppBar position="fixed">
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h6" noWrap component="div">
                Fakestore
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" noWrap component="div">
                Cart items: {cartCount}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <MyAppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
