import { runMain } from "module";
import { FileImporter } from "./tools/fileImporter";
import { TransportFeedbackScoring } from "./transportFeedbackScoring";

const referenceDataPath = "src/testData/reference-data.txt";
const scoresPath = "src/testData/scores.txt";

test("Run test import for transportFeedbackScoring", async () => {
  const scoreFileImporter = new FileImporter(scoresPath);
  const referenceFileImporter = new FileImporter(referenceDataPath);

  const transportFeedbackScoring = new TransportFeedbackScoring(
    scoreFileImporter,
    referenceFileImporter
  );

  await transportFeedbackScoring.run();
});
