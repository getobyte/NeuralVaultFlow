#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const isGlobal = args.includes('--global') || !isLocal;

const customConfigDir = (() => {
  const idx = args.indexOf('--config-dir');
  return idx !== -1 ? args[idx + 1] : null;
})();

const sourceDir = path.join(__dirname, '..', 'nvc-flow.md');
const tasksSource = path.join(__dirname, '..', 'tasks');
const frameworksSource = path.join(__dirname, '..', 'frameworks');
const templatesSource = path.join(__dirname, '..', 'templates');
const checklistsSource = path.join(__dirname, '..', 'checklists');

let claudeDir;
if (customConfigDir) {
  claudeDir = customConfigDir;
} else if (isLocal) {
  claudeDir = path.join(process.cwd(), '.claude');
} else {
  claudeDir = path.join(os.homedir(), '.claude');
}

const commandsDir = path.join(claudeDir, 'commands', 'nvc-flow');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Installing NeuralVaultFlow...');
console.log(`Location: ${isLocal ? 'local (.claude/)' : 'global (~/.claude/)'}`);
console.log('');

try {
  // Create commands directory
  if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });

  // Copy entry point
  fs.copyFileSync(sourceDir, path.join(commandsDir, 'nvc-flow.md'));

  // Copy auxiliary directories
  copyRecursive(tasksSource, path.join(commandsDir, 'tasks'));
  copyRecursive(frameworksSource, path.join(commandsDir, 'frameworks'));
  copyRecursive(templatesSource, path.join(commandsDir, 'templates'));
  copyRecursive(checklistsSource, path.join(commandsDir, 'checklists'));

  console.log(`Skill installed to: ${commandsDir}`);
  console.log('');
  console.log('NeuralVaultFlow installed successfully.');
  console.log('Open Claude Code and type /nvc:flow to start.');
  console.log('');
  console.log('Commands:');
  console.log('  /nvc:brainstorm  — Structured requirements gathering');
  console.log('  /nvc:plan        — Build executable plan with AC');
  console.log('  /nvc:execute     — Execute plan step by step');
  console.log('  /nvc:audit       — Static code analysis');
  console.log('  /nvc:review      — Opinionated code review');
  console.log('  /nvc:seo         — Technical SEO audit');
  console.log('  /nvc:geo         — AI search visibility audit');
  console.log('  /nvc:perf        — Performance audit');
  console.log('  /nvc:security    — Security audit');
  console.log('  /nvc:deploy      — Pre-deployment check');
} catch (err) {
  console.error('Installation failed:', err.message);
  process.exit(1);
}
