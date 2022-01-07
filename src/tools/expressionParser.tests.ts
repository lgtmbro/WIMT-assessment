import { ExpressionParser, IExpressionInput } from "./expressionParser";

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
