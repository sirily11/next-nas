import { PluginSystem } from "plugin";
import { createContext, useContext, useMemo } from "react";
import { UIContext } from "./UIProvider";
//@ts-ignore
import folderPlugin from "folder-plugin";
import filePlugin from "file-plugin";
import imagePlugin from "image-plugin";
import videoPlugin from "video-plugin";
import { useParent } from "../hooks/useParent";
import { pocketBase } from "../services/pocketBaseService";

interface PluginSystemInterface {
  pluginSystem: PluginSystem;
}

//@ts-ignore
export const PluginSystemContext = createContext<PluginSystemInterface>({});

export function PluginSystemProvider(props: any) {
  const {
    notify,
    showDialog,
    setTitle,
    closeDialog,
    isDialogOpen,
    showRightPanel,
    closeRightPanel,
  } = useContext(UIContext);

  const pluginSystem = useMemo(() => {
    const system = new PluginSystem({
      notify: notify,
      setTitle: setTitle,
      showDialog: showDialog,
      closeDialog: closeDialog,
      isDialogOpen: false,
      useParent: useParent,
      service: pocketBase,
      showRightPanel,
      closeRightPanel,
    });

    system.loadPlugin(folderPlugin, "folder-plugin");
    system.loadPlugin(filePlugin, "file-plugin");
    system.loadPlugin(imagePlugin, "image-plugin");
    system.loadPlugin(videoPlugin, "video-plugin");

    return system;
  }, []);

  const value: PluginSystemInterface = {
    pluginSystem,
  };

  return (
    <PluginSystemContext.Provider value={value}>
      {props.children}
    </PluginSystemContext.Provider>
  );
}
