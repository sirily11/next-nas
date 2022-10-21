import { Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { NasFile } from "../../services/serviceInterface";
import ArticleIcon from "@mui/icons-material/Article";

import Image from "next/image";
import FileItem from "./FileItem";

interface Props {
  pinnedFiles: NasFile[];
}

export default function PinnedFiles({ pinnedFiles }: Props) {
  return (
    <Grid container>
      {pinnedFiles.map((file) => (
        <Grid item lg={3}>
          <FileItem file={file} />
        </Grid>
      ))}
    </Grid>
  );
}
