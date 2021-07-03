# deploy to ipfs and ipns
```
✗ yarn ipfs:deploy
yarn run v1.22.10
$ node scripts/ipfs.js
🛰  Sending to IPFS...
# deploy to ipfs and ipns
📡 App deployed to IPFS with hash: QmZcoSEx2wzUi7fPnmsRPp6Ktk7mFwv1FC8iiDoqoE9c5U

✍️  Publishing /ipfs/QmZcoSEx2wzUi7fPnmsRPp6Ktk7mFwv1FC8iiDoqoE9c5U to IPNS...
🔖 App published to IPNS with name: k51qzi5uqu5djaaeue73nfojpvksbaqewifekpynvlzprdb00ebmys469y9dyi

🚀 Deployment to IPFS complete!

Use the links below to access your app:
   IPFS: https://ipfs.io/ipfs/QmZcoSEx2wzUi7fPnmsRPp6Ktk7mFwv1FC8iiDoqoE9c5U
   IPNS: https://ipfs.io/ipns/k51qzi5uqu5djaaeue73nfojpvksbaqewifekpynvlzprdb00ebmys469y9dyi

Each new deployment will have a unique IPFS hash while the IPNS name will always point at the most recent deployment.
It is recommended that you share the IPNS link so that people always see the newest version of your app.

✨  Done in 56.70s.
➜  20210220-react-typescript-parcel-bsc-gitcoin-hackathon git:(main) ✗ yarn start
yarn run v1.22.10
$ parcel src/index.html
Server running at http://localhost:1234
✨  Built in 1.29s.
```

# Create SPA: React + Typescript + Parcel

Example project how to create a Single Page Application with React, Typescript and Parcel.

**You can find an step by step description how I created this project skeleton at: https://carlosvin.github.io/posts/react-typescript-parcel**

# Quick start

## Development server

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
cd react-typescript-parcel-template
yarn install
yarn start
```
Last `yarn start` command will:
- start a development server at http://localhost:1234 with [hot module replacement](https://en.parceljs.org/hmr.html)
- build automatically development javascript files with source maps

Basically each time you save a file, you will see automatically the result at http://localhost:1234 without refreshing the page.

## Build production bundle

```bash
yarn build
```
[Parcel's default optimizations](https://en.parceljs.org/production.html#optimisations) will be applied to generated files.

Files are saved at `dist` folder.
Inside `dist` folder there is also a file with information about bundle content sizes: `dist/report.html`.

# Step by step project creation
You can find this section at: https://carlosvin.github.io/posts/react-typescript-parcel.
