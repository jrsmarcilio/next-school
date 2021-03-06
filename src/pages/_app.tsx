import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const clientSideEmotionCache = createEmotionCache();
import Copyright from "../components/Copyright";
import "../styles/global.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Component {...pageProps} />
        <Copyright />
      </ThemeProvider>
    </CacheProvider>
  );
}
