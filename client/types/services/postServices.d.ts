import { Account } from "@txnlab/use-wallet";
export declare class postServices {
    createPost(activeAccount: Account, postContent: string): Promise<void>;
}
