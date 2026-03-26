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
const commandsDir = path.join(claudeDir, 'commands', 'nvc');
const assetsDir = path.join(claudeDir, 'nvc-flow-assets');
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
  if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });
  // Entry point + tasks direct in commands/nvc/ → /nvc:brainstorm etc.
  fs.copyFileSync(sourceDir, path.join(commandsDir, 'nvc-flow.md'));
  copyRecursive(tasksSource, commandsDir);
  // Frameworks, templates, checklists outside commands/ → not exposed as slash commands
  copyRecursive(frameworksSource,  path.join(assetsDir, 'frameworks'));
  copyRecursive(templatesSource,   path.join(assetsDir, 'templates'));
  copyRecursive(checklistsSource,  path.join(assetsDir, 'checklists'));
  console.log(`Skill installed to: ${commandsDir}`);
  console.log(`Assets installed to: ${assetsDir}`);
  console.log('');
  console.log('NeuralVaultFlow installed successfully.');
  console.log('Open Claude Code and type /nvc:brainstorm to start.');
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
