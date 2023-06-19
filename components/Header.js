// Easy Way
import { ConnectButton } from "@web3uikit/web3";
import { useWeb3Contract } from "react-moralis";

export default function Header() {
  // `export default` gives other applications the ability to use this component. Importedd in "index.js" page.
  return (
    <div className="p-5 border-b-2 flex flex-row">
      <h1 className="py-4 px-4 font-blog text-3xl"> Decentralized Lottery</h1>
      <div className="ml-auto py-2 px-4 right: 150px">
        <ConnectButton moralisAuth={false} />
      </div>
      {/* moralisAuth={false} as we are not trying to connect to server*/}
    </div>
  );
}
