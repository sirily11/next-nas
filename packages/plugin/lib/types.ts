import { NasFile, NasFolder } from "common";

export type NotImplemented = "not implemented";
export type Implemented = "implemented";
export interface ContextMenu {
  name: string;
  isDivider?: boolean;
  onClick: () => void;
}

export interface PluginInterface {
  onFileClick(file: NasFile): NotImplemented | Implemented;

  onFileContextMenu(file: NasFile): NotImplemented | ContextMenu[];

  onFileHover(file: NasFile): NotImplemented | Implemented;

  onFileDoubleClick(file: NasFile): NotImplemented | Implemented;

  onFileAreaContextMenu(): NotImplemented | ContextMenu[];

  onFolderClick(folder: NasFolder): NotImplemented | Implemented;

  onFolderContextMenu(folder: NasFolder): NotImplemented | ContextMenu[];

  onFolderHover(folder: NasFolder): NotImplemented | Implemented;

  onFolderDoubleClick(folder: NasFolder): NotImplemented | Implemented;

  onFolderAreaContextMenu(): NotImplemented | ContextMenu[];

  onFilePreview(file: NasFile): NotImplemented | Implemented;

  fileIcon(file: NasFile): NotImplemented | JSX.Element;
}

export interface PluginProps {
  notify: (message: string, variant: any) => void;
  setTitle: (title: string) => void;
  showDialog: (children: JSX.Element) => void;
  closeDialog: () => void;
  useParent: () => string | undefined;
  isDialogOpen: boolean;
}
