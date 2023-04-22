import React, { useState } from "react";
import Web3 from "web3";
import styles from "@/styles/Home.module.css";

function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const sender = accounts[0];
    const tx = {
      from: sender,
      to: recipient,
      value: web3.utils.toWei("0", "ether"), // Set the value to 0
      data: web3.utils.asciiToHex(message),
    };
    try {
      const result = await web3.eth.sendTransaction(tx);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     marginTop: "10px",
    //     width: "100%",
    //   }}
    // >

    // </div>

    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
        flexDirection: "column",
        marginTop: "0px",
        padding: "0 0",
        // height: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "1em",
          fontFamily: "monospace",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          width: "100%",
          marginTop: "0px",
          padding: "0",
        }}
      >
        <p htmlFor="recipient" style={{ marginTop: "15px" }}>
          Enter recipient address:
        </p>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={styles.inputText}
          placeholder="To: 0x..."
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "1em",
          fontFamily: "monospace",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p htmlFor="message" style={{ marginTop: "10px" }}>
          Enter your message:
        </p>
        <textarea
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputText}
          style={{ width: "100%", minHeight: "90px" }}
          placeholder="..."
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        style={{
          color: "#00ffff",
          // fontFamily: "monospace",
          fontSize: "1.4em",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        SEND MESSAGE
      </button>
    </form>
  );
}

export default SendMessage;
