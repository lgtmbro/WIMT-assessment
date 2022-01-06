import {
  referenceDataAgency,
  referenceDataRouteIdentifier,
  referenceDataRouteName,
} from "./regularExpressions";

const ReferenceDataSample =
  "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2 METRO;Ciudad Azteca - Buenavista\r\
route_cc4722b0-db3b-4732-9e5f-456325d59ffe METRO;Cuatro Caminos - Tasqueña\r\
route_29eac9a5-0133-4f1e-b69e-6eb8046c0c71 METRO;El Rosario - Barranca del Muerto\r\
";

describe("RE: When working with Reference Data", () => {
  it("The referenceDataRouteIdentifier RE should spit out route identifier EG: route_*UUID*", () => {
    expect(ReferenceDataSample.match(referenceDataRouteIdentifier)).toEqual([
      "route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2",
      "route_cc4722b0-db3b-4732-9e5f-456325d59ffe",
      "route_29eac9a5-0133-4f1e-b69e-6eb8046c0c71",
    ]);
  });

  it("The referenceDataAgency RE should spit out agency type EG: METRO", () => {
    expect(ReferenceDataSample.match(referenceDataAgency)).toEqual([
      "METRO",
      "METRO",
      "METRO",
    ]);
  });

  it("The referenceDataRouteName RE should spit out Route Name EG: Ciudad Azteca - Buenavista", () => {
    expect(ReferenceDataSample.match(referenceDataRouteName)).toEqual([
      "Ciudad Azteca - Buenavista",
      "Cuatro Caminos - Tasqueña",
      "El Rosario - Barranca del Muerto",
    ]);
  });
});
