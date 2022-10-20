import React, { useContext } from "react";
import { Menu, MenuItem, MenuProps } from "@mui/material";
import { PopupState } from "material-ui-popup-state/core";
import { UIContext } from "../../contexts/UIProvider";
import FolderDialog from "../dialogs/FolderDialog";

interface Props {
  menuProps: MenuProps;
  popupState: PopupState;
}

export default function FolderMenu(props: Props) {
  const { showDialog } = useContext(UIContext);

  return (
    <Menu {...props.menuProps}>
      <MenuItem
        onClick={() => {
          showDialog(<FolderDialog />);
          props.popupState.close();
        }}
      >
        Add Folder
      </MenuItem>
    </Menu>
  );
}
