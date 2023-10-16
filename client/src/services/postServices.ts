import axios from "axios";
import { Account } from "@txnlab/use-wallet";
import { config } from "../config";
import { UserInterface } from "../interfaces/user-interface";
import { useOutletContext } from "react-router-dom";

export class postServices {
  public async createPost(postContent: string, userData: UserInterface) {
    try {
      const response = await axios.post(
        `${config.url}/posts/create`,
        {
          text_content: postContent,
          media: "",
          creator_id: userData.id,
          creation_date: new Date(),
        },
        {
          withCredentials: true, // Enable sending cookies with the request
        }
      );
    } catch (error) {
      console.error("createPost error", error);
    }
  }
}
