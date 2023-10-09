import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";
import { config } from "../config";
export class accountServices {
  private userData: UserInterface | undefined;

  //----------------------------------------------------------------------------
  public async getAccount(walletAddress: string) {
    console.log("Getting account");
    const response = await axios.get(`${config.url}/auth/${walletAddress}`);

    this.userData = response.data;

    if (walletAddress && !this.userData) {
      console.log("Creating account");
      await this.createAccount(walletAddress);
    }
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
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
    this.userData = response.data;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  public async updateAccount(
    walletAddress: string,
    attributes: Partial<UserInterface>
  ) {
    console.log(
      "Update account address + attributes",
      walletAddress,
      attributes
    );

    const response = await axios.patch(
      `${config.url}/auth/${walletAddress}`,
      attributes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    this.userData = response.data;
    return this.userData;
  }
}
