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
import { NasFolder } from "common";
import FolderItemMenu from "../menus/NasContextMenu";

import BackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useEffect, useState } from "react";
import { ContextMenu } from "plugin";
import { PluginSystemContext } from "../../contexts/PluginContext";
import { pocketBase } from "../../services/pocketBaseService";
import NasContextMenu from "../menus/NasContextMenu";

interface Props {
  currentFolder?: NasFolder;
  folders: NasFolder[];
}

export default function FolderList({
  folders: serverLoadedFolders,
  currentFolder,
}: Props) {
  const router = useRouter();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "folder",
  });
  const { pluginSystem } = useContext(PluginSystemContext);
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const [folders, setFolders] = useState<NasFolder[]>(serverLoadedFolders);

  useEffect(() => {
    pocketBase.client.realtime.subscribe("folders", (data) => {
      setFolders((value) => {
        if (data.action === "create") {
          return [...value, data.record as any];
        } else if (data.action === "update") {
          let index = folders.findIndex((f) => f.id === data.record.id);
          if (index !== -1) {
            value[index] = data.record as any;
          }
          return value;
        } else if (data.action === "delete") {
          return value.filter((f) => f.id !== data.record.id);
        }
        return value;
      });
    });

    return () => {
      pocketBase.client.realtime.unsubscribe("folders");
    };
  }, []);

  useEffect(() => {
    setFolders(serverLoadedFolders);
  }, [serverLoadedFolders]);

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
        onContextMenu={(e) => {
          e.preventDefault();
          const menus = pluginSystem.onFolderAreaContextMenu();
          if (menus !== "not implemented") {
            setMenus(menus);
          }
          bindContextMenu(popupState).onContextMenu(e);
        }}
      />
      <NasContextMenu
        menuProps={bindMenu(popupState)}
        popupState={popupState}
        menus={menus}
      />
    </List>
  );
}

function FolderItem({ folder }: { folder: NasFolder }) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `folder-${folder.id}`,
  });
  const router = useRouter();
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const { pluginSystem } = useContext(PluginSystemContext);

  return (
    <Box>
      <ListItemButton
        {...bindContextMenu(popupState)}
        onContextMenu={(e) => {
          e.preventDefault();
          const menus = pluginSystem.onFolderContextMenu(folder);
          if (menus !== "not implemented") {
            setMenus(menus);
          }
          bindContextMenu(popupState).onContextMenu(e);
        }}
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
        menus={menus}
      />
    </Box>
  );
}
