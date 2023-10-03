import { UserInterface } from "../interfaces/user-interface";
export declare class accountServices {
    getAccount(walletAddress: string | null | undefined): Promise<any>;
    createAccount(activeAccount: UserInterface): Promise<any>;
}
