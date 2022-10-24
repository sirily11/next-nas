import { Grid } from "@mui/material";
import { NasFile } from "common";
import { PopupState } from "material-ui-popup-state/core";

import FileItem from "./FileItem";

interface Props {
  files: NasFile[];
  parentPopupState: PopupState;
  highlightedFile?: NasFile;
}

export default function FilesList({
  files,
  parentPopupState,
  highlightedFile,
}: Props) {
  return (
    <Grid container spacing={2}>
      {files.map((file) => (
        <Grid item lg={2} md={3} key={`file-${file.id}`}>
          <FileItem
            file={file}
            parentPopupState={parentPopupState}
            hightlightedFile={highlightedFile}
          />
        </Grid>
      ))}
    </Grid>
  );
}
