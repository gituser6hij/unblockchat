import React, { useState } from "react";
import Web3 from "web3";
import styles from "@/styles/Home.module.css";

function SwitchNetwork({ setAddress3 }) {
  const [chainId, setChainId] = useState("0x13881"); // default to Ethereum mainnet

  async function handleSwitch() {
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
    <div className="wrapper">
      <div>
        <select
          value={chainId}
          onChange={handleNetworkChange}
          style={{
            padding: "10px 5px",
            marginRight: "5px",
            // backgroundColor: "#282c33",
            borderRadius: "15px",
            border: "3px solid #0acaa6",
            fontFamily: "monospace",
            fontSize: "1.1em",
            marginTop: "0",
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
          onClick={handleSwitch}
          style={{
            backgroundColor: "#282c33",
            color: "#00ffff",
            fontFamily: "monospace",
            fontSize: "1.1em",
            fontWeight: "bold",
            borderRadius: "15px",
            padding: "10px 5px",
            border: "3px solid #0acaa6",
            marginTop: "10px",
          }}
        >
          Switch Network
        </button>
      </div>{" "}
    </div>
  );
}

export default SwitchNetwork;
