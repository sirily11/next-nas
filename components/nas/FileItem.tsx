import { Card, CardActionArea, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import { NasFile } from "common";

interface Props {
  file: NasFile;
}

export default function FileItem({ file }: Props) {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <Stack p={2} justifyContent="center" alignItems={"center"}>
          <Image src={"/DocumentIcon.svg"} width={100} height={100} />
          <Stack
            direction={"row"}
            justifyContent="leading"
            alignItems="leading"
            width={"100%"}
            spacing={3}
          >
            <ArticleIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={600}>
              {file.name}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
