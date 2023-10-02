import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackPropsInterface extends StackProps {
  postsLambdaIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackPropsInterface) {
    super(scope, id, props);

    const api = new RestApi(this, "PostsApi");

    const postsResource = api.root.addResource("posts");

    postsResource.addMethod("GET", props.postsLambdaIntegration);
  }
}
