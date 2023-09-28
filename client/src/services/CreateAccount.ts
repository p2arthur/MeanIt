import { Account } from "@txnlab/use-wallet";
import axios from "axios";

const createAccount = async (activeAccount: Account) => {
  const { address } = activeAccount;

  try {
    const response = await axios.post("http://localhost:8000/accounts/create", {
      userWalletAddress: address,
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
};

export default createAccount;
