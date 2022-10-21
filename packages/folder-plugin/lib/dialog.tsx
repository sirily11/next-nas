import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { NasFolder } from "common";
import { useFormik } from "formik";
import { PluginProps } from "plugin/lib/types";

interface Props extends PluginProps {
  folder?: NasFolder;
}

export function FolderDialog(props: Props) {
  const formik = useFormik({
    initialValues: props.folder ?? {
      name: "",
      parent: props.useParent(),
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (props.folder) {
          // update folder
        } else {
          // create folder
          await props.service.createFolder(values as NasFolder);
          props.notify("Folder created", "success");
          props.closeDialog();
        }
      } catch (err) {
        console.error(err);
        props.notify(`${err}`, "error");
      }
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
