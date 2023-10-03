import * as cdk from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

const app = new cdk.App();

const dataStack = new DataStack(app, "MeanitDataStack");

const lambdaStack = new LambdaStack(app, "MeanitLambdaStack", {
  postsTable: dataStack.postsTable,
});

const apiStack = new ApiStack(app, "MeanitApiStack", {
  postsLambdaIntegration: lambdaStack.postsLambdaIntegration,
});

new UiDeploymentStack(app, "MeanitUiStack");
