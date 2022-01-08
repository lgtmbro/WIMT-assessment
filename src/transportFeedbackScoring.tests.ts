import { FileExporter } from "./tools/fileExporter";
import { FileImporter } from "./tools/fileImporter";
import { TransportFeedbackScoring } from "./transportFeedbackScoring";

import { PathLike, rm } from "fs";
import { mkdtemp } from "fs/promises";

import path from "path";
import os from "os";

const referenceDataPath = "src/testData/reference-data.txt";
const scoresPath = "src/testData/scores.txt";
const sampleOutputPath = "src/testData/expected-results.txt";
let outputPath: PathLike = "";

describe("Test Transport Feedback Scoring Report", () => {
  beforeEach(async () => {
    outputPath = await mkdtemp(path.join(os.tmpdir(), "testFeedbackScore-"));
  });

  afterEach(() => {
    if (outputPath != "")
      rm(outputPath, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error("CANT REMOVE: ", outputPath, err);
        }
      });
  });

  test("Run test import for transportFeedbackScoring", async () => {
    const scoreFileImporter = new FileImporter(scoresPath);
    const referenceFileImporter = new FileImporter(referenceDataPath);
    const output = new FileExporter(outputPath);

    const transportFeedbackScoring = new TransportFeedbackScoring(
      scoreFileImporter,
      referenceFileImporter,
      output
    );

    expect(await transportFeedbackScoring.run()).toBe(true);

    const generatedOutput = new FileImporter(
      path.join(`${outputPath}`, "results.txt")
    );
    expect(await generatedOutput.run()).toBe(true);

    const sampleOutput = new FileImporter(sampleOutputPath);
    expect(await sampleOutput.run()).toBe(true);

    expect(generatedOutput.fileData).toEqual(sampleOutput.fileData);
  });

  test("Run test import with dodgy file path", async () => {
    const scoreFileImporter = new FileImporter(scoresPath + "BROKEN");
    const referenceFileImporter = new FileImporter(referenceDataPath);
    const output = new FileExporter("");

    await expect(
      new TransportFeedbackScoring(
        scoreFileImporter,
        referenceFileImporter,
        output
      ).importFiles()
    ).rejects.toEqual(Error("Failed to import src/testData/scores.txtBROKEN"));
  });
});
