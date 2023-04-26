import React, { useState } from "react";
import Web3 from "web3";
import styles from "./styles.module.css";

function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null); // Define the setResult function
  const [status, setStatus] = useState(null); // Define the setResult function
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [blocknumber, setBlocknumber] = useState(null);
  const [gas, setGas] = useState(null);

  function handleButtonClick() {
    console.log("Button clicked!");
    const gifs = ["loading_blocks.gif", "loading_blocks.gif"];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setGif(randomGif);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Set loading state to true
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
      const timestamp =
        result && (await web3.eth.getBlock(result.blockNumber)).timestamp;
      setResult(result);
      if (result) {
        setFrom(result.from);
        setTo(result.to);
        setBlocknumber(result.blockNumber);
        setGas(result.gasUsed);
      }

      // Update the front end with the result status
      setStatus(`Message sent successfuly!`); // Use the setResult function
    } catch (error) {
      console.error(error);
      // Update the front end with the error message
      setStatus(`Message sending failed: ${error.message}`); // Use the setResult function
    } finally {
      setLoading(false); // Set loading state back to false
    }
  }

  return (
    <form
      className={styles.formSend}
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
        <p htmlFor="recipient" style={{ marginTop: "10px" }}>
          Enter recipient address:
        </p>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={styles.inputText}
          placeholder="To: 0x..."
          style={{ width: "100%", backgroundColor: "#282c33ff" }}
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
          style={{
            width: "100%",
            minHeight: "90px",
            backgroundColor: "#282c33ff",
          }}
          placeholder="..."
        />
      </div>
      <button
        type="submit"
        className={`${styles.submitButton} ${loading ? styles.loading : ""}`}
        disabled={loading}
        onClick={handleButtonClick}
        style={{
          color: "#00ffff",
          fontSize: "1.4em",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {loading ? (
          <div className={styles.loadingContainer}>
            <img src={`/${gif}`} alt="In progress" />
          </div>
        ) : (
          "SEND MESSAGE"
        )}
      </button>
      {status && (
        <div
          style={{
            fontSize: "1em",
            fontFamily: "monospace",
            textAlign: "start",
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "15px",
            border: "3px solid rgba(10, 202, 166, 0.9)",
            backgroundColor: "rgba(40, 44, 51, 0.5)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "1.1em",
                fontWeight: "bold",
                textAlign: "center",
                padding: "12px 0px",

                color: "#ffd700ff",
              }}
            >
              {status}
            </p>

            <ul
              style={{
                marginTop: "12px",
                listStyleType: "none",
                wordBreak: "break-all",
              }}
            >
              <li
                style={{
                  marginTop: "6px",
                  fontWeight: "bold",
                }}
              >
                From:
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {from}
              </li>
              <li
                style={{
                  marginTop: "6px",
                  fontWeight: "bold",
                }}
              >
                To:
              </li>
              <li>{to}</li>
              <li
                style={{
                  marginTop: "6px",
                  fontWeight: "bold",
                }}
              >
                Block number:
              </li>
              <li>{blocknumber}</li>

              <li
                style={{
                  marginTop: "6px",
                  fontWeight: "bold",
                }}
              >
                Gas spent:
              </li>
              <li>{gas}</li>
            </ul>
          </div>
        </div>
      )}
    </form>
  );
}

export default SendMessage;
