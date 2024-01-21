const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/output.txt';
const promptText = 'Enter text (Ctrl+C or type "exit" to quit): ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: promptText,
});

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const handleInput = (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Farewell! Exiting...');
    process.exit();
  }

  writeStream.write(input + '\n');
  rl.prompt();
};

rl.on('line', handleInput);

rl.on('close', () => {
  console.log('Farewell! Exiting...');
  process.exit();
});

rl.prompt();