<div align="center">
<img src="https://github.com/gituser6hij/block-chat-app/blob/main/public/logo_v4_long_01_beta-blue.svg" alt="BlockChat Logo">
</div>

# BlockChat

BlockChat is an open-source app developed by user137 from AuditUtils. It is a cross-network discussions explorer, built using Next.js, Node.js, and the etherscan API.

## Address:

https://blockchat.auditutils.com/

## Features

- Gather all messages incoming and outgoing from an address on 12 networks: Ethereum, ETH Goerli, ETH Sepolia, BSC, BSC-testnet, Polygon, Mumbai, Polygon-zkEVM, Arbitrum, Arbitrum-testnet, Optimism, Optimism-testnet.
- Isolate conversation between two addresses or isolate self-conversation on one address by specifying a secondary address in the advanced menu.
- User-friendly interface: BlockChat features a user-friendly interface that is easy to use and navigate, making it accessible to both technical and non-technical users.

## Roadmap

The following are the planned features and goals for BlockChat:

- Implement sending messages function: Allow users to send messages on supported blockchains directly from the app.
- Add a chat wall: Display real-time messages from various blockchains on a chat wall for easy viewing.
- Add filters to discussions: Enable users to filter and sort discussions based on criteria such as blockchain network, sender/receiver addresses, and time.

## Installation

You should add .env.local file in the root folder with your api for respective networks:

- ETHEREUM_API_KEY=[YOUR_API_KEY]
- BSC_API_KEY=[YOUR_API_KEY]
- POLYGON_API_KEY=[YOUR_API_KEY]
- POLYGON_ZKEVM_API_KEY=[YOUR_API_KEY]
- OPTIMISM_API_KEY=[YOUR_API_KEY]
- ARBITRUM_API_KEY=[YOUR_API_KEY]

To get started, please run the following commands:

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build the app for production: `npm run build`

You can access BlockChat at `localhost:3000` after running the above commands.

## Contribution

Contributions are welcome! If you would like to contribute to BlockChat, please refer to the [CONTRIBUTING](CONTRIBUTING.md) guidelines.

## Contact

For any inquiries or feedback, please contact user137 at user137@protonmail.com or visit the [AuditUtils blog](https://auditutils.com) for more information.

<div align="center">
<img src="https://github.com/gituser6hij/block-chat-app/blob/main/public/logo_v4_square_01.svg" alt="BlockChat Logo">
</div>

## License

BlockChat is released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, as long as it is in compliance with the terms of the MIT License.

MIT License

Copyright (c) 2023 gituser6hij

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
