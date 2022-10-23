import { NasFile, NasFolder } from "common";
import {
  NotImplemented,
  Implemented,
  PluginInterface,
  ContextMenu,
  PluginProps,
} from "./types";

interface Props extends PluginProps {
  name: string;
}

export class Plugin implements PluginInterface {
  name: string;
  props: PluginProps;

  constructor({ name, ...rest }: Props) {
    this.name = name;
    this.props = rest;
  }
  onFileAreaContextMenu(): ContextMenu[] | "not implemented" {
    return "not implemented";
  }
  onFolderAreaContextMenu(): ContextMenu[] | "not implemented" {
    return "not implemented";
  }

  /**
   * Callback function when file has been clicked
   * @param file Clicked file
   * @returns
   */
  onFileClick(file: NasFile): NotImplemented | Implemented {
    return "not implemented";
  }

  onFileContextMenu(file: NasFile): NotImplemented | ContextMenu[] {
    return "not implemented";
  }

  onFileHover(file: NasFile): NotImplemented | Implemented {
    return "not implemented";
  }

  onFileDoubleClick(file: NasFile): NotImplemented | Implemented {
    return "not implemented";
  }

  onFolderClick(folder: NasFolder): NotImplemented | Implemented {
    return "not implemented";
  }

  onFolderContextMenu(folder: NasFolder): NotImplemented | ContextMenu[] {
    return "not implemented";
  }

  onFolderHover(folder: NasFolder): NotImplemented | Implemented {
    return "not implemented";
  }

  onFolderDoubleClick(folder: NasFolder): NotImplemented | Implemented {
    return "not implemented";
  }

  onFilePreview(file: NasFile): NotImplemented | JSX.Element[] {
    return "not implemented";
  }

  fileIcon(file: NasFile): NotImplemented | JSX.Element {
    return "not implemented";
  }
}
