import {
  referenceDataAgency,
  routeIdentifier,
  referenceDataRouteName,
  scoresDataDate,
  scoresDataScore,
} from "./regularExpressions";

const referenceDataSample =
  "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2 METRO;Ciudad Azteca - Buenavista\n\
route_cc4722b0-db3b-4732-9e5f-456325d59ffe METRO;Cuatro Caminos - Tasqueña\n\
route_29eac9a5-0133-4f1e-b69e-6eb8046c0c71 METRO;El Rosario - Barranca del Muerto\n\
";

const scoresDataSample =
  "\
2021/11/08 route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2 0\n\
2021/11/17 route_cc4722b0-db3b-4732-9e5f-456325d59ffe 6\n\
2021/11/17 route_22b69e06-ca4c-4d2c-bd10-8376e65e582d 2\n\
2021/11/16 route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2 10\n\
";

describe("RE: When working with Reference Data", () => {
  it("The routeIdentifier RE should spit out route identifiers EG: route_*UUID*", () => {
    expect(referenceDataSample.match(routeIdentifier)).toEqual([
      "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2",
      "route_cc4722b0-db3b-4732-9e5f-456325d59ffe",
      "route_29eac9a5-0133-4f1e-b69e-6eb8046c0c71",
    ]);
  });

  it("The referenceDataAgency RE should spit out agency types EG: METRO", () => {
    expect(referenceDataSample.match(referenceDataAgency)).toEqual([
      "METRO",
      "METRO",
      "METRO",
    ]);
  });

  it("The referenceDataRouteName RE should spit out Route Names EG: Ciudad Azteca - Buenavista", () => {
    expect(referenceDataSample.match(referenceDataRouteName)).toEqual([
      "Ciudad Azteca - Buenavista",
      "Cuatro Caminos - Tasqueña",
      "El Rosario - Barranca del Muerto",
    ]);
  });
});

describe("RE: When working with Scores", () => {
  it("The routeIdentifier RE should spit out route identifiers EG: route_*UUID*", () => {
    expect(scoresDataSample.match(routeIdentifier)).toEqual([
      "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2",
      "route_cc4722b0-db3b-4732-9e5f-456325d59ffe",
      "route_22b69e06-ca4c-4d2c-bd10-8376e65e582d",
      "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2",
    ]);
  });

  it("The scoresDataDate RE should spit dates EG: 2021/11/08", () => {
    expect(scoresDataSample.match(scoresDataDate)).toEqual([
      "2021/11/08",
      "2021/11/17",
      "2021/11/17",
      "2021/11/16",
    ]);
  });

  it("The scoresDataScore RE should spit out scores EG: 0 - 10", () => {
    expect(scoresDataSample.match(scoresDataScore)).toEqual([
      "0",
      "6",
      "2",
      "10",
    ]);
  });
});
