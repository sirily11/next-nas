import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  bindContextMenu,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React from "react";
import { NasFile } from "../../services/serviceInterface";
import FolderMenu from "../menus/FolderMenu";
import FilesList from "./FilesList";
import PinnedFiles from "./PinnedFiles";

interface Props {
  pinnedFiles: NasFile[];
  files: NasFile[];
}

export default function FilesArea({ pinnedFiles, files }: Props) {
  const popupState = usePopupState({ variant: "popover", popupId: "files" });

  return (
    <Stack
      position={"absolute"}
      width="100%"
      {...bindContextMenu(popupState)}
      spacing={4}
      p={2}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        Pinned files
      </Typography>
      <PinnedFiles pinnedFiles={pinnedFiles} />
      <Typography variant="h6" fontWeight={"bold"}>
        Files
      </Typography>
      <FilesList files={files} />

      <FolderMenu menuProps={bindMenu(popupState)} popupState={popupState} />
    </Stack>
  );
}
