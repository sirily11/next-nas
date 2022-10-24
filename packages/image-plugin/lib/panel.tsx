import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  CardMedia,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { PluginProps } from "plugin/lib/types";
import { NasFile } from "common";
import { Box, Stack } from "@mui/system";
import prettyBytes from "pretty-bytes";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props extends PluginProps {
  file: NasFile;
}

export default function ImagePanel(props: Props) {
  return (
    <Box minWidth={500}>
      <List>
        <Stack alignItems={"end"}>
          <Box p={2}>
            <Tooltip title="Close">
              <IconButton onClick={() => props.closeRightPanel()}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <LazyLoadImage
          width={"100%"}
          src={props.service.getFileURL(props.file)}
          height={400}
          placeholder={<CircularProgress />}
        />
        <ListItem>
          <ListItemText primary="File name" secondary={props.file.name} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="File size"
            secondary={prettyBytes(props.file.size)}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Created at"
            secondary={dayjs(props.file.created).format("YYYY-MM-DD HH:mm:ss")}
          />
        </ListItem>
      </List>
    </Box>
  );
}
