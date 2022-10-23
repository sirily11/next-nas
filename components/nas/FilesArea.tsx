import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  bindContextMenu,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useContext, useEffect, useState } from "react";
import { NasFile } from "common";

import FilesList from "./FilesList";
import { PluginSystemContext } from "../../contexts/PluginContext";
import { ContextMenu } from "plugin";
import NasContextMenu from "../menus/NasContextMenu";
import { pocketBase } from "../../services/pocketBaseService";

interface Props {
  files: NasFile[];
}

export default function FilesArea({ files: serverRenderedFiles }: Props) {
  const popupState = usePopupState({ variant: "popover", popupId: "files" });
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const { pluginSystem } = useContext(PluginSystemContext);
  const [files, setFiles] = useState<NasFile[]>(serverRenderedFiles);

  // real-time updates
  useEffect(() => {
    pocketBase.client.realtime.subscribe("files", (data) => {
      setFiles((value) => {
        if (data.action === "create") {
          return [...value, data.record as any];
        } else if (data.action === "update") {
          let index = files.findIndex((f) => f.id === data.record.id);
          if (index !== -1) {
            value[index] = data.record as any;
          }
          return [...value];
        } else if (data.action === "delete") {
          return value.filter((f) => f.id !== data.record.id);
        }
        return [...value];
      });
    });

    return () => {
      pocketBase.client.realtime.unsubscribe("files");
    };
  }, []);

  useEffect(() => {
    setFiles(serverRenderedFiles);
  }, [serverRenderedFiles]);

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
      <FilesList
        files={files.filter((f) => f.pinned)}
        parentPopupState={popupState}
      />
      <Typography variant="h6" fontWeight={"bold"}>
        Files
      </Typography>
      <FilesList
        files={files.filter((f) => !f.pinned)}
        parentPopupState={popupState}
      />
      <NasContextMenu
        menuProps={bindMenu(popupState)}
        popupState={popupState}
        menus={menus}
      />
    </Stack>
  );
}
