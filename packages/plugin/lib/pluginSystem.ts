import { Plugin } from "./plugin";
import { NasFile, NasFolder } from "common";
import { ContextMenu, PluginInterface, PluginProps } from "./types";

export class PluginSystem implements PluginInterface {
  plugins: Plugin[];
  props: PluginProps;

  constructor(props: PluginProps) {
    this.plugins = [];
    this.props = props;
  }
  onFileAreaContextMenu(): "not implemented" | ContextMenu[] {
    let menus: ContextMenu[] = [];
    for (const plugin of this.plugins) {
      const result = plugin.onFileAreaContextMenu();
      if (result !== "not implemented") {
        menus = menus.concat(result);
      }
    }

    if (menus.length === 0) {
      return "not implemented";
    }
    return menus;
  }
  onFolderAreaContextMenu(): "not implemented" | ContextMenu[] {
    let menus: ContextMenu[] = [];
    for (const plugin of this.plugins) {
      const result = plugin.onFolderAreaContextMenu();
      if (result !== "not implemented") {
        menus = menus.concat(result);
      }
    }

    if (menus.length === 0) {
      return "not implemented";
    }
    return menus;
  }
  onFileClick(file: NasFile): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFileClick(file);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }

  onFileContextMenu(file: NasFile): "not implemented" | ContextMenu[] {
    let menus: ContextMenu[] = [];
    for (const plugin of this.plugins) {
      const result = plugin.onFileContextMenu(file);
      if (result !== "not implemented") {
        menus = menus.concat(result);
      }
    }

    if (menus.length === 0) {
      return "not implemented";
    }
    return menus;
  }
  onFileHover(file: NasFile): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFileHover(file);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }
  onFileDoubleClick(file: NasFile): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFileDoubleClick(file);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }
  onFolderClick(folder: NasFolder): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFolderClick(folder);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }
  onFolderContextMenu(folder: NasFolder): "not implemented" | ContextMenu[] {
    let menus: ContextMenu[] = [];
    for (const plugin of this.plugins) {
      const result = plugin.onFolderContextMenu(folder);
      if (result !== "not implemented") {
        menus = menus.concat(result);
      }
    }

    if (menus.length === 0) {
      return "not implemented";
    }
    return menus;
  }
  onFolderHover(folder: NasFolder): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFolderClick(folder);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }
  onFolderDoubleClick(folder: NasFolder): "not implemented" | "implemented" {
    for (const plugin of this.plugins) {
      const result = plugin.onFolderClick(folder);
      if (result === "implemented") {
        return "implemented";
      }
    }
    return "not implemented";
  }
  onFilePreview(file: NasFile): "not implemented" | JSX.Element[] {
    let previewContents: JSX.Element[] = [];

    for (const plugin of this.plugins) {
      const result = plugin.onFilePreview(file);
      if (result !== "not implemented") {
        previewContents = previewContents.concat(result);
      }
    }

    if (previewContents.length !== 0) {
      return previewContents;
    }
    return "not implemented";
  }

  fileIcon(file: NasFile): "not implemented" | JSX.Element {
    for (const plugin of this.plugins) {
      const result = plugin.fileIcon(file);
      if (result !== "not implemented") {
        return result;
      }
    }
    return "not implemented";
  }

  /**
   * Load plguin
   * @param plugin Plugin package name
   */
  loadPlugin(plugin: any, pluginName: string) {
    const LoadedPlugin = plugin;
    const pluginInstance = new LoadedPlugin({
      name: pluginName,
      ...this.props,
    });
    console.log("Loaded plugin", pluginName);
    this.plugins.push(pluginInstance);
  }
}
