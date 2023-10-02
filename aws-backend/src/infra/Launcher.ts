import * as cdk from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new cdk.App();

const dataStack = new DataStack(app, "MeanitDataStack");

const lambdaStack = new LambdaStack(app, "MeanitLambdaStack", {
  postsTable: dataStack.postsTable,
});

const apiStack = new ApiStack(app, "MeanitApiStack", {
  postsLambdaIntegration: lambdaStack.postsLambda,
});
