import { NasFile, NasFolder } from "common";
import { ContextMenu, Plugin } from "plugin";
import { FolderDialog } from "./dialog";

export default class FolderPlugin extends Plugin {
  onFolderContextMenu(folder: NasFolder): "not implemented" | ContextMenu[] {
    return [
      {
        name: "Open in new tab",
        onClick: () => {
          this.props.notify("Opening folder in new tab", "success");
        },
      },
    ];
  }

  onFolderAreaContextMenu(): ContextMenu[] | "not implemented" {
    return [
      {
        name: "Create a new folder",
        onClick: () => {
          this.props.showDialog(<FolderDialog {...this.props} />);
        },
      },
    ];
  }
}
