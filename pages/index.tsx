import { Divider, Grid } from "@mui/material";
import { NasFile, NasFolder, NasFolderResponse } from "common";
import type { GetServerSideProps, NextPage } from "next";
import FilesArea from "../components/nas/FilesArea";
import FolderList from "../components/nas/FolderList";
import { pocketBase } from "../services/pocketBaseService";

interface Props {
  data: NasFolderResponse;
  currentFolder?: NasFolder;
}

const Home: NextPage<Props> = ({ data, currentFolder }: Props) => {
  return (
    <Grid container sx={{ height: "100%" }} spacing={1}>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ height: "100%" }}>
        <FolderList folders={data.folders} currentFolder={currentFolder} />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <FilesArea files={data.files} />
      </Grid>
    </Grid>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
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
    },
  };
};
