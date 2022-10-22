import { NasFile, NasFolder } from "common";
import { ContextMenu, Plugin } from "plugin";
import { FolderDialog } from "./dialog";

export default class FolderPlugin extends Plugin {
  onFolderContextMenu(folder: NasFolder): "not implemented" | ContextMenu[] {
    return [
      {
        name: "Rename",
        onClick: () => {
          this.props.showDialog(
            <FolderDialog {...this.props} folder={folder} />
          );
        },
      },

      {
        name: `Delete the folder ${folder.name}`,
        onClick: async () => {
          const confirmed = window.confirm(`Delete the folder ${folder.name}?`);
          if (confirmed) {
            await this.props.service.deleteFolder(folder.id);
            this.props.notify("Deleted the folder", "success");
          }
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
