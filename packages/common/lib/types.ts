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
