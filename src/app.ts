import path from "path";
import { FileExporter } from "./tools/fileExporter";
import { FileImporter } from "./tools/fileImporter";
import { TransportFeedbackScoring } from "./transportFeedbackScoring";

const dataPath = "data";
const scoresPath = path.join(dataPath, "scores.txt");
const referenceDataPath = path.join(dataPath, "reference-data.txt");

const scoreFileImporter = new FileImporter(scoresPath);
const referenceFileImporter = new FileImporter(referenceDataPath);
const output = new FileExporter(dataPath);

const transportFeedbackScoring = new TransportFeedbackScoring(
  scoreFileImporter,
  referenceFileImporter,
  output
);
transportFeedbackScoring
  .run()
  .then((res) => {
    if (res) {
      console.log(`Result: ${path.resolve(`${dataPath}/results.txt`)}`);
    }
  })
  .catch((err) => console.error(err));
