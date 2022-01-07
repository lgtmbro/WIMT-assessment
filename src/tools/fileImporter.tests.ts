import { FileImporter } from "./fileImporter";
const simpleTestFilePath = "src/testData/simple_test.txt";
const dummyPath = "/this/is/a/dummy/path";

describe("When importing a file", () => {
  it("Should take a pathLike as param", () => {
    const file = new FileImporter(dummyPath);
    expect(file.filePath).toEqual(dummyPath);
  });

  it("Should async ingest file on .start()", async () => {
    const file = new FileImporter(simpleTestFilePath);
    expect(await file.import()).toBeTruthy();
    expect(file.fileData).toEqual("Hello World\n123");
  });

  it("Should fail nicly if you provide a bogus path", async () => {
    const file = new FileImporter(dummyPath);
    expect(await file.import()).toBeFalsy();
    expect(file.fileData).toBe("");
  });
});
