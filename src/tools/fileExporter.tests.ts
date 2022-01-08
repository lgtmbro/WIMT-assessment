import { FileExporter } from "./fileExporter";
import { FileImporter } from "./fileImporter";

import path from "path";
import os from "os";

import { mkdtemp } from "fs/promises";
import { PathLike, rm } from "fs";

const dummyData = "\
Hello World\n\
123\n\
";

let folderPath: PathLike = "";

describe("When exporting a file with the FileExporter", () => {
  beforeEach(async () => {
    folderPath = await mkdtemp(path.join(os.tmpdir(), "testCreateFile-"));
  });

  afterEach(() => {
    if (folderPath != "")
      rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error("CANT REMOVE: ", folderPath, err);
        }
      });
  });

  it("Should take a path as init arg", () => {
    const fileExport = new FileExporter(folderPath);
    expect(fileExport.path).not.toBe("");
    expect(fileExport.path).toBe(folderPath);
  });

  it("Should return true on .run(data) if all went well", async () => {
    const fileExport = new FileExporter(folderPath);
    const op = await fileExport.run("test.txt", dummyData);
    expect(op).toBe(true);

    const fileImport = new FileImporter(path.join(`${folderPath}`, "test.txt"));
    expect(await fileImport.run()).toBe(true);
    expect(fileImport.fileData).toBe(dummyData);
  });

  it("Should return false if the export fails", async () => {
    const fileExport = new FileExporter(folderPath + "BROKEN");
    const op = await fileExport.run("test.txt", dummyData);
    expect(op).toBe(false);
  });

  it("Should return false if no data provided", async () => {
    const fileExport = new FileExporter(folderPath + "BROKEN");
    const op = await fileExport.run("", "");
    expect(op).toBe(false);
  });
});
