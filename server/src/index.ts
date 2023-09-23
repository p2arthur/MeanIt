import express from "express";
import fs from "fs/promises";
import cors from "cors";

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

app.post("/accounts/add-account", async (req, res) => {
  try {
    const { userWalletAddress } = req.body;

    const data = await readDataFromJson(usersPath);

    const jsonData = JSON.parse(data);

    const existingAccount = jsonData.find(
      (userAccount: { userWalletAddress: string }) =>
        userAccount.userWalletAddress === userWalletAddress
    );

    if (!existingAccount) {
      const newAccount = { userWalletAddress };

      jsonData.push(newAccount);

      await fs.writeFile(usersPath, JSON.stringify(jsonData));
      res.status(200).json({ message: "Account added succesfully" });
    }

    res.status(400).json({ message: "Account already exists" });
  } catch (error) {
    res.status(500);
  }
});

app.get("/accounts", async (req, res) => {
  const data = await readDataFromJson(usersPath);

  res.send(data);
});

//----------------------------------------------------------------------------

app.post("/posts/add-post", async (req, res) => {
  try {
    const { postId, creator, content, interactions, donations } = req.body;

    const data = await readDataFromJson(postsPath);

    const jsonData = JSON.parse(data);

    const newPost = { postId, creator, content, interactions, donations };

    jsonData.push(newPost);

    await fs.writeFile(usersPath, JSON.stringify(jsonData));
    res.status(200).json({ message: "Account added succesfully" });
  } catch (error) {}
});

app.get("/posts", async (req, res) => {
  const data = await readDataFromJson(postsPath);

  res.send(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
