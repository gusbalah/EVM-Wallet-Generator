const chalk = require('chalk');
const cliProgress = require('cli-progress');

/**
 * Create a progress bar for wallet generation
 * @param {number} total Total number of wallets to generate
 * @returns {ProgressBar} CLI progress bar instance
 */
function createProgressBar(total) {
  return new cliProgress.SingleBar({
    format: 'Generating wallets |' + chalk.cyan('{bar}') + '| {percentage}% | {value}/{total} wallets',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  }, cliProgress.Presets.shades_classic);
}

/**
 * Print welcome message when starting wallet generation
 * @param {number} count Number of wallets to be generated
 */
function printWelcomeMessage(count) {
  console.log(chalk.bold.green('\n🔐 EVM Wallet Generator 🔐\n'));
  console.log(chalk.yellow(`Preparing to generate ${count} Ethereum wallets...\n`));
}

/**
 * Print completion message after wallet generation
 * @param {number} count Number of wallets generated
 * @param {string} outputDir Directory where wallets were saved
 */
function printCompletionMessage(count, outputDir) {
  console.log(chalk.green(`\n✅ Successfully generated ${count} wallets!`));
  console.log(chalk.magenta(`\n💝 "Created with care and attention to security" github : https://github.com/gusbalah 💝`));
  console.log(chalk.yellow(`\nWallet data saved to: ${chalk.bold(outputDir)}`));
  console.log(chalk.red.bold('\n⚠️  IMPORTANT SECURITY WARNING ⚠️'));
  console.log(chalk.red('Keep your private keys and mnemonics secure.'));
  console.log(chalk.red('Anyone with access to these can control your wallets and assets.\n'));
}

module.exports = {
  createProgressBar,
  printWelcomeMessage,
  printCompletionMessage
};