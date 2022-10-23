import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { NasFile, NasFolder } from "common";
import { useFormik } from "formik";
import { PluginProps } from "plugin/lib/types";
import { useCallback, useState } from "react";

interface Props extends PluginProps {}

export function UploadDialog(props: Props) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<NasFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<NasFile[]>([]);
  const parent = props.useParent();

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const inputFiles = Array.from(e.target.files);
        const newFiles: NasFile[] = inputFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          parent: parent as any,
          pinned: false,
          file: file as any,
          id: null as any,
        }));
        setUploadedFiles([]);
        setFiles(newFiles);
      }
    },
    []
  );

  const upload = useCallback(async () => {
    if (files.length === 0) {
      return;
    }
    setLoading(true);
    for (const file of files) {
      try {
        await props.service.uploadFile(file);
      } catch (err) {
        console.error("failed to upload file", file, err);
        props.notify(`Failed to upload file ${file.name}`, "error");
      }
      setUploadedFiles((prev) => [...prev, file]);
    }
    setLoading(false);
    props.notify("Uploaded the file", "success");
    props.closeDialog();
  }, [files]);

  return (
    <Dialog open={props.isDialogOpen} fullWidth>
      <DialogTitle>Upload files</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Card variant="outlined">
            {loading && (
              <LinearProgress value={uploadedFiles.length / files.length} />
            )}
            <Stack
              p={2}
              direction="row"
              justifyContent={"space-between"}
              alignContent="center"
            >
              <Typography>
                {files.length === 0
                  ? "No file selected"
                  : `Uploading ${uploadedFiles.length}/${files.length}`}
              </Typography>
              <Button component="label">
                Pick files
                <input hidden multiple type="file" onChange={onInputChange} />
              </Button>
            </Stack>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeDialog()}>Close</Button>
        <LoadingButton loading={loading} onClick={() => upload()}>
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
