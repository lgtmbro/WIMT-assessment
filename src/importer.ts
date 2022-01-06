import { PathLike } from "fs";
import { open } from "fs/promises";

export class Importer {
  public filePath: PathLike;
  public spliterEx: Array<RegExp> | undefined;
  public fileData: Buffer | undefined;

  constructor(
    filePath: PathLike,
    spliterEx: Array<RegExp> | undefined = undefined
  ) {
    this.filePath = filePath;
    this.spliterEx = spliterEx;
  }

  public start = async () => {
    try {
      const file = await open(this.filePath, "r");
      this.fileData = await file.readFile();
    } catch (e) {
      throw new Error(`Failed to import ${this.filePath}`);
    }
  };
}
