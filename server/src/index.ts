import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { createRandomId } from "./shared/utils";
const app = express();

const port = 8000;

const usersPath = "data/users.json";
const postsPath = "data/posts.json";

app.use(express.json());
app.use(cors());

const readDataFromJson = async (path: string): Promise<string> => {
  const data = await fs.readFile(path, "utf-8");
  return data;
};

//----------------------------------------------------------------------------

app.post("/accounts/create", async (req, res) => {
  try {
    const { userWalletAddress, isPremium } = req.body;

    const data = await readDataFromJson(usersPath);

    const jsonData = JSON.parse(data);

    const existingAccount = jsonData.find(
      (userAccount: { userWalletAddress: string }) =>
        userAccount.userWalletAddress === userWalletAddress
    );

    if (!existingAccount) {
      const newAccount = { userWalletAddress, isPremium };

      jsonData.push(newAccount);

      await fs.writeFile(usersPath, JSON.stringify(jsonData));
      res.status(201).json({ message: "Account added succesfully" });
    }
    res.status(200).json(existingAccount);
  } catch (error) {
    res.status(500);
  }
});

app.get("/accounts", async (req, res) => {
  const data = await readDataFromJson(usersPath);

  res.send(data);
});

app.get("/accounts/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;

  console.log("walletAddress:", walletAddress);

  const data = JSON.parse(await readDataFromJson(usersPath));

  console.log("data", data);

  const user = data.find(
    (account) => account.userWalletAddress === walletAddress
  );

  console.log(user);

  res.send(user);
});

//----------------------------------------------------------------------------

app.post("/posts/create", async (req, res) => {
  try {
    const { userWalletAddress, postContent } = req.body;

    const data = await readDataFromJson(postsPath);

    const jsonData = JSON.parse(data);

    const newPost = {
      creationDate: Date.now(),
      postId: createRandomId(),
      creator: userWalletAddress,
      content: postContent,
      interactions: { likes: 0, comments: [], donations: 0 },
    };

    jsonData.push(newPost);

    await fs.writeFile(postsPath, JSON.stringify(jsonData));
    res.status(200).json({ message: "postAdded successfully" });
  } catch (error) {}
});

app.get("/posts", async (req, res) => {
  const data = await readDataFromJson(postsPath);

  res.send(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
