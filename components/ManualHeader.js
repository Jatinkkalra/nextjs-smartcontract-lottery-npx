// Hard Way (Manual Header)

import { useMoralis } from "react-moralis"; // Hook
import { useEffect } from "react"; // A core react Hook

export default function ManualHeader() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
    useMoralis(); // account- checking if we are connected to an account

    // Stays connected even after refresh
  useEffect(() => {
    if (isWeb3Enabled) return; // if true then don't do anything
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  // No constant metamask pop-up after disconnecting and refreshing (Working without this too though)
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
          {" "}
          Connected to {account.slice(0, 6)}....
          {account.slice(account.length - 4)}{" "}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined")
              window.localStorage.setItem("connected", "injected"); // storing the connection in browser's local storage (to not have constant metamask pop-ups for connection)
          }}
          // Making connect button un-clickable once metamask is popped-up
          disabled={isWeb3EnableLoading}
        >
          
          Connect
        </button>
      )}
    </div>
  );
}


