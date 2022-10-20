import { useCallback } from "react";
import { PocketBaseService } from "../services/pocketBaseService";
import { NasFolder } from "../services/serviceInterface";
import { useParent } from "./useParent";

export function useFolder() {
  const createFolder = useCallback(async (folder: NasFolder) => {
    const service = new PocketBaseService();
    await service.createFolder(folder);
  }, []);

  return { createFolder };
}
