import { NasFolder } from "common";
import { useCallback } from "react";
import { PocketBaseService } from "../services/pocketBaseService";

export function useFolder() {
  const createFolder = useCallback(async (folder: NasFolder) => {
    const service = new PocketBaseService();
    await service.createFolder(folder);
  }, []);

  return { createFolder };
}
