// import { PathLike } from "fs";
// import { FileReadOptions, open } from "fs/promises";
import { FileImporter } from "./fileImporter";

export class Importer {
  public fileImporter: FileImporter | undefined = undefined;

  constructor(fileImporter: FileImporter) {
    this.fileImporter = fileImporter;
  }
}
