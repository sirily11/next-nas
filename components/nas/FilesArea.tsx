import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  bindContextMenu,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useContext, useState } from "react";
import { NasFile } from "common";

import FilesList from "./FilesList";
import { PluginSystemContext } from "../../contexts/PluginContext";
import { ContextMenu } from "plugin";
import NasContextMenu from "../menus/NasContextMenu";

interface Props {
  files: NasFile[];
}

export default function FilesArea({ files: serverRenderedFiles }: Props) {
  const popupState = usePopupState({ variant: "popover", popupId: "files" });
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const { pluginSystem } = useContext(PluginSystemContext);
  const [files, setFiles] = useState<NasFile[]>(serverRenderedFiles);

  return (
    <Stack
      width="100%"
      height={"100%"}
      {...bindContextMenu(popupState)}
      onContextMenu={(e) => {
        e.preventDefault();
        const menus = pluginSystem.onFileAreaContextMenu();
        if (menus !== "not implemented") {
          setMenus(menus);
        }
        popupState.open(e);
      }}
      spacing={4}
      p={2}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        Pinned files
      </Typography>
      <FilesList
        files={files.filter((f) => f.pinned)}
        parentPopupState={popupState}
      />
      <Typography variant="h6" fontWeight={"bold"}>
        Files
      </Typography>
      <FilesList
        files={files.filter((f) => !f.pinned)}
        parentPopupState={popupState}
      />
      <NasContextMenu
        menuProps={bindMenu(popupState)}
        popupState={popupState}
        menus={menus}
      />
    </Stack>
  );
}
