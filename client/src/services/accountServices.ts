import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";
import { config } from "../config";
export class accountServices {
  public async getAccount(walletAddress: string) {
    console.log("Getting account");
    const response = await axios.get(`${config.url}/auth/${walletAddress}`);
    console.log(response);

    const { data } = response;

    if (walletAddress && !data) {
      console.log("Creating account");
      const { data } = await this.createAccount(walletAddress);
      console.log("New user created:", data);
    }
    return data;
  }

  private async createAccount(walletAddress: string) {
    const requestData = { walletAddress };

    const response = await axios.post(
      `${config.url}/auth/signup`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = response;
    return data;
  }
}
