import { NasFile } from "common";
import { Plugin } from "plugin";
import ImagePanel from "./panel";
import Image from "next/image";

export default class ImagePlugin extends Plugin {
  onFileClick(file: NasFile): "not implemented" | "implemented" {
    if (!file.type.startsWith("image/")) {
      return "not implemented";
    }

    this.props.showRightPanel(<ImagePanel file={file} {...this.props} />);

    return "implemented";
  }

  fileIcon(file: NasFile): "not implemented" | JSX.Element {
    if (!file.type.startsWith("image/")) {
      return "not implemented";
    }

    return <Image src={"/photo.svg"} width={50} height={50} />;
  }
}
