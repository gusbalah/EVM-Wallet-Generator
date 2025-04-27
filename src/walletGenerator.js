const { Wallet } = require('ethers');
const { saveWalletData } = require('./storage');
const { createProgressBar } = require('./utils');

/**
 * Generate a single Ethereum wallet
 * @returns {Object} Wallet info containing address, privateKey, and mnemonic
 */
function generateSingleWallet() {
  // Generate a random mnemonic (uses crypto.randomBytes under the hood)
  const wallet = Wallet.createRandom();
  
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  };
}

/**
 * Generate multiple Ethereum wallets
 * @param {number} count Number of wallets to generate
 * @param {string} format Output format (json or csv)
 * @param {string} outputDir Output directory path
 */
async function generateWallets(count, format, outputDir) {
  const wallets = [];
  const progressBar = createProgressBar(count);
  
  progressBar.start(count, 0);
  
  for (let i = 0; i < count; i++) {
    const wallet = generateSingleWallet();
    wallets.push(wallet);
    progressBar.update(i + 1);
    
    // Small delay to show progress bar movement
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  progressBar.stop();
  
  // Save all wallet data
  await saveWalletData(wallets, format, outputDir);
  
  return wallets;
}

module.exports = {
  generateWallets,
  generateSingleWallet
};