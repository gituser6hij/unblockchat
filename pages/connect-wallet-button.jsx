import React, { useState } from "react";
import styles from "./styles.module.css";

import Web3 from "web3";

function ConnectWalletButton({ setAddress3 }) {
  const [chainId, setChainId] = useState("0x13881"); // default to Ethereum mainnet

  async function handleClick() {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not installed or enabled");
      }

      const provider = window.ethereum;
      await provider.request({ method: "eth_requestAccounts" });

      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();

      if (networkId.toString() !== chainId) {
        // Switch network if not already connected to the selected network
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
      }

      const accounts = await web3.eth.getAccounts();
      setAddress3(accounts[0]);
    } catch (error) {
      console.error(error);
      alert(
        "Please install and connect to an Ethereum wallet that supports the Ethereum Provider API."
      );
    }
  }

  function handleNetworkChange(event) {
    setChainId(event.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
        flexDirection: "row",
        marginTop: "0px",
        padding: "0 0",
        height: "50px",
      }}
    >
      <select
        className={styles.networkSelect}
        value={chainId}
        onChange={handleNetworkChange}
        style={{
          padding: "12px 4px",
          marginRight: "30px",
          // backgroundColor: "#282c33",
          borderRadius: "15px",
          border: "3px solid #0acaa6",
          // fontFamily: "monospace",
          fontSize: "1em",
          marginTop: "0",
          // maxWidth: "60%",
        }}
      >
        <option value="0x1">Ethereum</option>
        <option value="0x5">Eth Goerli</option>
        <option value="0xaa36a7">Eth Sepolia</option>
        <option value="0x38">Bsc</option>
        <option value="0x61">Bsc testnet</option>
        <option value="0x89">Polygon</option>
        <option value="0x13881">Polygon mumbai</option>
        <option value="0x44d">Polygon zkEVM</option>
        <option value="0xa">Optimism</option>
        <option value="0x1a4">Optimism Goerli</option>
        <option value="0xA4B1">Arbitrum</option>
        <option value="0x66eed">Arbitrum Goerli</option>
      </select>
      <button
        onClick={handleClick}
        className={styles.connectButton}
        style={{
          color: "#00ffff",
          // fontFamily: "monospace",
          fontSize: "1em",
          fontWeight: "bold",
          borderRadius: "15px",
          padding: "12px 4px",
          border: "3px solid #0acaa6",
          marginTop: "0",
          // maxWidth: "30%",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWalletButton;
