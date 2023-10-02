import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackPropsInterface extends StackProps {
  postsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly postsLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackPropsInterface) {
    super(scope, id, props);

    const postsLambda = new NodejsFunction(this, "PostsLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "posts", "handler.ts"),
    });
    this.postsLambdaIntegration = new LambdaIntegration(postsLambda);
  }
}
