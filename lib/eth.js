import axios from "axios";
import Web3 from "web3";
const ETHEREUM_API_KEY = process.env.ETHEREUM_API_KEY;
const BSC_API_KEY = process.env.BSC_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const POLYGON_ZKEVM_API_KEY = process.env.POLYGON_ZKEVM_API_KEY;
const OPTIMISM_API_KEY = process.env.OPTIMISM_API_KEY;
const ARBITRUM_API_KEY = process.env.ARBITRUM_API_KEY;

export async function getTransactions(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ETHEREUM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions2(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ETHEREUM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions3(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ETHEREUM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions4(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${BSC_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions5(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=apikey=${BSC_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions6(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=apikey=${POLYGON_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions7(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${POLYGON_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions8(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-zkevm.polygonscan.com/api?module=account&action=txlist&address=${address}&sort=desc&apikey=apikey=${POLYGON_ZKEVM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions9(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${OPTIMISM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions10(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-goerli-optimistic.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${OPTIMISM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions11(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api.arbiscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ARBITRUM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
export async function getTransactions12(address, address2) {
  const transactions = [];

  try {
    const response = await axios.get(
      `https://api-goerli.arbiscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ARBITRUM_API_KEY}`
    );

    const data = response.data.result;
    const processedMessages = new Set();

    for (const transaction of data) {
      const inputData = transaction.input;
      if (!/^(0x)?[0-9a-fA-F]+$/.test(inputData)) {
        // If inputData is not a valid hex value, skip this transaction
        continue;
      }
      const inputDataString = Buffer.from(inputData.slice(2), "hex").toString();

      const timestamp = new Date(transaction.timeStamp * 1000).toUTCString();
      const blockNumber = transaction.blockNumber;
      const value = Web3.utils.fromWei(transaction.value, "ether");

      const index = transactions.findIndex(
        (tx) => tx.blockNumber === transaction.blockNumber
      );

      // Check if the message contains invalid characters
      if (inputDataString.includes("�") || inputDataString.includes("")) {
        continue; // Skip this message
      }

      if (processedMessages.has(inputDataString)) {
        continue; // Skip this message if it's a duplicate
      } else {
        processedMessages.add(inputDataString); // Add the message to the set
      }

      // Filter based on address2 if provided
      if (
        address2 &&
        transaction.from.toLowerCase() !== address2.toLowerCase() &&
        transaction.to.toLowerCase() !== address2.toLowerCase()
      ) {
        continue; // Skip this transaction if it doesn't match address2
      }

      // Skip transactions not from or to address2 if address2 is equal to address
      if (
        address2 &&
        address2.toLowerCase() === address.toLowerCase() &&
        (transaction.from.toLowerCase() !== address2.toLowerCase() ||
          transaction.to.toLowerCase() !== address2.toLowerCase())
      ) {
        continue; // Skip this transaction if it's not from or to address2
      }

      if (index === -1) {
        transactions.push({
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          inputData: inputDataString,
          timestamp: timestamp,
          blockNumber: transaction.blockNumber,
          value: value,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return transactions;
}
