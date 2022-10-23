import { NasFile, NasFolder } from "./";

export interface NasFolderResponse {
  files: NasFile[];
  folders: NasFolder[];
}

export interface ServiceInterface {
  getFileURL(file: NasFile): string;

  /**
   * Get list of files and folders by parent id
   * @param parentId Parent id, null if it is root
   */
  getFilesByParentId(parentId?: string): Promise<NasFolderResponse>;

  /**
   * Create a new folder
   */
  createFolder(folder: NasFolder): Promise<NasFolder>;

  /**
   * Delete a folder
   */
  deleteFolder(folderId?: string): Promise<void>;

  /**
   * Edit a folder
   */
  editFolder(folder: NasFolder): Promise<NasFolder>;

  getFolderById(folderId?: string): Promise<NasFolder | undefined>;

  updateFile(file: NasFile): Promise<NasFile>;

  deleteFile(fileId?: string): Promise<void>;

  uploadFile(file: NasFile): Promise<NasFile>;
}
