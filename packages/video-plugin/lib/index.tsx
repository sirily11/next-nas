import { NasFile } from "common";
import { Plugin } from "plugin";
import VideoPanel from "./panel";
import Image from "next/image";

export default class ImagePlugin extends Plugin {
  onFileClick(file: NasFile): "not implemented" | "implemented" {
    if (!file.type.startsWith("video/")) {
      return "not implemented";
    }

    this.props.showRightPanel(<VideoPanel file={file} {...this.props} />);

    return "implemented";
  }

  fileIcon(file: NasFile): "not implemented" | JSX.Element {
    if (!file.type.startsWith("video/")) {
      return "not implemented";
    }

    return <Image src={"/video.svg"} width={50} height={50} />;
  }
}
