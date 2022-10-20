import {
  NasFolder,
  ServiceInterface,
  NasFile,
  NasFolderResponse,
} from "./serviceInterface";
import PocketBase from "pocketbase";

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
