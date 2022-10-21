import React from "react";
import { Divider, Menu, MenuItem, MenuProps } from "@mui/material";
import { PopupState } from "material-ui-popup-state/core";
import { ContextMenu } from "plugin";

interface Props {
  menuProps: MenuProps;
  popupState: PopupState;
  menus: ContextMenu[];
}

export default function FolderItemMenu(props: Props) {
  return (
    <Menu {...props.menuProps}>
      {props.menus.map((menu) =>
        menu.isDivider ? (
          <Divider />
        ) : (
          <MenuItem
            key={menu.name}
            onClick={() => {
              menu.onClick();
              props.popupState.close();
            }}
          >
            {menu.name}
          </MenuItem>
        )
      )}
    </Menu>
  );
}
