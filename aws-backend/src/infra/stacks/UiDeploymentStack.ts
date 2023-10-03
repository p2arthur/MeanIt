import { CfnOutput, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../../utils/Utils";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment } from "aws-cdk-lib/aws-s3-deployment";
import { Source } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?) {
    super(scope, id, props);

    const sufix = getSuffixFromStack(this);

    const UiDeploymentBucket = new Bucket(this, "MeanItUiDeploymentBucket", {
      bucketName: `meanit-frontend-${sufix}`,
    });

    const uiDir = join(__dirname, "..", "..", "..", "..", "client", "dist");

    if (!existsSync(uiDir)) {
      console.warn("Ui directory not fount", uiDir);
      return;
    }

    new BucketDeployment(this, "MeanItDeployment", {
      destinationBucket: UiDeploymentBucket,
      sources: [Source.asset(uiDir)],
    });

    const originIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    UiDeploymentBucket.grantRead(originIdentity);

    const distribution = new Distribution(this, "MeanItDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(UiDeploymentBucket, {
          originAccessIdentity: originIdentity,
        }),
      },
    });

    new CfnOutput(this, "MeanItDistributionURL", {
      value: distribution.distributionDomainName,
    });
  }
}
