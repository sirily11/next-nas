import { NasFile, NasFolder } from "common";
import { ContextMenu, Plugin } from "plugin";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

export default class FilePlugin extends Plugin {
  onFileContextMenu(file: NasFile): "not implemented" | ContextMenu[] {
    let menus: ContextMenu[] = [];

    if (file.pinned) {
      menus.push({
        name: `Unpin the file ${file.name}`,
        leading: <StarIcon style={{ color: "#ffd30f" }} />,
        onClick: async () => {
          await this.props.service.updateFile({ ...file, pinned: false });
          this.props.notify("Unpinned the file", "success");
        },
      });
    } else {
      menus.push({
        name: `Pin the file ${file.name}`,
        leading: <StarIcon style={{ color: "gray" }} />,
        onClick: async () => {
          await this.props.service.updateFile({ ...file, pinned: true });
          this.props.notify("Pinned the file", "success");
        },
      });
    }

    menus.push({
      name: `Delete the file ${file.name}`,
      leading: <DeleteIcon />,
      onClick: async () => {
        const confirmed = window.confirm(`Delete the file ${file.name}?`);
        if (confirmed) {
          // await this.props.service.deleteFolder(file.id);
          this.props.notify("Deleted the file", "success");
        }
      },
    });

    return menus;
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
