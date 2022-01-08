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
  ReferenceDataParser: ExpressionParser | undefined;

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

    const refRouteNameArr = this.ReferenceDataParser?.results.get("routeName");
    const refRouteIdentifierArr =
      this.ReferenceDataParser?.results.get("routeIdentifier");

    const routeNameIndex: { [key: string]: string } = {};
    refRouteIdentifierArr?.forEach((val: string, index: number) => {
      routeNameIndex[val] = refRouteNameArr?.at(index) || "";
      //   console.log("create", val, refRouteNameArr?.at(index) || "");
    });

    const scoreRouteIdentifierArr =
      this.ScoreParser?.results.get("routeIdentifier");
    const scoreDateArr = this.ScoreParser?.results.get("date") || [];
    const scoreScoreArr = this.ScoreParser?.results.get("score") || [];

    const sentimentScores: {
      [routeName: string]: {
        [dayOfTheWeek: string]: { count: number; total: number; score: number };
      };
    } = {};

    scoreRouteIdentifierArr?.forEach((val: string, index: number) => {
      if (
        Object.keys(routeNameIndex).includes(val) &&
        !["0", "10"].includes(scoreScoreArr[index])
      ) {
        const dayOfTheWeek =
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].at(new Date(scoreDateArr[index]).getUTCDay()) || "";

        const sentimentIdentifier = routeNameIndex[val];

        if (!sentimentScores[sentimentIdentifier]) {
          sentimentScores[sentimentIdentifier] = {};
        }

        if (!sentimentScores[sentimentIdentifier][dayOfTheWeek]) {
          sentimentScores[sentimentIdentifier][dayOfTheWeek] = {
            count: 0,
            score: 0,
            total: 0,
          };
        }

        sentimentScores[sentimentIdentifier][dayOfTheWeek];

        sentimentScores[sentimentIdentifier][dayOfTheWeek].total += Number(
          scoreScoreArr[index]
        );
        sentimentScores[sentimentIdentifier][dayOfTheWeek].count++;
        sentimentScores[sentimentIdentifier][dayOfTheWeek].score =
          sentimentScores[sentimentIdentifier][dayOfTheWeek].total /
          sentimentScores[sentimentIdentifier][dayOfTheWeek].count;
      } else {
        // console.log("failed", val);
      }
    });

    const output: String[] = [];
    for (const location in sentimentScores) {
      const days = [];
      for (const day in sentimentScores[location]) {
        days.push([sentimentScores[location][day].score.toFixed(2), day]);
      }
      days
        .sort()
        .reverse()
        .map(([score, day]) => {
          output.push(`${location} ${day} ${score}`);
        });
    }

    console.log(output.join("\n"));
    // console.log(Object.keys(routeNameIndex));
    // console.log(refRouteNameArr);
  }
}
