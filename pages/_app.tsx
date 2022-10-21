import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { UIContextProvider } from "../contexts/UIProvider";
import { SnackbarProvider } from "notistack";
import { PluginSystemProvider } from "../contexts/PluginContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5529af",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <UIContextProvider>
        <PluginSystemProvider>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PluginSystemProvider>
      </UIContextProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
