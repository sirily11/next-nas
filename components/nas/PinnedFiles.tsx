import { Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { NasFile } from "common";
import ArticleIcon from "@mui/icons-material/Article";

import Image from "next/image";
import FileItem from "./FileItem";
import { PopupState } from "material-ui-popup-state/core";

interface Props {
  pinnedFiles: NasFile[];
  parentPopupState: PopupState;
}

export default function PinnedFiles({ pinnedFiles, parentPopupState }: Props) {
  return (
    <Grid container>
      {pinnedFiles.map((file) => (
        <Grid item lg={2} key={`pinned-${file.id}`}>
          <FileItem file={file} parentPopupState={parentPopupState} />
        </Grid>
      ))}
    </Grid>
  );
}
