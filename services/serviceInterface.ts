interface Document {
  id: string;
  created: Date;
  updated: Date;
  created_by: string;
}

export interface NasFolder extends Document {
  /**
   * The name of the folder
   */
  name: string;
  /**
   * The id of the parent folder
   */
  parent: string;
}

export interface NasFile extends Document {
  /**
   * Name of the file
   */
  name: string;
  /**
   * Parent of the file
   */
  parent: string;
  /**
   * Size of the file
   */
  size: number;
  /**
   * Download link of the file
   */
  file: string;

  /**
   * File type
   */
  type: string;
}

export interface NasFolderResponse {
  files: NasFile[];
  folders: NasFolder[];
}

export interface ServiceInterface {
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

  /**
   * Get a list of files by folder id
   * @param folderId Folder id null if it is root
   */
  getPinnedFilesByFolderId(folderId?: string): Promise<NasFile[]>;
}
