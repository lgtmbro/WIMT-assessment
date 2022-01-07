export interface IExpressionInput {
  re: RegExp;
  name: String;
}

interface IExpressionParser {
  expressions: Array<IExpressionInput>;
  data: String;
  results: Map<String, String[]>;
  run(): Map<String, String[]>;
}

export class ExpressionParser implements IExpressionParser {
  expressions: IExpressionInput[];
  data: String;
  results: Map<String, String[]> = new Map<String, String[]>();

  constructor(expressions: IExpressionInput[], data: String) {
    this.expressions = expressions;
    this.data = data;
  }

  run(): Map<String, String[]> {
    for (const line of this.data.split("\n")) {
      for (const exp of this.expressions) {
        const res = exp.re.exec(line);
        if (res) {
          if (!this.results.get(exp.name)) {
            this.results.set(exp.name, []);
          }
          this.results.get(exp.name)?.push(res[0]);
        }
      }
    }

    return this.results;
  }
}
