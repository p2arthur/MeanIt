import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";

export class accountServices {
  public async getAccount(walletAddress: string | null | undefined) {
    const response = await axios.get(
      `http://localhost:8000/accounts/${walletAddress}`
    );

    const { data } = response;

    return data;
  }

  public async createAccount(activeAccount: UserInterface) {
    const { userWalletAddress } = activeAccount;

    try {
      const response = await axios.post(
        "http://localhost:8000/accounts/create",
        {
          userWalletAddress: userWalletAddress,
          isPremium: false,
        }
      );
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
