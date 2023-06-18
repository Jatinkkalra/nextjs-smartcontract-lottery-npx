// import "../styles/globals.css";
import { MoralisProvider } from "react-moralis"; // wrapping the app with Moralis so that moralis hooks can work
import { NotificationProvider } from "@web3uikit/core"; // Enables to make notifications

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Component {...pageProps}></Component>
      </NotificationProvider>
    </MoralisProvider> // Wrapping in Moralis
  );
}

export default MyApp;
