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
import PinnedFiles from "./PinnedFiles";
import { PluginSystemContext } from "../../contexts/PluginContext";
import { ContextMenu } from "plugin";
import NasContextMenu from "../menus/NasContextMenu";

interface Props {
  pinnedFiles: NasFile[];
  files: NasFile[];
}

export default function FilesArea({ pinnedFiles, files }: Props) {
  const popupState = usePopupState({ variant: "popover", popupId: "files" });
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const { pluginSystem } = useContext(PluginSystemContext);

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
      <PinnedFiles pinnedFiles={pinnedFiles} parentPopupState={popupState} />
      <Typography variant="h6" fontWeight={"bold"}>
        Files
      </Typography>
      <FilesList files={files} parentPopupState={popupState} />
      <NasContextMenu
        menuProps={bindMenu(popupState)}
        popupState={popupState}
        menus={menus}
      />
    </Stack>
  );
}
