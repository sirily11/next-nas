import FolderIcon from "@mui/icons-material/Folder";
import {
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import {
  bindContextMenu,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { NasFolder } from "../../services/serviceInterface";
import FolderItemMenu from "../menus/FolderItemMenu";
import FolderMenu from "../menus/FolderMenu";
import BackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  currentFolder?: NasFolder;
  folders: NasFolder[];
}

export default function FolderList({ folders, currentFolder }: Props) {
  const router = useRouter();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "folder",
  });

  return (
    <List
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      {currentFolder && (
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <IconButton
            onClick={() => router.push("/?folder=" + currentFolder.parent)}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="subtitle1">{currentFolder.name}</Typography>
        </Stack>
      )}

      {folders.map((folder) => (
        <FolderItem folder={folder} key={folder.id} />
      ))}

      {/* rest area for add folder action */}
      <div
        style={{
          height: "auto",
          display: "flex",
          flexGrow: 1,
        }}
        {...bindContextMenu(popupState)}
      />
      <FolderMenu menuProps={bindMenu(popupState)} popupState={popupState} />
    </List>
  );
}

function FolderItem({ folder }: { folder: NasFolder }) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `folder-${folder.id}`,
  });
  const router = useRouter();

  return (
    <Box>
      <ListItemButton
        {...bindContextMenu(popupState)}
        onClick={() => {
          router.push("/?folder=" + folder.id);
        }}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.name} />
      </ListItemButton>
      <FolderItemMenu
        menuProps={bindMenu(popupState)}
        popupState={popupState}
      />
    </Box>
  );
}
