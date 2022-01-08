import { PathLike } from "fs";
import path from "path";
import { writeFile } from "fs/promises";

interface IFileExporter {
  path: PathLike;
  run(fileName: string, data: string): Promise<Boolean>;
}

export class FileExporter implements IFileExporter {
  path: PathLike;
  data: string = "EMPTY";

  constructor(path: PathLike) {
    this.path = path;
  }

  async run(fileName: string, data: string): Promise<Boolean> {
    if (data.length > 0 && fileName.length > 0) {
      try {
        await writeFile(path.join(`${this.path}`, fileName), data);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}
