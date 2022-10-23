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
  url: string;

  constructor(client?: PocketBase) {
    if (client) {
      this.client = client;
      this.url = client.baseUrl;
    } else {
      this.url = process.env.NEXT_PUBLIC_POCKETBASE_URL!;
      this.client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL!);
    }
  }
  getFileURL(file: NasFile): string {
    return `${this.url}/api/files/files/${file.id}/${file.file}`;
  }

  async uploadFile(file: NasFile): Promise<NasFile> {
    const formData = new FormData();
    Object.entries(file).forEach(([key, value]) => {
      if (key === "id") {
        return;
      }
      formData.append(key, value);
    });
    const result = await this.client.records.create("files", formData);
    return result as any as NasFile;
  }
  async deleteFile(fileId?: string | undefined): Promise<void> {
    await this.client.records.delete("files", fileId!);
  }
  async updateFile(file: NasFile): Promise<NasFile> {
    console.log("updating file", file);
    const result = await this.client.records.update("files", file.id, file);

    return result as any as NasFile;
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
  async deleteFolder(folderId?: string | undefined): Promise<void> {
    await this.client.records.delete("folders", folderId!);
  }
  async editFolder(folder: NasFolder): Promise<NasFolder> {
    const result = await this.client.records.update(
      "folders",
      folder.id,
      folder
    );

    return result as any as NasFolder;
  }
}

export const pocketBase = new PocketBaseService();
