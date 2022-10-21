import { Divider, Grid } from "@mui/material";
import { NasFile, NasFolder, NasFolderResponse } from "common";
import type { GetServerSideProps, NextPage } from "next";
import FilesArea from "../components/nas/FilesArea";
import FolderList from "../components/nas/FolderList";
import { PocketBaseService } from "../services/pocketBaseService";

interface Props {
  data: NasFolderResponse;
  currentFolder?: NasFolder;
  pinnedFiles: NasFile[];
}

const Home: NextPage<Props> = ({ data, currentFolder, pinnedFiles }: Props) => {
  return (
    <Grid container sx={{ height: "100%" }} spacing={1}>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ height: "100%" }}>
        <FolderList folders={data.folders} currentFolder={currentFolder} />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <FilesArea pinnedFiles={pinnedFiles} files={data.files} />
      </Grid>
    </Grid>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new PocketBaseService();
  let folder = context.query.folder as string | undefined;

  if (!folder) {
    folder = "";
  }

  const [result, currentFolder, pinnedFiles] = await Promise.all([
    service.getFilesByParentId(folder),
    service.getFolderById(folder),
    service.getPinnedFilesByFolderId(folder),
  ]);

  return {
    props: {
      data: JSON.parse(JSON.stringify(result)),
      currentFolder:
        currentFolder === undefined
          ? null
          : JSON.parse(JSON.stringify(currentFolder)),
      pinnedFiles: JSON.parse(JSON.stringify(pinnedFiles)),
    },
  };
};
