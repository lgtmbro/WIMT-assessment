import { PathLike } from "fs";
import { open } from "fs/promises";

interface IFileImporter {
  filePath: PathLike;
  fileData: string;
  run(): Promise<Boolean>;
}
export class FileImporter implements IFileImporter {
  public filePath: PathLike;
  public fileData: string;

  constructor(filePath: PathLike) {
    this.filePath = filePath;
    this.fileData = "";
  }

  async run(): Promise<Boolean> {
    try {
      const file = await open(this.filePath, "r");
      this.fileData = await file.readFile("utf-8");
      file.close();
      return true;
    } catch (e) {
      return false;
    }
  }
}
