import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";
import { config } from "../config";
export class accountServices {
  public async getAccount(walletAddress: string | null | undefined) {
    const response = await axios.get(`${config.url}accounts/${walletAddress}`);

    const { data } = response;

    return data;
  }

  public async createAccount(activeAccount: UserInterface) {
    const { userWalletAddress } = activeAccount;

    try {
      const response = await axios.post(`${config.url}/accounts/create`, {
        userWalletAddress: userWalletAddress,
        isPremium: false,
      });
      console.log("CreateAccount axios response:", response);

      if (response.data) {
        const { data } = response;
        return data;
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }
}
