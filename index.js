#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const { generateWallets } = require('./src/walletGenerator');
const { printWelcomeMessage, printCompletionMessage } = require('./src/utils');

// Configure CLI
program
  .name('evm-wallet-generator')
  .description('Generate multiple EVM wallet addresses with private keys and mnemonics')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate multiple EVM wallets')
  .option('-f, --format <format>', 'Output format (json or csv)', 'json')
  .option('-o, --output <path>', 'Output directory', './wallets')
  .action(async (options) => {
    console.log('\n🔐 EVM Wallet Generator 🔐\n');
    
    const response = await prompts({
      type: 'number',
      name: 'count',
      message: 'How many wallets do you want to generate?',
      validate: value => value > 0 ? true : 'Please enter a number greater than 0'
    });

    if (!response.count) {
      console.error('Operation cancelled');
      process.exit(1);
    }

    const count = response.count;
    printWelcomeMessage(count);
    
    try {
      await generateWallets(count, options.format, options.output);
      printCompletionMessage(count, options.output);
    } catch (error) {
      console.error(`Error generating wallets: ${error.message}`);
      process.exit(1);
    }
  });

// Default to generate command if no command specified
if (process.argv.length <= 2) {
  process.argv.push('generate');
}

program.parse(process.argv);