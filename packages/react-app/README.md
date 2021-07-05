# deploy to ipfs and ipns
```
➜  react-app git:(main) ✗ yarn build
yarn run v1.22.10
$ parcel build src/index.html
✨  Built in 3.26s.

dist/src.7bcfba0b.js.map      ⚠️  7.4 MB    491ms
dist/src.7bcfba0b.js         ⚠️  2.72 MB    2.66s
dist/src.8305316c.css.map       1.94 KB      1ms
dist/src.8305316c.css             854 B     13ms
dist/index.html                   187 B     14ms
Bundle breakdown saved in report: /Users/mingderwang/src/20210702-superxerox/packages/react-app/dist/report.html
✨  Done in 5.52s.
➜  react-app git:(main) ✗ yarn ipfs:deploy
yarn run v1.22.10
$ node scripts/ipfs.js
🛰  Sending to IPFS...
📡 App deployed to IPFS with hash: QmTHMcK4kFVKexrt59vdiEzKBx4cSRTWzDaQjLGdGNEHb7

✍️  Publishing /ipfs/QmTHMcK4kFVKexrt59vdiEzKBx4cSRTWzDaQjLGdGNEHb7 to IPNS...
🔖 App published to IPNS with name: k51qzi5uqu5djaaeue73nfojpvksbaqewifekpynvlzprdb00ebmys469y9dyi

🚀 Deployment to IPFS complete!

Use the links below to access your app:
   IPFS: https://ipfs.io/ipfs/QmTHMcK4kFVKexrt59vdiEzKBx4cSRTWzDaQjLGdGNEHb7
   IPNS: https://ipfs.io/ipns/k51qzi5uqu5djaaeue73nfojpvksbaqewifekpynvlzprdb00ebmys469y9dyi

Each new deployment will have a unique IPFS hash while the IPNS name will always point at the most recent deployment.
It is recommended that you share the IPNS link so that people always see the newest version of your app.

✨  Done in 45.56s.
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
