module.exports = {
  '{apps,libs}/**/*.{ts,js,html,json,scss,css,md}': [
    'pnpm lint --uncommitted --fix true',
  ],
  '*.{ts,js,html,json,scss,css,md,yaml,yml}': [
    'pnpm format --base=main --head=HEAD',
  ],
};
