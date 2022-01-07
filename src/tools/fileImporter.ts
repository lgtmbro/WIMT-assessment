import { PathLike } from "fs";
import { open } from "fs/promises";

export class FileImporter {
  public filePath: PathLike;
  public fileData: String;

  constructor(filePath: PathLike) {
    this.filePath = filePath;
    this.fileData = "";
  }

  public import = async () => {
    try {
      const file = await open(this.filePath, "r");
      this.fileData = await file.readFile("utf-8");
      file.close();
      return true;
    } catch (e) {
      return false;
    }
  };
}
