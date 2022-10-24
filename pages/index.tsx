import { Divider, Grid } from "@mui/material";
import { NasFile, NasFolder, NasFolderResponse } from "common";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
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
  highlightedFile?: NasFile;
}

const Home: NextPage<Props> = ({
  data,
  currentFolder,
  accessToken,
  user,
  highlightedFile,
}: Props) => {
  useEffect(() => {
    pocketBase.client.authStore.save(accessToken, user);
  }, [accessToken, user]);

  return (
    <Layout>
      <Head>
        <title>NextNas</title>
      </Head>
      <Grid container sx={{ height: "100%" }} spacing={1}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{ height: "100%" }}>
          <FolderList folders={data.folders} currentFolder={currentFolder} />
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ marginTop: 1 }} />
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <FilesArea files={data.files} highlightedFile={highlightedFile} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    let folder = context.query.folder as string | undefined;
    let highlightedFile = context.query.file as string | undefined;
    let highlightedFileName = context.query.fileName as string | undefined;

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
        highlightedFile: JSON.parse(
          JSON.stringify({
            id: highlightedFile,
            name: highlightedFileName,
          })
        ),
      },
    };
  });
