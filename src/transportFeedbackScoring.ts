import { execPath } from "process";
import { ExpressionParser } from "./tools/expressionParser";
import { FileImporter } from "./tools/fileImporter";
import {
  referenceDataAgency,
  referenceDataRouteName,
  routeIdentifier,
  scoresDataDate,
  scoresDataScore,
} from "./tools/regularExpressions";

interface ITransportFeedbackScoring {
  scoreFile: FileImporter;
  referenceDataFile: FileImporter;
  ScoreParser: ExpressionParser | undefined;
  ReferenceDataParser: ExpressionParser | undefined;
}

export class TransportFeedbackScoring implements ITransportFeedbackScoring {
  scoreFile: FileImporter;
  ScoreParser: ExpressionParser | undefined;

  referenceDataFile: FileImporter;
  ReferenceDataParser: ExpressionParser;

  constructor(scoreFile: FileImporter, referenceDataFile: FileImporter) {
    this.scoreFile = scoreFile;
    this.referenceDataFile = referenceDataFile;
  }

  async importFiles() {
    const files = [this.scoreFile, this.referenceDataFile];
    const promises = files.map((file) => file.import());
    const res = await Promise.all(promises);

    for (const file in res) {
      if (!res[file]) {
        throw new Error(`Failed to import ${files[file].filePath}`);
      }
    }
  }

  parseFiles() {
    this.ScoreParser = new ExpressionParser(
      [
        {
          name: "date",
          re: scoresDataDate,
        },
        {
          name: "routeIdentifier",
          re: routeIdentifier,
        },
        {
          name: "score",
          re: scoresDataScore,
        },
      ],
      this.scoreFile.fileData
    );

    this.ReferenceDataParser = new ExpressionParser(
      [
        {
          name: "routeIdentifier",
          re: routeIdentifier,
        },
        {
          name: "agency",
          re: referenceDataAgency,
        },
        {
          name: "routeName",
          re: referenceDataRouteName,
        },
      ],
      this.referenceDataFile.fileData
    );

    // run both parsers
    this.ScoreParser.run();
    this.ReferenceDataParser.run();
  }

  async run() {
    await this.importFiles();
    this.parseFiles();

    const refernceData: Array<Array<String>> = [];
    this.ReferenceDataParser?.results.forEach((value, key) => {
      refernceData.push(value);
    });

    this.ReferenceDataParser.console.log(refernceData);

    // for (const [key, value] of .entries()) {
    //   console.log(key, value.length);
    // }
  }
}
