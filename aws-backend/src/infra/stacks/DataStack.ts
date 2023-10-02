import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../../utils/Utils";

export class DataStack extends Stack {
  public readonly postsTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.postsTable = new Table(this, "PostsTable", {
      partitionKey: { name: "postId", type: AttributeType.STRING },
      tableName: `PostsTable-${suffix}`,
    });
  }
}
