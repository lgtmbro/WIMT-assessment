import { PathLike } from "fs";
import { open } from "fs/promises";

export class Importer<T> {
  public filePath: PathLike;
  public spliterEx: Array<T> | undefined;
  public fileData: Buffer | undefined;

  constructor(
    filePath: PathLike,
    spliterEx: Array<{}> | undefined = undefined
  ) {
    this.filePath = filePath;
    this.spliterEx = spliterEx;
  }

  public start = async () => {
    try {
      const file = await open(this.filePath, "r");
      this.fileData = await file.readFile("utf-8");
    } catch (e) {
      throw new Error(`Failed to import ${this.filePath}`);
    }
  };
}
