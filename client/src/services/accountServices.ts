import axios from "axios";

export class accountServices {
  public async getAccount(walletAddress: string | null | undefined) {
    const response = await axios.get(
      `http://localhost:8000/accounts/${walletAddress}`
    );

    const { data } = response;

    return data;
  }
}
