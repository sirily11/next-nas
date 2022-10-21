import { Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { NasFile } from "common";
import ArticleIcon from "@mui/icons-material/Article";

import Image from "next/image";
import FileItem from "./FileItem";

interface Props {
  files: NasFile[];
}

export default function FilesList({ files }: Props) {
  return (
    <Grid container>
      {files.map((file) => (
        <Grid item lg={3} key={`file-${file.id}`}>
          <FileItem file={file} />
        </Grid>
      ))}
    </Grid>
  );
}
