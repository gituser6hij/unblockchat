import { getTransactions } from '../lib/eth';

export default async function handler(req, res) {
  const { address } = req.query;

  try {
    const transactions = await getTransactions(address);

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}