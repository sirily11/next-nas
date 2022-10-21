import { NasFile } from "common";
import { Plugin } from "./plugin";

export default class TestPlugin extends Plugin {
  constructor() {
    super({
      name: "test",
      notify(message, variant) {},
      setTitle(title) {},
      showDialog(children) {},
      closeDialog() {},
      useParent() {
        return undefined;
      },
      isDialogOpen: false,
    });
  }

  onFileClick(file: NasFile): "not implemented" | "implemented" {
    return "implemented";
  }
}
