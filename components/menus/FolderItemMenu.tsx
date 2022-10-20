import React from "react";
import { Menu, MenuItem, MenuProps } from "@mui/material";
import { PopupState } from "material-ui-popup-state/core";

interface Props {
  menuProps: MenuProps;
  popupState: PopupState;
}

export default function FolderItemMenu(props: Props) {
  return (
    <Menu {...props.menuProps}>
      <MenuItem onClick={() => props.popupState.close()}>Delete</MenuItem>
    </Menu>
  );
}
