import { FileImporter } from "./fileImporter";
const simpleTestFilePath = "src/testData/simple_test.txt";
const dummyPath = "/this/is/a/dummy/path";

describe("When importing a file", () => {
  it("Should take a pathLike as param", () => {
    const fileImport = new FileImporter(dummyPath);
    expect(fileImport.filePath).toEqual(dummyPath);
  });

  it("Should async ingest file on .start()", async () => {
    const fileImport = new FileImporter(simpleTestFilePath);
    expect(await fileImport.run()).toBeTruthy();
    expect(fileImport.fileData).toEqual("Hello World\n123");
  });

  it("Should fail nicly if you provide a bogus path", async () => {
    const fileImport = new FileImporter(dummyPath);
    expect(await fileImport.run()).toBeFalsy();
    expect(fileImport.fileData).toBe("");
  });
});
