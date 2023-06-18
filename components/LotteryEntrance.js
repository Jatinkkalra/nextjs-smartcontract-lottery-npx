// Objective:
// 1. Have a function to call(enter) the lottery

import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants"; // specifying folder instead of files as index.js represents the whole folder. Other way: `import abi from "../constants/abi.json"`
import { useMoralis } from "react-moralis"; // hook
import { useEffect, useState } from "react"; // core hooks
import { ethers } from "ethers";
import { useNotification } from "@web3uikit/core"; // hook

export default function LotteryEntrance() {
  // For `enterLottery` function
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); // by default the chainId returns a Hex version. Renaming here for clarity
  console.log(parseInt(chainIdHex));
  const chainId = parseInt(chainIdHex);

  const lotteryAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null; // Specifying the chainId along with the contractAddress

  // For `getEntranceFee`, `getNumberOfPlayers` and `getRecentWinner" functions || State Hook (useState) which re-renders the state
  const [entranceFee, setEntranceFee] = useState("0"); //entranceFee starts with 0 and setEntranceFee updates the fee
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  // Notification hook (1/2)
  const dispatch = useNotification(); // dispatch will give us a pop-up now

  // Creating and hooking `enterLottery` function from backend, ie, hardhat-smartcontract-lottery
  const {
    runContractFunction: enterLottery,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // networkId / chainId will change at 0 with frontend change (likely)
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee, // enterLottery() doesn't take any paramaters, rather it only takes msg.value as input
  }); // Syntax: https://github.com/MoralisWeb3/react-moralis#useweb3contract

  // Creating and hooking `getEntranceFee` function from backend, ie, hardhat-smartcontract-lottery
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // networkId / chainId will change at 0 with frontend change (likely)
    functionName: "getEntranceFee",
    params: {},
  });

  // Creating and hooking `getNumberOfPlayers` function from backend, ie, hardhat-smartcontract-lottery
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // networkId / chainId will change at 0 with frontend change (likely)
    functionName: "getNumberOfPlayers",
    params: {},
  });

  // Creating and hooking `getRecentWinner` function from backend, ie, hardhat-smartcontract-lottery
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // networkId / chainId will change at 0 with frontend change (likely)
    functionName: "getRecentWinner",
    params: {},
  });

  // fetching data and updating it
  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getPlayersNumber()).toString();
    const recentWinnerFromCall = await getRecentWinner();
    setEntranceFee(entranceFeeFromCall);
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]); //starts as false, then checks the local storage and turns isWebEnabled true

  // Notification hook (1/2)
  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI(); // this part updates/re-renders the "Number of Players" data on frotend with each new entry (without a need of refresh)
  };

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div className="p-5">
      Hi from Lottery Entrance!
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
        onClick={async function () {
          await enterLottery({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error), // add these two params on each run contract function so that we know about error
          });
        }}
        disabled={isLoading || isFetching} // Unability to click button when there is a signing pop-up already
      >
        {isLoading || isFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full">
            {" "}
          </div>
        ) : (
          <div> Enter Lottery </div>
        )}
      </button>
      {entranceFee}
      <div>
        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
      </div>
      {lotteryAddress ? (
        <div>
          <div>Number Of Players: {numPlayers}</div>
          <div>Recent Winner: {recentWinner}</div>
        </div>
      ) : (
        <div>No Lottery Address Detected</div>
      )}
    </div>
  );
}
