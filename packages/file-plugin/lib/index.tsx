import { NasFile, NasFolder } from "common";
import { ContextMenu, Plugin } from "plugin";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { UploadDialog } from "./dialog";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import prettyBytes from "pretty-bytes";

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
          await this.props.service.deleteFile(file.id);
          this.props.notify("Deleted the file", "success");
        }
      },
    });

    menus.push({
      name: "Copy the file URL",
      leading: <ContentCopyIcon />,
      onClick: async () => {
        const url = this.props.service.getFileURL(file);
        await navigator.clipboard.writeText(url);
        this.props.notify("Copied the file URL", "success");
      },
    });

    menus.push({
      name: "Download the file",
      leading: <DownloadIcon />,
      onClick: async () => {
        // download file using new tab
        const url = this.props.service.getFileURL(file);
        window.open(url, "_blank");
      },
    });

    return menus;
  }

  onFileAreaContextMenu(): ContextMenu[] | "not implemented" {
    return [
      {
        name: "Upload a file",
        onClick: () => {
          this.props.showDialog(<UploadDialog {...this.props} />);
        },
      },
    ];
  }

  onFilePreview(file: NasFile): "not implemented" | JSX.Element[] {
    return [
      <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
        <Typography variant="caption">File Name</Typography>
        <Typography variant="caption">{file.name}</Typography>
      </Stack>,
      <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
        <Typography variant="caption">File Size</Typography>
        <Typography variant="caption">{prettyBytes(file.size)}</Typography>
      </Stack>,
      <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
        <Typography variant="caption">File Type</Typography>
        <Typography variant="caption">{file.type}</Typography>
      </Stack>,
    ];
  }
}
