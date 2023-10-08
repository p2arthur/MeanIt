import axios from 'axios';

export class userUtils {
  async getNfd(walletAddress: string) {
    try {
      const { data } = await axios.get(
        `https://api.nf.domains/nfd/v2/address?address=${walletAddress}`,
      );
      return data[walletAddress][0].name;
    } catch (error) {
      return '';
    }
  }
}
