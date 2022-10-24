import React, { cloneElement, useContext, useMemo } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBarSearchField } from "./common/AppBarSearchField";
import { UIContext } from "../contexts/UIProvider";
import { signOut } from "next-auth/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
  const { title, dialog, isDialogOpen } = useContext(UIContext);

  const DialogComponent = useMemo(() => {
    if (dialog !== undefined) {
      return cloneElement(dialog, { isDialogOpen: isDialogOpen });
    }
  }, [dialog, isDialogOpen]);

  return (
    <Box sx={{ flexGrow: 1, height: "calc(100vh - 64px)" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title ?? "Next Nas"}
          </Typography>
          <AppBarSearchField />
          <Button color="inherit" onClick={() => signOut({ redirect: true })}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box component={"main"} sx={{ height: "100%" }}>
        {props.children}
      </Box>
      {DialogComponent}
    </Box>
  );
}
