import { Account, useWallet } from "@txnlab/use-wallet";
import axios from "axios";

const CreateAccount = async (activeAccount: Account) => {
  console.log("create account activeAccount:", activeAccount);

  const { address } = activeAccount;

  try {
    const response = await axios.post(
      "http://localhost:8000/accounts/add-account",
      {
        userWalletAddress: address,
      }
    );

    console.log("CreateAccount axios response:", response);
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

export default CreateAccount;
