const fs = require('fs-extra');
const path = require('path');

/**
 * Ensure the output directory exists
 * @param {string} dir Directory path
 */
async function ensureOutputDir(dir) {
  await fs.ensureDir(dir);
}

/**
 * Save wallet data to a file
 * @param {Array} wallets Array of wallet information
 * @param {string} format Output format (json or csv)
 * @param {string} outputDir Output directory path
 */
async function saveWalletData(wallets, format, outputDir) {
  await ensureOutputDir(outputDir);
  
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const filename = `wallets-${timestamp}`;
  
  if (format === 'json') {
    await saveAsJson(wallets, outputDir, filename);
  } else if (format === 'csv') {
    await saveAsCsv(wallets, outputDir, filename);
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
  
  // Always save a sensitive data file separately to ensure it can be secured
  await saveSensitiveDataFile(wallets, outputDir, timestamp);
}

/**
 * Save wallet data as JSON
 * @param {Array} wallets Wallet data
 * @param {string} outputDir Output directory
 * @param {string} filename Base filename
 */
async function saveAsJson(wallets, outputDir, filename) {
  const filePath = path.join(outputDir, `${filename}.json`);
  const data = {
    generated: new Date().toISOString(),
    count: wallets.length,
    wallets: wallets.map(w => ({
      address: w.address,
      privateKey: w.privateKey,
      mnemonic: w.mnemonic
    }))
  };
  
  await fs.writeJSON(filePath, data, { spaces: 2 });
}

/**
 * Save wallet data as CSV
 * @param {Array} wallets Wallet data
 * @param {string} outputDir Output directory
 * @param {string} filename Base filename
 */
async function saveAsCsv(wallets, outputDir, filename) {
  const filePath = path.join(outputDir, `${filename}.csv`);
  const header = 'Address,PrivateKey,Mnemonic\n';
  const rows = wallets.map(wallet => 
    `${wallet.address},${wallet.privateKey},"${wallet.mnemonic}"`
  );
  
  const csvContent = header + rows.join('\n');
  await fs.writeFile(filePath, csvContent);
}

/**
 * Save a separate file with sensitive data (for security considerations)
 * @param {Array} wallets Wallet data
 * @param {string} outputDir Output directory
 * @param {string} timestamp Timestamp for filename
 */
async function saveSensitiveDataFile(wallets, outputDir, timestamp) {
  const filePath = path.join(outputDir, `sensitive-keys-${timestamp}.txt`);
  const content = wallets.map(wallet => 
    `Address: ${wallet.address}\nPrivate Key: ${wallet.privateKey}\nMnemonic: ${wallet.mnemonic}\n\n`
  ).join('---\n\n');
  
  const warning = 
    '!!! IMPORTANT: KEEP THIS FILE SECURE !!!\n' +
    'This file contains sensitive wallet information that can be used to access your funds.\n' +
    'Store it in a secure location and never share it with anyone.\n\n';
  
  await fs.writeFile(filePath, warning + content);
}

module.exports = {
  saveWalletData
};