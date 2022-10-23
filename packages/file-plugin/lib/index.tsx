import { NasFile, NasFolder } from "common";
import { ContextMenu, Plugin } from "plugin";
import { FolderDialog } from "./dialog";

export default class FilePlugin extends Plugin {
  onFileContextMenu(file: NasFile): "not implemented" | ContextMenu[] {
    return [
      {
        name: `Delete the file ${file.name}`,
        onClick: async () => {
          const confirmed = window.confirm(`Delete the file ${file.name}?`);
          if (confirmed) {
            // await this.props.service.deleteFolder(file.id);
            this.props.notify("Deleted the file", "success");
          }
        },
      },
    ];
  }

  onFileAreaContextMenu(): ContextMenu[] | "not implemented" {
    return [
      {
        name: "Upload a file",
        onClick: () => {},
      },
    ];
  }
}
