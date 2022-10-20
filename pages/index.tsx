import { Card, Divider, Grid } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import FolderList from "../components/nas/FolderList";
import { PocketBaseService } from "../services/pocketBaseService";
import { NasFolder, NasFolderResponse } from "../services/serviceInterface";

interface Props {
  data: NasFolderResponse;
  currentFolder?: NasFolder;
}

const Home: NextPage<Props> = ({ data, currentFolder }: Props) => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ height: "100%" }}>
        <FolderList folders={data.folders} currentFolder={currentFolder} />
      </Grid>
      <Divider orientation="vertical" flexItem />
    </Grid>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new PocketBaseService();
  const folder = context.query.folder as string | undefined;

  const [result, currentFolder] = await Promise.all([
    service.getFilesByParentId(folder),
    service.getFolderById(folder),
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
