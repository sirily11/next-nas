import { Card, CardActionArea, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import { NasFile } from "common";
import {
  bindContextMenu,
  bindMenu,
  PopupState,
} from "material-ui-popup-state/core";
import { usePopupState } from "material-ui-popup-state/hooks";
import NasContextMenu from "../menus/NasContextMenu";
import { ContextMenu } from "plugin";
import { PluginSystemContext } from "../../contexts/PluginContext";

interface Props {
  file: NasFile;
  parentPopupState: PopupState;
}

export default function FileItem({ file, parentPopupState }: Props) {
  const [menus, setMenus] = useState<ContextMenu[]>([]);
  const { pluginSystem } = useContext(PluginSystemContext);

  const childPopupState = usePopupState({
    variant: "popover",
    popupId: `${file.id}-menu`,
  });

  useEffect(() => {
    if (childPopupState.isOpen) {
      parentPopupState.close();
    }
  }, [childPopupState.isOpen, parentPopupState]);

  return (
    <Card
      variant="outlined"
      {...bindContextMenu(childPopupState)}
      onContextMenu={(e) => {
        e.preventDefault();
        const menus = pluginSystem.onFileContextMenu(file);
        if (menus !== "not implemented") {
          setMenus(menus);
        }
        childPopupState.open(e);
      }}
    >
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

      <NasContextMenu
        menuProps={bindMenu(childPopupState)}
        popupState={childPopupState}
        menus={menus}
      />
    </Card>
  );
}
