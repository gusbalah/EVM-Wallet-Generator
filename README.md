# 🚀 EVM Wallet Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![GitHub Stars](https://img.shields.io/github/stars/gusbalah/evm-wallet-generator?style=social)](https://github.com/gusbalah/evm-wallet-generator/stargazers)

A Node.js tool for generating multiple Ethereum Virtual Machine (EVM) compatible wallets.  
Create wallets with addresses, private keys, and mnemonic phrases, stored in a structured and secure format.

---

## ✨ Features

- 🔹 Generate multiple EVM-compatible wallets
- 🔹 Interactive prompts for number of wallets
- 🔹 Save mnemonic phrases, private keys, and addresses
- 🔹 Export data in JSON or CSV format
- 🔹 Batch operation progress indicator
- 🔹 Color-coded console output for clarity

---

## GitHub Repository

Find the latest version and contribute to the project:
[https://github.com/gusbalah]

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Usage

To start the interactive wallet generator:

```bash
npm start
```

Or use with custom options:

```bash
node index.js generate --format json --output ./my-wallets
```

### Options

- `-f, --format <format>` - Output format: json or csv (default: json)
- `-o, --output <path>` - Output directory (default: ./wallets)

Example:

```bash
node index.js generate -f csv -o ./secure-wallets
```

## Security Warning

⚠️ **IMPORTANT**: The generated wallets contain sensitive data!

- Private keys and mnemonics provide full control over the wallets
- Store these files securely and never share them
- The tool generates a separate sensitive data file as an extra security measure

## Files Generated

1. `wallets-[timestamp].[format]` - Contains all wallet data
2. `sensitive-keys-[timestamp].txt` - Contains wallet data in a human-readable format

## License

This project is open source and available under the MIT License.#   E V M - W a l l e t - G e n e r a t o r 
 
 
1. Clone the repository:

```bash
git clone https://github.com/gusbalah/evm-wallet-generator.git
cd evm-wallet-generator
