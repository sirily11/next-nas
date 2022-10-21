import PocketBase from "pocketbase";
import {
  NasFile,
  NasFolder,
  NasFolderResponse,
  ServiceInterface,
} from "common";

/**
 * Create a pocket base service
 */
export class PocketBaseService implements ServiceInterface {
  client: PocketBase;

  constructor(client?: PocketBase) {
    if (client) {
      this.client = client;
    } else {
      this.client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL!);
    }
  }
  async getPinnedFilesByFolderId(
    folderId?: string | undefined
  ): Promise<NasFile[]> {
    const result = await this.client.records.getFullList(
      "pinnedFiles",
      undefined,
      {
        filter: `folder = "${folderId ?? null}"`,
        expand: "file",
      }
    );

    const files = result.map((file) => file["@expand"].file);

    return files as any as NasFile[];
  }

  async getFolderById(
    folderId?: string | undefined
  ): Promise<NasFolder | undefined> {
    if (folderId === undefined || folderId === null || folderId === "") {
      return undefined;
    }
    const result = await this.client.records.getOne("folders", folderId!);
    return result as any as NasFolder;
  }

  async getFilesByParentId(
    parentId?: string | undefined
  ): Promise<NasFolderResponse> {
    const [files, folders] = await Promise.all([
      this.client.records.getFullList("files", undefined, {
        filter: `parent = ${`"${parentId}"` ?? "null"}`,
      }),
      this.client.records.getFullList("folders", undefined, {
        filter: `parent = ${`"${parentId}"` ?? "null"}`,
      }),
    ]);

    return {
      files: files as any as NasFile[],
      folders: folders as any as NasFolder[],
    };
  }

  async createFolder(folder: NasFolder): Promise<NasFolder> {
    const result = await this.client.records.create("folders", folder);

    return result as any as NasFolder;
  }
  deleteFolder(folderId?: string | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  editFolder(folder: NasFolder): Promise<NasFolder> {
    throw new Error("Method not implemented.");
  }
}

export const pocketBase = new PocketBaseService();
