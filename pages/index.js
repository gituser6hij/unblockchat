import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {
  getTransactions,
  getTransactions2,
  getTransactions3,
  getTransactions4,
  getTransactions5,
  getTransactions6,
  getTransactions7,
  getTransactions8,
  getTransactions9,
  getTransactions10,
  getTransactions11,
  getTransactions12,
} from "../lib/eth";
import styles from "./styles.module.css";
import Head from "next/head";
import React from "react";

import SendMessage from "./send-message";
import ConnectWalletButton from "./connect-wallet-button";
import SwitchNetwork from "./SwitchNetwork.jsx";

export default function Home() {
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [colors, setColors] = useState({});
  const [network, setNetwork] = useState("mainnet");
  const [loading, setLoading] = useState(false); // add loading state
  const [gif, setGif] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [isHelpVisible2, setIsHelpVisible2] = useState(false);
  const [isHelpVisible3, setIsHelpVisible3] = useState(false);
  const [isHelpVisible4, setIsHelpVisible4] = useState(false);
  const [isSendHelpClick1Visible, setIsSendHelpClick1Visible] = useState(true);
  const [isSendHelpClick2Visible, setIsSendHelpClick2Visible] = useState(false);

  const [isSendVisible, setIsSendVisible] = useState(false);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const addressParam = searchParams.get("address");

    const networkParam = searchParams.get("network");

    if (addressParam) {
      setAddress(addressParam);
    }

    if (networkParam) {
      setNetwork(networkParam);
    }
  }, []);

  const handleClick = () => {
    setIsDropdownOpen(false);
    setIsSendVisible(false);
    setIsClicked(true);
  };

  const ToggleInbox = () => {
    setIsDropdownOpen(false);
    setIsSendVisible(false);
    setIsClicked(false);
  };

  const ToggleSend = () => {
    setIsDropdownOpen(false);
    setIsClicked(false);
    setIsSendVisible(true);
  };

  const ToggleSendNetwork = () => {
    setIsSendHelpClick2Visible(!isSendHelpClick2Visible);
  };

  const handleClick2 = () => {
    setIsDropdownOpen(false);
    setIsClicked(true);
  };

  // {isClicked && <div>This will disappear when you click the button</div>}

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const fetchTransactions = async () => {
    try {
      let transactions;
      switch (network) {
        case "mainnet":
          transactions = await getTransactions(address, address2);
          break;
        case "goerli":
          transactions = await getTransactions2(address, address2);
          break;
        case "sepolia":
          transactions = await getTransactions3(address, address2);
          break;
        case "bsc":
          transactions = await getTransactions4(address, address2);
          break;
        case "bsc-testnet":
          transactions = await getTransactions5(address, address2);
          break;
        case "polygon":
          transactions = await getTransactions6(address, address2);
          break;
        case "polygon-testnet":
          transactions = await getTransactions7(address, address2);
          break;
        case "polygon-zkevm":
          transactions = await getTransactions8(address, address2);
          break;
        case "optimistic":
          transactions = await getTransactions9(address, address2);
          break;
        case "optimistic-goerli":
          transactions = await getTransactions10(address, address2);
          break;
        case "arbitrum":
          transactions = await getTransactions11(address, address2);
          break;
        case "arbitrum-goerli":
          transactions = await getTransactions12(address, address2);
          break;
        default:
          throw new Error(`Invalid network: ${network}`);
      }

      const formattedTransactions = transactions.map((transaction) => {
        let timestamp = "Invalid Date";
        if (typeof transaction.inputData === "string") {
          const date = new Date(transaction.timestamp);
          if (!isNaN(date)) {
            timestamp = date.toLocaleString();
          }
        }
        return { ...transaction, timestamp };
      });

      setTransactions(formattedTransactions);
      setColors({});
      window.scrollTo(0, 0); // scroll to top of page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading state to false
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetchTransactions();
    const searchParams = new URLSearchParams();
    searchParams.set("address", address);
    searchParams.set("network", network);
    searchParams.set("address2", address2);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
    const button = document.querySelector(`.${styles.submitButton}`);
    button.classList.remove("loading");
  };

  const handleAddressClick = async (event, sender) => {
    event.preventDefault();
    setAddress(sender);
    setLoading(true);
    await fetchTransactions();
    const searchParams = new URLSearchParams();
    searchParams.set("address", sender);
    searchParams.set("network", network);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  };

  const getColor = (sender) => {
    if (!colors[sender]) {
      const colorsArray = [
        "#282c33", // dark grey
        "#26282B", // raisin black
        "#0A2A45", // midnight blue
        "transparent", // transparent
        "#1E1E1E", // eerie blk3
        "#002928", // midnight green
        "#001515", // rich black
        "#082136", // oxford blue
      ];
      const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
      setColors((prevColors) => ({ ...prevColors, [sender]: color }));
    }

    return colors[sender];
  };

  const handleNetworkChange = (event) => {
    const selectedNetwork = event.target.value;
    setNetwork(selectedNetwork);
    console.log("Selected network:", selectedNetwork);
  };

  function handleButtonClick() {
    console.log("Button clicked!");
    const gifs = ["loading_blocks.gif", "loading_blocks.gif"];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setGif(randomGif);
    // Your code to handle the button click goes here
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSendVisible(false);
    setIsClicked(false);
  };

  const handleHelpClick = () => {
    setIsHelpVisible(true);
  };

  const handleSendHelpClick1 = () => {
    setIsSendHelpClick1Visible(true);
  };

  const handleSendHelpClick2 = () => {
    setIsSendHelpClick2Visible(!isSendHelpClick2Visible);
  };

  const handleCloseClick = () => {
    setIsHelpVisible(false);
  };

  const handleHelpClick2 = () => {
    setIsHelpVisible2(true);
  };

  const handleCloseClick2 = () => {
    setIsHelpVisible2(false);
  };

  const handleHelpClick3 = () => {
    setIsHelpVisible3(true);
  };

  const handleCloseClick3 = () => {
    setIsHelpVisible3(false);
  };

  const handleHelpClick4 = () => {
    setIsHelpVisible4(true);
  };

  const handleCloseClick4 = () => {
    setIsHelpVisible4(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Use the feedback state to send feedback via mailto link
    window.location.href = `mailto:user137@protonmail.com?subject=Feedback&body=${feedback}`;
    setIsHelpVisible4(false);
  };

  const euler = "0xb66cd966670d962C227B3EABA30a872DbFb995db";
  const safemoon = "0x678ee23173dce625A90ED651E91CA5138149F590";
  const unblockchat = "0xe03948003A4346fa8108f8DA1Cf3C12549f0542d";

  return (
    <div>
      <Head>
        <title>UnBlockChat</title>

        <meta
          name="keywords"
          content="blockchain, Ethereum, chat, decentralized"
        />
        <meta name="author" content="AuditUtils" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content="UnBlockChat" />
        <meta
          property="og:description"
          content="Uncover the full story behind blockchain transaction's messages with our app. Switch between Ethereum, Polygon, BSC, and testnets to research with ease and create content by sharing your findings."
        />
        <meta
          property="og:image"
          content="https://unblockchat.auditutils.com/android-chrome-192x192.png"
        />
        <meta property="og:url" content="https://unblockchat.auditutils.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UnBlockChat" />
        <meta
          name="twitter:description"
          content="Uncover the full story behind blockchain transaction's messages with our app. Switch between Ethereum, Polygon, BSC, and testnets to research with ease and create content by sharing your findings."
        />
        <meta
          name="twitter:image"
          content="https://unblockchat.auditutils.com/android-chrome-192x192.png"
        />

        <meta property="telegram:title" content="UnBlockChat" />
        <meta
          property="telegram:description"
          content="Uncover the full story behind blockchain transaction's messages with our app. Switch between Ethereum, Polygon, BSC, and testnets to research with ease and create content by sharing your findings."
        />
        <meta
          property="telegram:image"
          content="https://unblockchat.auditutils.com/android-chrome-192x192.png"
        />

        <meta property="og:site_name" content="UnBlockChat" />
        <meta property="og:locale" content="en_US" />

        <meta property="linkedin:title" content="UnBlockChat" />
        <meta
          property="linkedin:description"
          content="Uncover the full story behind blockchain transaction's messages with our app. Switch between Ethereum, Polygon, BSC, and testnets to research with ease and create content by sharing your findings."
        />
        <meta
          property="linkedin:image"
          content="https://unblockchat.auditutils.com/android-chrome-192x192.png"
        />

        <meta property="discord:title" content="UnBlockChat" />
        <meta
          property="discord:description"
          content="Uncover the full story behind blockchain transaction's messages with our app. Switch between Ethereum, Polygon, BSC, and testnets to research with ease and create content by sharing your findings."
        />
        <meta
          property="discord:image"
          content="https://unblockchat.auditutils.com/android-chrome-192x192.png"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.NewTitleContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <a
              style={{
                textAlign: "left",
                flex: 1,
                alignItems: "center",
              }}
              href="https://unblockchat.auditutils.com/"
            >
              <img
                style={{
                  maxWidth: "240px",
                  width: "100%",
                  margin: "0px",
                  // padding: "5px 0",
                  // marginLeft: "5px",
                }}
                src="logo_v4_long_01_beta-blue.svg"
                alt="UnBlockChat logo"
              />
            </a>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
                maxWidth: "80px", // <-- reduced max width
              }}
            >
              <button
                className={styles.settingsButton}
                onClick={toggleDropdown}
                style={{
                  margin: "auto",
                  padding: "15px 5px",
                }}
              >
                Examples
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3>Cross-network blockchain message tool</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <button
            className={styles.settingsButton}
            onClick={ToggleInbox}
            style={{
              cursor: "pointer",
              // marginRight: "5px",
              textAlign: "center",
              maxWidth: "30%",
            }}
          >
            Explore
          </button>
          <button
            className={styles.settingsButton}
            onClick={handleClick}
            style={{
              cursor: "pointer",
              textAlign: "center",
              maxWidth: "30%",
            }}
          >
            Isolate
          </button>
          <button
            className={styles.settingsButton}
            onClick={ToggleSend}
            style={{
              cursor: "pointer",
              // marginLeft: "5px",
              textAlign: "center",
              maxWidth: "30%",
            }}
          >
            Send
          </button>
        </div>

        {isHelpVisible3 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            onClick={handleCloseClick3}
          >
            <div
              style={{
                backgroundColor: "#282c33ff",
                padding: "20px",
                borderRadius: "15px",
                maxWidth: "400px",
                border: "3px solid rgba(10, 202, 166, 1)",
                color: "#f2f2f2",
                marginBottom: "3rem",
                marginLeft: "20px",
                marginRight: "20px",
                fontSize: "1.3em",
                fontFamily: "monospace",
              }}
              onClick={handleCloseClick3}
            >
              <p>
                <strong>Icons legend:</strong>
              </p>
              <ul>
                <li>
                  click <img src="CarbonZoomFit.svg" width="18px" /> to replace
                  the primary address{" "}
                </li>
                <li>
                  click <img src="CarbonZoomIn.svg" width="18px" /> to place a
                  secondary address{" "}
                </li>
                <li>
                  click <img src="CarbonCopy.svg" width="18px" /> to copy to
                  clipboard{" "}
                </li>
                <li>
                  click <img src="etherscan-logo-circle.png" width="18px" /> to
                  go on etherscan{" "}
                </li>

                <li>
                  click <img src="telegram.png" width="18px" /> to share on
                  Telegram{" "}
                </li>
              </ul>
            </div>
          </div>
        )}
        {isDropdownOpen && (
          <div className={styles.myContainer}>
            <div style={{ marginTop: "0px" }}>
              <ul className={styles.myTitle}>
                <li>
                  click <img src="CarbonZoomFit.svg" width="18px" /> to replace
                  the primary address{" "}
                </li>
                <hr className={styles.myHr} />

                <li>
                  click on &quot;<strong>Titles</strong>&quot; to get articles{" "}
                </li>
              </ul>
              <hr className={styles.myHr} />
            </div>

            <div>
              <p className={styles.myTitle}>
                <a
                  href="https://decrypt.co/125373/euler-finance-exploiter-returns-recoverable-funds-200m-hack"
                  target={"_blank"}
                >
                  <strong>Euler</strong>{" "}
                </a>
                exploiter address:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0xb66cd966670d962C227B3EABA30a872DbFb995db
                </p>
                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0xb66cd966670d962C227B3EABA30a872DbFb995db"
                    );
                    searchParams.set("network", "mainnet");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <div>
              <p className={styles.myTitle}>
                <a href="https://rekt.news/safemoon-rekt/" target={"_blank"}>
                  <strong>Safemoon</strong>
                </a>{" "}
                exploiter address:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x678ee23173dce625A90ED651E91CA5138149F590
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x678ee23173dce625A90ED651E91CA5138149F590"
                    );
                    searchParams.set("network", "bsc");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>

            <hr className={styles.myHr} />
            <div>
              <p className={styles.myTitle}>
                <a href="https://rekt.news/wormhole-rekt/" target={"_blank"}>
                  <strong>Wormhole</strong>
                </a>{" "}
                attacker address:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x629e7da20197a5429d30da36e77d06cdf796b71a
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x629e7da20197a5429d30da36e77d06cdf796b71a"
                    );
                    searchParams.set("network", "mainnet");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <hr className={styles.myHr} />
            <div>
              <p className={styles.myTitle}>
                <a href="https://rekt.news/ronin-rekt/" target={"_blank"}>
                  <strong>Ronin</strong>{" "}
                </a>
                attacker address:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x098b716b8aaf21512996dc57eb0615e2383e2f96
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x098b716b8aaf21512996dc57eb0615e2383e2f96"
                    );
                    searchParams.set("network", "mainnet");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <hr className={styles.myHr} />
            <div>
              <p className={styles.myTitle}>
                <a
                  href="https://rekt.news/orion-protocol-rekt/"
                  target={"_blank"}
                >
                  <strong>Orion protocol</strong>
                </a>{" "}
                attacker address:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x3dabf5e36df28f6064a7c5638d0c4e01539e35f1
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x3dabf5e36df28f6064a7c5638d0c4e01539e35f1"
                    );
                    searchParams.set("network", "mainnet");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <hr className={styles.myHr} />
            <div>
              <p className={styles.myTitle}>
                <a href="https://rekt.news/polynetwork-rekt/" target={"_blank"}>
                  <strong>PolyNetwork</strong>{" "}
                </a>
                remaining funds adresses:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0xC8a65Fadf0e0dDAf421F28FEAb69Bf6E2E589963
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0xC8a65Fadf0e0dDAf421F28FEAb69Bf6E2E589963"
                    );
                    searchParams.set("network", "mainnet");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x0D6e286A7cfD25E0c01fEe9756765D8033B32C71
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x0D6e286A7cfD25E0c01fEe9756765D8033B32C71"
                    );
                    searchParams.set("network", "bsc");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0x5dc3603C9D42Ff184153a8a9094a73d461663214
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0x5dc3603C9D42Ff184153a8a9094a73d461663214"
                    );
                    searchParams.set("network", "polygon");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <hr className={styles.myHr} />
            <div>
              <p className={styles.myTitle}>
                <a href="https://twitter.com/VitalikButerin" target={"_blank"}>
                  <strong>Vitalik Buterin</strong>
                </a>{" "}
                Ethereum creator:
              </p>
              <div className={styles.myContent}>
                <p className={styles.myAddress}>
                  0xd8da6bf26964af9d7eed9e03e53415d37aa96045
                </p>

                <button
                  onClick={(event) => {
                    const searchParams = new URLSearchParams();
                    searchParams.set(
                      "address",
                      "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
                    );
                    searchParams.set("network", "polygon-zkevm");
                    window.location.href = `?${searchParams.toString()}`;
                  }}
                  className={styles.myButton}
                >
                  <img
                    src="CarbonZoomFit.svg"
                    alt="Scan address"
                    className={styles.myImage}
                  />
                </button>
              </div>
            </div>
            <hr className={styles.myHr} />
          </div>
        )}
        {isSendVisible && (
          <div className={styles.form}>
            <div className={styles.settingsButtonContainer}>
              <a href="https://unblockchat.auditutils.com/">
                <img
                  src="CharmRefresh.svg"
                  alt="reset"
                  className={styles.myResetImage}
                />
              </a>
            </div>

            {address3 ? (
              <div
                className={styles.addressContainer}
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
                {/* {isSendHelpClick1Visible && (
                  <button
                    onClick={handleSendHelpClick2}
                    type="button"
                    style={{
                      all: "unset", // Reset all styles
                      // marginLeft: "3px",
                      cursor: "pointer",

                      // Adjust the margin as needed
                    }}
                  >
                    <img
                      src="CarbonSettings.svg"
                      alt="help"
                      style={{ height: "20px" }}
                    />
                  </button>
                )} */}
                {/* {isSendHelpClick2Visible && (
                  <SwitchNetwork setAddress3={setAddress3} />
                )} */}
                <div
                  className={styles.connectedAddress}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    width: "100%",
                    flexDirection: "column",
                    marginTop: "0px",
                    padding: "0 0",
                    wordWrap: "break-word",
                  }}
                >
                  <p>
                    Connected
                    {isSendHelpClick1Visible && (
                      <button
                        onClick={handleSendHelpClick2}
                        type="button"
                        style={{
                          all: "unset", // Reset all styles
                          marginLeft: "9px",
                          cursor: "pointer",

                          // Adjust the margin as needed
                        }}
                      >
                        <img
                          src="CarbonSettings.svg"
                          alt="help"
                          style={{ height: "20px" }}
                        />
                      </button>
                    )}
                  </p>
                  {isSendHelpClick2Visible && (
                    <SwitchNetwork setAddress3={setAddress3} />
                  )}
                  <p style={{ color: "#ccc" }}>From:</p>
                  <p style={{ wordBreak: "break-word" }}>{address3}</p>
                </div>
              </div>
            ) : (
              <ConnectWalletButton setAddress3={setAddress3} />
            )}
            <SendMessage />
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.settingsButtonContainer}>
            <a href="https://unblockchat.auditutils.com/">
              <img
                src="CharmRefresh.svg"
                alt="reset"
                className={styles.myResetImage}
              />
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ display: "flex", alignItems: "center" }}>
              Enter a blockchain address:
              <button
                onClick={handleHelpClick}
                type="button"
                style={{
                  all: "unset", // Reset all styles
                  marginLeft: "3px",
                  cursor: "pointer",
                  // Adjust the margin as needed
                }}
              >
                <img
                  src="CarbonHelp.svg"
                  alt="help"
                  style={{ height: "20px" }}
                />
              </button>
            </p>
            {isHelpVisible && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
                onClick={handleCloseClick}
              >
                <div
                  style={{
                    backgroundColor: "#282c33ff",
                    padding: "10px",
                    borderRadius: "15px",
                    maxWidth: "400px",
                    border: "3px solid rgba(10, 202, 166, 1)",
                    color: "#f2f2f2",
                    marginBottom: "3rem",
                    marginLeft: "20px",
                    marginRight: "20px",
                    fontSize: "1.3em",
                    fontFamily: "monospace",
                  }}
                  onClick={handleCloseClick}
                >
                  <p>
                    Enter an address and retrieve the complete list of outgoing
                    and ongoing messages associated with that account
                  </p>
                </div>
              </div>
            )}
          </div>

          <label className={styles.label}>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={styles.inputText}
              placeholder="0x..."
            />
          </label>
          {isClicked && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.1em",
                    fontFamily: "monospace",
                  }}
                >
                  Enter a secondary address:
                  <button
                    onClick={handleHelpClick2}
                    type="button"
                    style={{
                      all: "unset", // Reset all styles
                      marginLeft: "3px",
                      cursor: "pointer",
                      // Adjust the margin as needed
                    }}
                  >
                    <img
                      src="CarbonHelp.svg"
                      alt="help"
                      style={{ height: "20px" }}
                    />
                  </button>
                </p>
                <input
                  type="text"
                  value={address2}
                  onChange={(event) => setAddress2(event.target.value)}
                  className={styles.inputText}
                  placeholder="0x..."
                />
              </div>

              {/* <div>
                Enter a transaction hash:{" "}
                <input
                  type="text"
                  value={address3}
                  onChange={(event) => setAddress3(event.target.value)}
                  className={styles.inputText}
                  placeholder="0x...(not available yet)"
                />
              </div> */}
            </div>
          )}
          {isHelpVisible2 && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
              onClick={handleCloseClick2}
            >
              <div
                style={{
                  backgroundColor: "#282c33ff",
                  padding: "10px",
                  borderRadius: "15px",
                  maxWidth: "400px",
                  border: "3px solid rgba(10, 202, 166, 1)",
                  color: "#f2f2f2",
                  marginBottom: "3rem",
                  marginLeft: "20px",
                  marginRight: "20px",
                  fontSize: "1.3em",
                }}
                onClick={handleCloseClick2}
              >
                <p>
                  Provide the secondary address to obtain an isolated
                  conversation between these two accounts
                </p>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {" "}
            <p
              style={{
                // all: "unset",
                display: "flex",
                alignItems: "center",
                fontSize: "1.1em",
                fontFamily: "monospace",
              }}
            >
              Choose a network:
            </p>
            <select
              value={network}
              onChange={handleNetworkChange}
              className={styles.networkSelect}
            >
              <option value="mainnet">Ethereum</option>
              <option value="goerli">Eth Goerli</option>
              <option value="sepolia">Eth Sepolia</option>
              <option value="bsc">Bsc</option>
              <option value="bsc-testnet">Bsc testnet</option>
              <option value="polygon">Polygon</option>
              <option value="polygon-testnet">Polygon mumbai</option>
              <option value="polygon-zkevm">Polygon zkEVM</option>
              <option value="optimistic">Optimism</option>
              <option value="optimistic-goerli">Optimism Goerli</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="arbitrum-goerli">Arbitrum Goerli</option>
            </select>
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${
              loading ? styles.loading : ""
            }`}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {loading ? (
              <div className={styles.loadingContainer}>
                {gif && <img src={`/${gif}`} alt="In progress" />}
              </div>
            ) : (
              "LOAD CHAT"
            )}
          </button>
        </form>

        {transactions.length > 0 && (
          <div className={styles.conversation}>
            <h3>Discution:</h3>
            <ListGroup>
              {transactions.map((transaction, index) => {
                if (!transaction.inputData) {
                  return " ";
                }

                const color = getColor(transaction.from);
                const id = `transaction-${transaction.hash}`;
                console.log(`Transaction ${index} has an id of ${id}`);

                return (
                  <ListGroupItem key={transaction.hash}>
                    <div
                      className={styles.message}
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {transaction.from === address ? (
                        <div>
                          <p className={styles.timestamp}>
                            <button
                              className={styles.myBtn}
                              onClick={(event) => {
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                // marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonArrowUp.svg"
                                alt="top"
                                style={{ height: "18px" }}
                              />
                            </button>{" "}
                            {transaction.timestamp}
                            {", "}$:{transaction.value}
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://bscscan.com/tx/${transaction.hash}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/tx/${transaction.hash}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/tx/${transaction.hash}`;
                                }

                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>{" "}
                            <button
                              onClick={handleHelpClick3}
                              type="button"
                              style={{
                                all: "unset", // Reset all styles
                                marginLeft: "3px",
                                cursor: "pointer",
                                // Adjust the margin as needed
                              }}
                            >
                              <img
                                src="CarbonHelp.svg"
                                alt="help"
                                style={{ height: "20px" }}
                              />
                            </button>
                          </p>
                          <hr />

                          <p className={styles.yoyo}>
                            <strong>From:</strong> {transaction.from}
                          </p>
                          <p>
                            <button
                              onClick={(event) => {
                                setAddress(transaction.from);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomFit.svg"
                                alt="Set primary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={(event) => {
                                setAddress2(transaction.from);
                                setIsClicked(true);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomIn.svg"
                                alt="add secondary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(transaction.from);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonCopy.svg"
                                alt="Copy address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/address/${transaction.from}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/address/${transaction.from}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/address/${transaction.from}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://testnet.bscscan.com/address/${transaction.from}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://bscscan.com/address/${transaction.from}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/address/${transaction.from}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/address/${transaction.from}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/address/${transaction.from}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/address/${transaction.from}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/address/${transaction.from}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/address/${transaction.from}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/address/${transaction.from}`;
                                }
                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>
                          </p>

                          <p className={styles.yoyo}>
                            <strong>To:</strong> {transaction.to}
                          </p>
                          <p>
                            <button
                              onClick={(event) => {
                                setAddress(transaction.to);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomFit.svg"
                                alt="Set primary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={(event) => {
                                setAddress2(transaction.to);
                                setIsClicked(true);

                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomIn.svg"
                                alt="add secondary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(transaction.to);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonCopy.svg"
                                alt="Copy address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/address/${transaction.to}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/address/${transaction.to}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/address/${transaction.to}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://testnet.bscscan.com/address/${transaction.to}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://bscscan.com/address/${transaction.to}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/address/${transaction.to}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/address/${transaction.to}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/address/${transaction.to}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/address/${transaction.to}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/address/${transaction.to}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/address/${transaction.to}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/address/${transaction.to}`;
                                }
                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>
                          </p>

                          {transaction.inputData && (
                            <>
                              <div className="spacer" />
                              <hr />
                              <p
                                style={{
                                  textAlign: "start",
                                }}
                              >
                                <strong>Message:</strong>
                              </p>
                              <div style={{ marginBottom: "10px" }}></div>
                              <p className={styles.messageContent}>
                                {transaction.inputData}
                              </p>
                              <p
                                style={{
                                  textAlign: "end",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    let etherscanLink = "";
                                    if (network === "mainnet") {
                                      etherscanLink = `https://etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "goerli") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "sepolia") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "bsc") {
                                      etherscanLink = `https://bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "bsc-testnet") {
                                      etherscanLink = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon") {
                                      etherscanLink = `https://polygonscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon-testnet") {
                                      etherscanLink = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                    }
                                    const timestamp = `${transaction.timestamp}`;
                                    const transactionData = `--------------------\n\n${transaction.inputData}\n\n--------------------\n\n\n🕰️UTC Date/Time: ${timestamp}\n💸Value in native money of ${network}: ${transaction.value}\n📤From: ${transaction.from}\n📥To: ${transaction.to}\n\n\n🌐UnBlockChat:\nhttps://unblockchat.auditutils.com/?address=${address}&network=${network}`;
                                    navigator.clipboard.writeText(
                                      transactionData
                                    );
                                    alert(
                                      "Message content copied to clipboard. Let's past it to share it!"
                                    );
                                  }}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <img
                                    src="CarbonCopy.svg"
                                    alt="Copy transaction data"
                                    style={{ height: "20px" }}
                                  />
                                </button>

                                <button
                                  onClick={() => {
                                    let etherscanLink = "";
                                    if (network === "mainnet") {
                                      etherscanLink = `https://etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "goerli") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "sepolia") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "bsc") {
                                      etherscanLink = `https://bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "bsc-testnet") {
                                      etherscanLink = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon") {
                                      etherscanLink = `https://polygonscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon-testnet") {
                                      etherscanLink = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                    }
                                    const timestamp = `${transaction.timestamp}`;
                                    const transactionData = `--------------------\n\n${transaction.inputData}\n\n--------------------\n\n\n🕰️UTC Date/Time: ${timestamp}\n💸Value in native money of ${network}: ${transaction.value}\n📤From: ${transaction.from}\n📥To: ${transaction.to}\n\n\n🌐UnBlockChat:\nhttps://unblockchat.auditutils.com/?address=${address}&network=${network}`;
                                    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
                                      transactionData
                                    )}`;
                                    window.open(telegramLink, "_blank");
                                  }}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <img
                                    src="telegram.png"
                                    alt="Share on Telegram"
                                    style={{ height: "20px" }}
                                  />
                                </button>
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className={styles.timestamp}>
                            <button
                              className={styles.myBtn}
                              onClick={(event) => {
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                // marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonArrowUp.svg"
                                alt="top"
                                style={{ height: "18px" }}
                              />
                            </button>{" "}
                            {transaction.timestamp}
                            {", "}$:{transaction.value}
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://bscscan.com/tx/${transaction.hash}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/tx/${transaction.hash}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/tx/${transaction.hash}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/tx/${transaction.hash}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/tx/${transaction.hash}`;
                                }
                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>{" "}
                            <button
                              onClick={handleHelpClick3}
                              type="button"
                              style={{
                                all: "unset", // Reset all styles
                                marginLeft: "3px",
                                cursor: "pointer",
                                // Adjust the margin as needed
                              }}
                            >
                              <img
                                src="CarbonHelp.svg"
                                alt="help"
                                style={{ height: "20px" }}
                              />
                            </button>
                          </p>
                          <hr />

                          <p className={styles.yoyo}>
                            <strong>From:</strong> {transaction.from}
                          </p>
                          <p>
                            <button
                              onClick={(event) => {
                                setAddress(transaction.from);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomFit.svg"
                                alt="Set primary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={(event) => {
                                setAddress2(transaction.from);
                                setIsClicked(true);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomIn.svg"
                                alt="add secondary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(transaction.from);
                                alert("Address sender copied to clipboard.");
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonCopy.svg"
                                alt="Copy address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/address/${transaction.from}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/address/${transaction.from}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/address/${transaction.from}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://testnet.bscscan.com/address/${transaction.from}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://bscscan.com/address/${transaction.from}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/address/${transaction.from}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/address/${transaction.from}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/address/${transaction.from}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/address/${transaction.from}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/address/${transaction.from}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/address/${transaction.from}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/address/${transaction.from}`;
                                }
                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>
                          </p>

                          <p className={styles.yoyo}>
                            <strong>To:</strong> {transaction.to}
                          </p>
                          <p>
                            <button
                              onClick={(event) => {
                                setAddress(transaction.to);
                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomFit.svg"
                                alt="Set primary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={(event) => {
                                setAddress2(transaction.to);
                                setIsClicked(true);

                                window.scrollTo(0, 0);
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonZoomIn.svg"
                                alt="add secondary address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(transaction.to);
                                alert("Address receiver copied to clipboard.");
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                marginLeft: "20px",
                              }}
                            >
                              <img
                                src="CarbonCopy.svg"
                                alt="Copy address"
                                style={{ height: "20px" }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                let etherscanUrl = "";
                                if (network === "mainnet") {
                                  etherscanUrl = `https://etherscan.io/address/${transaction.to}`;
                                } else if (network === "goerli") {
                                  etherscanUrl = `https://goerli.etherscan.io/address/${transaction.to}`;
                                } else if (network === "sepolia") {
                                  etherscanUrl = `https://${network}.etherscan.io/address/${transaction.to}`;
                                } else if (network === "bsc") {
                                  etherscanUrl = `https://testnet.bscscan.com/address/${transaction.to}`;
                                } else if (network === "bsc-testnet") {
                                  etherscanUrl = `https://bscscan.com/address/${transaction.to}`;
                                } else if (network === "polygon") {
                                  etherscanUrl = `https://polygonscan.com/address/${transaction.to}`;
                                } else if (network === "polygon-testnet") {
                                  etherscanUrl = `https://mumbai.polygonscan.com/address/${transaction.to}`;
                                } else if (network === "polygon-zkevm") {
                                  etherscanUrl = `https://zkevm.polygonscan.com/address/${transaction.to}`;
                                } else if (network === "optimistic") {
                                  etherscanUrl = `https://optimistic.etherscan.io/address/${transaction.to}`;
                                } else if (network === "optimistic-goerli") {
                                  etherscanUrl = `https://goerli-optimistic.etherscan.io/address/${transaction.to}`;
                                } else if (network === "arbitrum") {
                                  etherscanUrl = `https://arbiscan.io/address/${transaction.to}`;
                                } else if (network === "arbitrum-goerli") {
                                  etherscanUrl = `https://goerli.arbiscan.io/address/${transaction.to}`;
                                }
                                if (etherscanUrl !== "") {
                                  window.open(etherscanUrl, "_blank");
                                }
                              }}
                              style={{
                                border: "none",
                                // background: "#eab308",
                                // background: "#ffd700",
                                cursor: "pointer",
                                marginLeft: "20px",
                                background: "none",
                              }}
                            >
                              <img
                                src="etherscan-logo-circle.png"
                                alt="Etherscan logo"
                                style={{
                                  height: "20px",
                                  filter: "grayscale(100%)",
                                  // background: "#eab308",
                                  // background: "#ffd700",
                                }}
                              />
                            </button>
                          </p>
                          {transaction.inputData && (
                            <>
                              <div className="spacer" />
                              <hr />
                              <p
                                style={{
                                  textAlign: "start",
                                }}
                              >
                                <strong>Message:</strong>
                              </p>
                              <div style={{ marginBottom: "10px" }}></div>
                              <p className={styles.messageContent}>
                                {transaction.inputData}
                              </p>
                              <p
                                style={{
                                  textAlign: "end",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    let etherscanLink = "";
                                    if (network === "mainnet") {
                                      etherscanLink = `https://etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "goerli") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "sepolia") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "bsc") {
                                      etherscanLink = `https://bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "bsc-testnet") {
                                      etherscanLink = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon") {
                                      etherscanLink = `https://polygonscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon-testnet") {
                                      etherscanLink = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                    }
                                    const timestamp = `${transaction.timestamp}`;
                                    const transactionData = `--------------------\n\n${transaction.inputData}\n\n--------------------\n\n\n🕰️UTC Date/Time: ${timestamp}\n💸Value in native money of ${network}: ${transaction.value}\n📤From: ${transaction.from}\n📥To: ${transaction.to}\n\n\n🌐UnBlockChat:\nhttps://unblockchat.auditutils.com/?address=${address}&network=${network}`;
                                    navigator.clipboard.writeText(
                                      transactionData
                                    );
                                    alert(
                                      "Message content copied to clipboard. Let's past it to share it!"
                                    );
                                  }}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <img
                                    src="CarbonCopy.svg"
                                    alt="Copy transaction data"
                                    style={{ height: "20px" }}
                                  />
                                </button>

                                <button
                                  onClick={() => {
                                    let etherscanLink = "";
                                    if (network === "mainnet") {
                                      etherscanLink = `https://etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "goerli") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "sepolia") {
                                      etherscanLink = `https://${network}.etherscan.io/tx/${transaction.hash}`;
                                    } else if (network === "bsc") {
                                      etherscanLink = `https://bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "bsc-testnet") {
                                      etherscanLink = `https://testnet.bscscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon") {
                                      etherscanLink = `https://polygonscan.com/tx/${transaction.hash}`;
                                    } else if (network === "polygon-testnet") {
                                      etherscanLink = `https://mumbai.polygonscan.com/tx/${transaction.hash}`;
                                    }
                                    const timestamp = `${transaction.timestamp}`;
                                    const transactionData = `--------------------\n\n${transaction.inputData}\n\n--------------------\n\n\n🕰️UTC Date/Time: ${timestamp}\n💸Value in native money of ${network}: ${transaction.value}\n📤From: ${transaction.from}\n📥To: ${transaction.to}\n\n\n🌐UnBlockChat:\nhttps://unblockchat.auditutils.com/?address=${address}&network=${network}`;
                                    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
                                      transactionData
                                    )}`;
                                    window.open(telegramLink, "_blank");
                                  }}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <img
                                    src="telegram.png"
                                    alt="Share on Telegram"
                                    style={{ height: "20px" }}
                                  />
                                </button>
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        )}

        <div style={{ flex: 1, textAlign: "center" }}>
          <a
            style={{
              textAlign: "center",
              flex: 1,
              alignItems: "center",
            }}
            href="https://unblockchat.auditutils.com/"
          >
            <img
              style={{
                maxWidth: "120px",
                // marginTop: "30px",
                padding: "0px",
                textAlign: "center",
                flex: 1,
                alignItems: "center",
                // backgroundColor: "#282c33ff",
                // borderRadius: "9px",
                marginTop: "5px",
              }}
              src="logo_v4_square_01.svg"
              alt="UnBlockChat logo"
            />
          </a>
        </div>

        <div
          className={styles.myContainer}
          style={{
            backgroundColor: "transparent",
            marginTop: "10px",
            padding: "0px 10px",
          }}
        >
          <div className={styles.mySection} style={{ marginTop: "10px" }}>
            <p className={styles.myTitle}>
              <a href="https://unblockchat.auditutils.com/" target={"_self"}>
                <strong>UnBlockChat</strong> address:
              </a>
            </p>
            <div className={styles.myContent}>
              <p className={styles.myAddress}>
                0xe03948003A4346fa8108f8DA1Cf3C12549f0542d
              </p>
              <button
                onClick={(event) => {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    "address",
                    "0xe03948003A4346fa8108f8DA1Cf3C12549f0542d"
                  );
                  searchParams.set("network", "sepolia");
                  window.location.href = `?${searchParams.toString()}`;
                }}
                className={styles.myButton}
              >
                <img
                  src="CarbonZoomFit.svg"
                  alt="Copy address"
                  className={styles.myImage}
                />
              </button>
            </div>
          </div>
        </div>
        <h3
          style={{
            flex: 1,
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "monospace",
          }}
        >
          2023 UnBlockChat by{" "}
          <a href="https://auditutils.com" target="_blank">
            AuditUtils
          </a>
        </h3>
        {/* <p
          style={{
            color: "#00ffff",
            marginTop: "60px",
            textAlign: "end",
            fontFamily: "monospace",
          }}
        >
          <button
            onClick={handleHelpClick4}
            type="button"
            style={{
              all: "unset", // Reset all styles
              marginLeft: "3px",
              cursor: "pointer",
              // Adjust the margin as needed
            }}
          >
            <img
              src="CarbonEmail (1).svg"
              alt="Contact"
              style={{ height: "48px" }}
            />
          </button>
        </p> */}

        <div
          // className={styles.header}
          style={{
            // display: "flex",
            alignItems: "center",
            marginTop: "60px",
            textAlign: "center",
            // padding: "20px",
          }}
        >
          <a href="https://github.com/gituser6hij/block-chat-app">
            <img
              className={styles["profile-image-au"]}
              src="CarbonLogoGithub.svg"
              alt="user137 Profile Picture"
            />
          </a>
          <a href="https://auditutils.com/">
            <img
              className={styles["profile-image-user137"]}
              src="https://auditutils.com/content/images/2023/02/au-pixelize.jpg"
              alt="auditutils logo pixel"
              style={{ height: "48px", width: "48px" }}
            />
          </a>
          <a href="https://user137-portfolio.auditutils.com">
            <img
              className={styles["profile-image-user137"]}
              src="https://user137-portfolio.auditutils.com/user137.PNG"
              alt="user137 Profile Picture"
            />
          </a>
          <a
            onClick={handleHelpClick4}
            type="button"
            style={{
              // all: "unset", // Reset all styles
              // marginLeft: "20px",
              cursor: "pointer",
              // Adjust the margin as needed
            }}
          >
            <img
              src="CarbonEmail (1).svg"
              alt="Contact"
              style={{ height: "48px" }}
              className={styles["profile-image-user137"]}
            />
          </a>
        </div>

        {isHelpVisible4 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#282c33ff",
                padding: "20px",
                borderRadius: "15px",
                maxWidth: "400px",
                border: "3px solid rgba(10, 202, 166, 1)",
                color: "#f2f2f2",
                marginBottom: "3rem",
                marginLeft: "20px",
                marginRight: "20px",
                fontSize: "1.3em",
                fontFamily: "monospace",
                display: "flex", // Add this
                flexDirection: "column", // Add this
                alignItems: "center", // Add this
              }}
            >
              <p>user137@protonmail.com</p>
              <a
                className={styles.settingsButton}
                href="mailto:user137@protonmail.com"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                Send email
              </a>
              <button
                onClick={handleCloseClick4}
                className={styles.settingsButton}
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontFamily: "monospace",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
