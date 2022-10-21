import { useSnackbar } from "notistack";
import { PluginSystem } from "plugin";
import { createContext, useContext, useMemo } from "react";
import { UIContext } from "./UIProvider";
//@ts-ignore
import folderPlugin from "folder-plugin";
import { useParent } from "../hooks/useParent";
import { PocketBaseService } from "../services/pocketBaseService";

interface PluginSystemInterface {
  pluginSystem: PluginSystem;
}

//@ts-ignore
export const PluginSystemContext = createContext<PluginSystemInterface>({});

export function PluginSystemProvider(props: any) {
  const { notify, showDialog, setTitle, closeDialog, isDialogOpen } =
    useContext(UIContext);

  const pluginSystem = useMemo(() => {
    const system = new PluginSystem({
      notify: notify,
      setTitle: setTitle,
      showDialog: showDialog,
      closeDialog: closeDialog,
      isDialogOpen: false,
      useParent: useParent,
      service: new PocketBaseService(),
    });

    system.loadPlugin(folderPlugin, "folder-plugin");

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
