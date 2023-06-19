# Next-js Smart Contract Lottery [Hardhat - Frontend]

## Table Of Content

- [Overview](#overview)
  - [Components Folder](#components-folder)
    - [ManualHeader.js](#manualheaderjs)
    - [Header.js](#headerjs)
  - [Extensions](#extensions)
  - [Console Setup Commands](#console-setup-commands)
  - [Create Folders and Files](#create-folders-and-files)
  - [Uploading code on browser via IPFS:](#uploading-code-on-browser-via-ipfs)
- [Notes](#notes)
  - [Error Handling](#error-handling)
    - [Solution:](#solution)
- [References](#references)

# Overview

A full-stack demo of a Lottery smart contract.
Switch to a local chain and try it out here: https://orange-heart-2461.on.fleek.co/

## Components Folder

### ManualHeader.js

Manual Way to write the Header, Connect Button.

- `yarn run dev` to run the frontend code on web localhost.
- useMoralis and useEffect hooks are used, along with HTML.

### Header.js

Easy way to write the Header, Connect Button. We also connect it to Lottery Contract.

- Install web3uikit: `yarn add web3uikit`
- cd to \hardhat-smartcontract-lottery in console, and run the node: `yarn hardhat node`
- Create "constants" folder and files underneath. Add `{}` to each .json file. // The content inside will be updated by the backend file.
- Use `yarn hardhat node` in backend file to update "abi.json" &
  "contractAddresses.json" file in the frontend.
- Follow https://tailwindcss.com/docs/guides/nextjs for Installing Tailwind:
  - `yarn add --dev tailwindcss postcss autoprefixer` // creates "./styles" folder
  - ` yarn tailwindcss init -p` // creates "./postcss.config.js" and "./tailwind.config.js" files
  - Install Tailwind Extensions in VSCode: [Extensions](#extensions)
  - `yarn run dev`
  - **Note**: For CSS to take effect: Kill the frontend and run `yarn run dev` again

# Setup

Below is a quick summary of the steps I used to write this repo. Mainly for personal reference only.

## Extensions

- For Tailwind: https://marketplace.visualstudio.com/items?itemName=csstools.postcss
- For Tailwind: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

## Console Setup Commands

```js
`yarn create next-app .` // Imports and Creates nexts folders on same workspace with boilerplates
`npx create-next-app@12.1.5` // We used this to create the version used in video
`yarn run dev` // This runs the code on local server, aka localhost. Can also run `yarn dev` (check scripts under "package.json")
`yarn add --dev prettier` //
`yarn add moralis react-moralis` // A Front-end Library
`yarn add web3uikit` //
`yarn add moralis-v1` //
`yarn global add next` //
`yarn add --dev tailwindcss postcss autoprefixer` // Source: https://tailwindcss.com/docs/guides/nextjs
`yarn tailwindcss init -p` //
`yarn build` //
`yarn next export`;
```

## Create Folders and Files

- ".prettierrc"
- ".prettierignore"
- "components" folder // React components are self-contained modules that can be reused throughout an application to create UI elements
  - "ManualHeader.js" file
  - "Header.js" file
  - "LotteryEntrance.js"
- "constants" folder

  - "abi.json" file
  - "contractAddresses.json" files
  - "index.js" file // To export "abi.json" and "contractAddresses.json" directly to LotteryEntrance.js

- Go back to "hardhat-smartcontract-lottery" workspace and create:
  - "99-update-front-end.js" file under "deploy" folder

> _**Note**: Rest folders/files will be automatically created by the dependencies._

## Uploading front-end code on browser via IPFS:

- Download:
  - IPFS Desktop app
  - IPFS browser extension
- Upload:
  - "out" folder on IPFS desktop. // Created after using `yarn build` & `yarn next export`

> Then try the CID on browser with "ipfs://**_CID_**"

## Uploading front-end code on browser via Fleek:

- Connect fleek to Github, and select the frontend repo.
- Basic Build Settings
  - "Docker Image Name" text box imput:  `node:lts`
  - "Build Command" text box input: `yarn && yarn run build && yarn next export`


# Notes

- `imports` work with front-ends, `require` does not.
- **"./index.js"** (under "./pages" folder) is the default homepage of our website.
- **"./\_app.js"** wraps all other pages. You can think of it as the whole appilcation or whole frontend.
- Use `{ Example }` to write javascript code inside html code blocks.
- **React components** are self-contained modules that can be reused throughout an application to create UI elements.
- **Hooks** helps in re-rendering of websites and make it more responsive to each Web3 action. It's a way to keep track of state in our application.
- **Components Library**: Web3UiKit; Formatting Library: Tailwind CSS
- ![ManualHeader.js -> `UseMoralis()` variables](./img/image.png)
- **useEffect(() => {}, [])**; // ie, useEffect(() => {function}, [optional dependency constantly checked])
  - No dependancy array: If you don't use dependency here then hook will run anytime something re-renders. Careful with this as it could lead to circular renders.
  - Blank dependancy array: runs once on load
- Using **constants folder** to modularize deployable chains and make the contract network agnostic, instead of hardcoding the network
- **ABI** always remain the same, no matter which network we are on.
- Here's an explanation of how the `entranceFee` is fetched and updated in "../components/LotteryEntrance.js":

  1. The `entranceFee` state is initialized using the `useState` hook with an initial value of `"0"`.
  2. The `getEntranceFee` function is created using the `useWeb3Contract` hook. This function is responsible for fetching the entrance fee from the smart contract by calling the `getEntranceFee` function defined in the contract's ABI.
  3. The `updateUI` function is defined to asynchronously fetch the entrance fee from the smart contract and update the `entranceFee` state with the fetched value.
  4. In the `useEffect` hook, whenever the `isWeb3Enabled` value changes (i.e., when the web3 provider is enabled and connected), the `updateUI` function is called to fetch and update the `entranceFee` value. This ensures that the `entranceFee` is fetched and updated when the web3 provider becomes enabled.
  5. The fetched `entranceFee` value is converted to a string using `.toString()` and then set using the `setEntranceFee` function, which updates the state and triggers a re-render of the component.
  6. The `entranceFee` value is displayed in the JSX markup as `ethers.utils.formatUnits(entranceFee, "ether")`. This formats the `entranceFee` value from wei to ether using the `ethers.utils.formatUnits` function from the ethers library.

  Overall, the `entranceFee` is fetched and updated by calling the `getEntranceFee` function, updating the state using the `setEntranceFee` function, and displaying the formatted value in the component's JSX markup.

## Error Handling

Error faced when you click on "Enter Lottery" button. Txn gets passed but winner doesn't get selected.

```js
    Error: Transaction reverted: function selector was not recognized and there's no fallback function
      at Lottery.<unrecognized-selector> (contracts/lottery.sol:38)
```

### Solution:

Using second private key of hardhat: https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/302

# References

- useWeb3Contract() function for Header.js: https://github.com/MoralisWeb3/react-moralis#useweb3contract
