import React, { cloneElement, useContext, useMemo } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBarSearchField } from "./common/AppBarSearchField";
import { UIContext } from "../contexts/UIProvider";
import { signOut } from "next-auth/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
  const {
    title,
    dialog,
    isDialogOpen,
    rightPanelContent,
    isRightPanelOpen,
    closeRightPanel,
  } = useContext(UIContext);

  const DialogComponent = useMemo(() => {
    if (dialog !== undefined) {
      return cloneElement(dialog, { isDialogOpen: isDialogOpen });
    }
  }, [dialog, isDialogOpen]);

  const RightPanelComponent = useMemo(() => {
    if (rightPanelContent !== undefined) {
      return cloneElement(rightPanelContent, {
        isRightPanelOpen: isRightPanelOpen,
      });
    }
  }, [rightPanelContent, isRightPanelOpen]);

  return (
    <Box sx={{ flexGrow: 1, height: "calc(100vh - 64px)" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="black"
          >
            {title ?? "Next Nas"}
          </Typography>
          <AppBarSearchField />
          <Button color="primary" onClick={() => signOut({ redirect: true })}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box component={"main"} sx={{ height: "100%" }}>
        <Divider />
        {props.children}
      </Box>
      <Drawer
        anchor="right"
        open={isRightPanelOpen}
        onClose={() => closeRightPanel()}
      >
        {RightPanelComponent}
      </Drawer>
      {DialogComponent}
    </Box>
  );
}
