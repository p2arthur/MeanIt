import axios from "axios";
import { UserInterface } from "../interfaces/user-interface";
import { config } from "../config";
export class accountServices {
  private userData: UserInterface | undefined;

  //----------------------------------------------------------------------------
  public async getAccount(walletAddress: string) {
    const response = await axios.get(`${config.url}/auth/${walletAddress}`);

    this.userData = response.data;

    if (walletAddress && !this.userData) {
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

  public async signinUser(walletAddress: string) {
    const requestData = { wallet_address: walletAddress };
    const innerConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.post(
      `${config.url}/auth/signin`,
      requestData,
      innerConfig
    );
  }

  public async signoutUser() {
    const response = await axios.get(`${config.url}/auth/signout`);
  }

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

    this.userData = response.data;
    return this.userData;
  }
}
