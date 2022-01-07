// import { PathLike } from "fs";
// import { FileReadOptions, open } from "fs/promises";
import { FileImporter } from "./fileImporter";

interface IImporter {
  fileImporter: FileImporter;
}

export class Importer implements IImporter {
  public fileImporter: FileImporter;
  constructor(fileImporter: FileImporter) {
    this.fileImporter = fileImporter;
  }
}
