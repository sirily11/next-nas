import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { NasFile } from "common";
import dayjs from "dayjs";
import { PluginProps } from "plugin/lib/types";
import prettyBytes from "pretty-bytes";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

interface Props extends PluginProps {
  file: NasFile;
}

export default function VideoPanel(props: Props) {
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
        <Player
          playsInline
          poster="/assets/poster.png"
          src={props.service.getFileURL(props.file)}
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
