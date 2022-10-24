import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Card,
  CardContent,
  CircularProgress,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UIContext } from "../../contexts/UIProvider";

interface Props {}

const SignIn: NextPage<Props> = ({}: Props) => {
  const { notify } = useContext(UIContext);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result?.error) {
        notify(result?.error, "error");
      }

      if (result?.ok) {
        await router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        justifyContent={"end"}
        sx={{
          backgroundImage: "url(/bg.jpg)",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid p={5} lg={4} md={6} mt={10} item>
          <Card variant="outlined">
            <CardContent>
              <Stack p={5}>
                <Typography variant="h5" fontWeight={"bold"}>
                  NextNas
                </Typography>
                <Typography variant="subtitle1" mt={5}>
                  Sign in
                </Typography>
                <Stack spacing={4} mt={2} minHeight={300}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Fab
            color="primary"
            size="large"
            style={{ position: "relative", left: "95%", bottom: "20%" }}
            type="submit"
          >
            {formik.isSubmitting ? (
              <CircularProgress color="secondary" />
            ) : (
              <NavigateNextIcon />
            )}
          </Fab>
        </Grid>

        <Grid lg={2} md={1} item />
      </Grid>
    </form>
  );
};

export default SignIn;
