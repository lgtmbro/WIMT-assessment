import { thisExpression } from "@babel/types";

export interface IExpressionInput {
  re: RegExp;
  name: string;
}

interface IExpressionParser {
  expressions: Array<IExpressionInput>;
  data: string;
  results: Map<string, string[]>;
  run(): Map<string, string[]>;
}

export class ExpressionParser implements IExpressionParser {
  expressions: IExpressionInput[];
  data: string;
  results: Map<string, string[]> = new Map<string, string[]>();

  constructor(expressions: IExpressionInput[], data: string) {
    this.expressions = expressions;
    this.data = data;
  }

  run(): Map<string, string[]> {
    for (const exp of this.expressions) {
      const res = this.data.match(exp.re);
      if (res) {
        if (!this.results.get(exp.name)) {
          this.results.set(exp.name, []);
        }
        this.results.set(
          exp.name,
          this.results.get(exp.name)?.concat(res) || []
        );
      }
    }

    return this.results;
  }
}
