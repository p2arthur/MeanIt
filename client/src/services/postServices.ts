import axios from "axios";
import { Account } from "@txnlab/use-wallet";
import { config } from "../config";
import { UserInterface } from "../interfaces/user-interface";

export class postServices {
  public async createPost(activeAccount: UserInterface, postContent: string) {
    console.log("createPost activeAccount", activeAccount);

    const axiosConfig = {
      withCredentials: true, // This includes cookies in the request
    };

    try {
      const response = await axios.post(
        `${config.url}/posts/create`,
        {
          userWalletAddress: activeAccount.walletAddress,
          postContent,
        },
        {
          withCredentials: true, // Enable sending cookies with the request
        }
      );

      console.log("createPost response", response);
    } catch (error) {
      console.error("createPost error", error);
    }
  }
}
