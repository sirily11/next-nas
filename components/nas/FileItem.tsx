import {
  Card,
  CardActionArea,
  Menu,
  Paper,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import { NasFile } from "common";
import {
  bindContextMenu,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
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

  const contextPopupState = usePopupState({
    variant: "popover",
    popupId: `${file.id}-menu`,
  });

  const hoverPopupState = usePopupState({
    variant: "popover",
    popupId: `${file.id}-hover-menu`,
  });

  useEffect(() => {
    if (contextPopupState.isOpen) {
      parentPopupState.close();
      hoverPopupState.close();
    }
  }, [contextPopupState.isOpen, parentPopupState]);

  const Icon = useMemo(() => {
    const GeneratedIcon = pluginSystem.fileIcon(file);
    if (GeneratedIcon !== "not implemented") {
      return GeneratedIcon;
    }
    return <Image src={"/DocumentIcon.svg"} width={100} height={100} />;
  }, [file, pluginSystem]);

  const PreviewContents = useMemo(() => {
    const GeneratedPreview = pluginSystem.onFilePreview(file);
    if (GeneratedPreview !== "not implemented") {
      return GeneratedPreview;
    }
    return [];
  }, [file, pluginSystem]);

  return (
    <Card
      variant="outlined"
      {...bindContextMenu(contextPopupState)}
      onMouseEnter={(e) => {
        if (contextPopupState.isOpen) {
          return;
        }
        hoverPopupState.open(e);
      }}
      onMouseLeave={() => {
        hoverPopupState.close();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        const menus = pluginSystem.onFileContextMenu(file);
        if (menus !== "not implemented") {
          setMenus(menus);
        }
        contextPopupState.open(e);
      }}
    >
      <CardActionArea>
        <Stack p={2} justifyContent="center" alignItems={"center"}>
          {Icon}
          <Stack
            direction={"row"}
            justifyContent="leading"
            alignItems="leading"
            width={"100%"}
            spacing={3}
          >
            <ArticleIcon color="primary" />
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {file.name}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>

      <Popper {...bindPopper(hoverPopupState)} placement="bottom-end">
        <Paper>
          <Stack
            p={2}
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
            width={300}
          >
            {PreviewContents}
          </Stack>
        </Paper>
      </Popper>

      <NasContextMenu
        menuProps={bindMenu(contextPopupState)}
        popupState={contextPopupState}
        menus={menus}
      />
    </Card>
  );
}
