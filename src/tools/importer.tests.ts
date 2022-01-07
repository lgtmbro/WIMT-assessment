import { access, constants } from "fs";
import { Importer } from "./importer";

const { F_OK } = constants;
const sample_reference_data_path = "src/testData/reference-data.txt";
const sample_scores_path = "src/testData/scores.txt";

describe("Before Importing Data", () => {
  it("Must ensure that the sample data files exist", () => {
    access(sample_reference_data_path, F_OK, (err) => {
      expect(err).toBeNull();
    });

    access(sample_scores_path, F_OK, (err) => {
      expect(err).toBeNull();
    });
  });
});

// describe("When opening the reference file", () => {
//   it("It should ingest the file provided", async () => {
//     const referenceData = new Importer(sample_reference_data_path);
//     expect(referenceData).toBeDefined();
//     expect(referenceData.filePath).toBe(sample_reference_data_path);
//     expect(await referenceData.start()).toBeUndefined();
//     expect(referenceData.fileData).not.toBeNull();
//   });
// });
