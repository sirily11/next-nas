import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { UIContextProvider } from "../contexts/UIProvider";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5529af",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <UIContextProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UIContextProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
