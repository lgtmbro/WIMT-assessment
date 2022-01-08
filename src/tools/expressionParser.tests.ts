import { ExpressionParser, IExpressionInput } from "./expressionParser";
import {
  referenceDataAgency,
  referenceDataRouteName,
  routeIdentifier,
} from "./regularExpressions";

const testExpressionInput: IExpressionInput[] = [
  {
    re: /test_[0-9]+/gm,
    name: "test_with_numbers",
  },
  {
    re: /test_[a-z]+/gm,
    name: "test_with_letters",
  },
];

const testData =
  "\
test_abcdefg\n\
test_123456\n\
test_hijklmnop\n\
test_7891011\n\
test_ $$$$   \n\
";

const testReferenceDataExpressionInput: IExpressionInput[] = [
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
];

const testReferenceData =
  "\
route_f97ad4ff-0f3c-4ecb-88bc-ff2e35135bb2 METRO;Ciudad Azteca - Buenavista\n\
route_cc4722b0-db3b-4732-9e5f-456325d59ffe METRO;Cuatro Caminos - Tasqueña\n\
route_29eac9a5-0133-4f1e-b69e-6eb8046c0c71 METRO;El Rosario - Barranca del Muerto\n\
route_66d0f0b7-da84-4e1a-b37d-7122248ff9f9 METRO;El Rosario - Martín Carrera\n\
route_ad8944a4-f316-466e-9e55-72c0fb36c0b1 METRO;Garibaldi - Constitución de 1917\n\
route_22b69e06-ca4c-4d2c-bd10-8376e65e582d METRO;Indios Verdes - Universidad\n\
route_4ac7ab76-d938-4b27-93a8-f1b678007dfe METRO;Pantitlán - La Paz\n\
route_68a711e1-440d-426c-a6e9-a119d98502d2 METRO;Pantitlán - Observatorio\n\
route_03abae1a-7662-4a67-92a5-6a9649749fee METRO;Pantitlán - Tacubaya\n\
route_44f46f7a-0da7-4bbc-ae28-747d92643385 METRO;Politécnico - Pantitlán\n\
";

describe("When ExpressionParser is used on simple data", () => {
  it("Should be provided a List of regexs to use as well as common names and data", () => {
    const exParse = new ExpressionParser(testExpressionInput, testData);
    exParse.run();
    expect(exParse.results.get("test_with_letters")).toEqual([
      "test_abcdefg",
      "test_hijklmnop",
    ]);
    expect(exParse.results.get("test_with_numbers")).toEqual([
      "test_123456",
      "test_7891011",
    ]);
  });
});

describe("When ExpressionParser is used with more complicated data", () => {
  const exParse = new ExpressionParser(
    testReferenceDataExpressionInput,
    testReferenceData
  );
  exParse.run();
  expect(exParse.results.get("routeName")).toEqual([
    "Ciudad Azteca - Buenavista",
    "Cuatro Caminos - Tasqueña",
    "El Rosario - Barranca del Muerto",
    "El Rosario - Martín Carrera",
    "Garibaldi - Constitución de 1917",
    "Indios Verdes - Universidad",
    "Pantitlán - La Paz",
    "Pantitlán - Observatorio",
    "Pantitlán - Tacubaya",
    "Politécnico - Pantitlán",
  ]);
});
