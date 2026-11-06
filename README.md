# MeanIt

An Algorand social-app monorepo combining a React client, server code, and AWS CDK infrastructure experiments.

The repository captures an earlier stage of the social-product work that later appears in WeCoop. Client, server, and cloud infrastructure have separate setup paths; a frontend start alone does not provision the backend or AWS resources.

## Start reading

- [`client/`](client/)
- [`server/`](server/)

## Development

Use Node.js and npm compatible with the versions recorded in the package manifest and lockfile. Each package is installed from its own directory.

Start this package from the repository root:

```sh
cd client
npm ci
npm run dev
```

Additional scripts in this package: `npm run build`.

From the repository root:

```sh
npm ci
npm run start:dev
```

Start this package from the repository root:

```sh
cd server
npm ci
npm run start:dev
```

Additional scripts in this package: `npm run build`, `npm test`.

The commands above start individual packages. Full-stack and microfrontend projects need their dependent services or remotes running as well.
