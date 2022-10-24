import { Divider, Grid } from "@mui/material";
import { NasFolder, NasFolderResponse } from "common";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";
import FilesArea from "../components/nas/FilesArea";
import FolderList from "../components/nas/FolderList";
import { pocketBase } from "../services/pocketBaseService";
import { requireAuthentication } from "../utils/requireAuthentication";

interface Props {
  data: NasFolderResponse;
  currentFolder?: NasFolder;
  accessToken: string;
  user: any;
}

const Home: NextPage<Props> = ({
  data,
  currentFolder,
  accessToken,
  user,
}: Props) => {
  useEffect(() => {
    pocketBase.client.authStore.save(accessToken, user);
  }, [accessToken, user]);

  return (
    <Layout>
      <Grid container sx={{ height: "100%" }} spacing={1}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ height: "100%" }}>
          <FolderList folders={data.folders} currentFolder={currentFolder} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <FilesArea files={data.files} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    let folder = context.query.folder as string | undefined;
    if (!folder) {
      folder = "";
    }

    const [result, currentFolder] = await Promise.all([
      pocketBase.getFilesByParentId(folder),
      pocketBase.getFolderById(folder),
    ]);

    return {
      props: {
        data: JSON.parse(JSON.stringify(result)),
        currentFolder:
          currentFolder === undefined
            ? null
            : JSON.parse(JSON.stringify(currentFolder)),
        accessToken,
        user,
      },
    };
  });
