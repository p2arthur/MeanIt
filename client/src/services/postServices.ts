import axios from "axios";
import { Account } from "@txnlab/use-wallet";

export class postServices {
  public async createPost(activeAccount: Account, postContent: string) {
    console.log("createPost activeAccount", activeAccount);

    const response = await axios.post("http://localhost:8000/posts/create", {
      userWalletAddress: activeAccount.address,
      postContent,
    });

    console.log("createPost response", response);
  }
}
