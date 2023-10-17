import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";
import { config } from "../config";

export class communityServices {
  public async createCommunity(creator_address: string) {
    const requestData = { creator_address: creator_address };
    console.log(requestData);

    const response = await axios.post(
      `${config.url}/communities/create`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  }
}
