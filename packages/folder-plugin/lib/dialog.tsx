import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { NasFolder } from "common";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { PluginProps } from "plugin/lib/types";

interface Props extends PluginProps {
  folder?: NasFolder;
}

export function FolderDialog(props: Props) {
  //   const { createFolder } = useFolder();
  //   const parent = useParent();

  const formik = useFormik({
    initialValues: props.folder ?? {
      name: "",
      parent: parent,
    },
    onSubmit: async (values) => {
      //   try {
      //     if (props.folder) {
      //       // update folder
      //     } else {
      //       // create folder
      //       await createFolder(values as NasFolder);
      //       notify("Folder created", "success");
      //       closeDialog();
      //     }
      //   } catch (err) {
      //     notify(`${err}`, "error");
      //   }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog open={props.isDialogOpen} fullWidth>
        <DialogTitle>
          {props.folder ? "Edit folder" : "Create a new folder"}
        </DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Folder name"
              name="name"
              value={formik.values.name}
              helperText="Folder name"
              onChange={formik.handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.closeDialog()}>Close</Button>
          <LoadingButton
            loading={formik.isSubmitting}
            onClick={() => formik.submitForm()}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </form>
  );
}
