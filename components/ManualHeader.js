// Hard Way (Manual Header)

import { useMoralis } from "react-moralis"; // Hook
import { useEffect } from "react"; // A core react Hook  // Stays connected even after refresh

export default function ManualHeader() {
  const {
    enableWeb3, // called to enable the web3 provider and prompts to connect to the user's Ethereum wallet
    account, // a variable that holds the current Ethereum account address of the connected wallet. account updates when the web3 provider is enabled and connected.
    isWeb3Enabled, // a boolean variable that indicates whether the web3 provider is currently enabled and connected
    Moralis, // the Moralis SDK object that provides various functions and utilities for interacting with the Moralis backend and Ethereum blockchain
    deactivateWeb3, // a function that can be called to programmatically disable and disconnect the web3 provider.
    isWeb3EnableLoading, // a boolean variable that will be true during the loading state when the provider is being initialized and connected, and false otherwise.
  } = useMoralis();

  // Stays connected even after refresh
  useEffect(() => {
    if (isWeb3Enabled) return; // if true then don't do anything
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      } // This `if` statement helps in staying connected even after refresh, as long as there is `connected` key item in local storage. Otherwise enableWeb3() will run even after disconnection [aka metamask popup].
    }
  }, [isWeb3Enabled]);

  // Removing the "connected" key item from localstorage once disconnected; To not enableWeb3() on each reload after disconnection [aka metamask popup].
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}....
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            } // storing the connection in browser's local storage (for useEffect() above)
          }}
          disabled={isWeb3EnableLoading} // Making connect button un-clickable once metamask is popped-up
        >
          Connect
        </button>
      )}
      {/* ternary operator: condition ? expression1 : expression2 */}
    </div>
  );
}
