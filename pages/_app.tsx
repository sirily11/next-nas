import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { UIContextProvider } from "../contexts/UIProvider";
import { SnackbarProvider } from "notistack";
import { PluginSystemProvider } from "../contexts/PluginContext";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ff9100",
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

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <SnackbarProvider>
        <UIContextProvider>
          <PluginSystemProvider>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </PluginSystemProvider>
        </UIContextProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default MyApp;
