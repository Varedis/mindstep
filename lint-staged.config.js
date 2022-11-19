export default {
  "*.{ts,tsx,js,jsx}": ["npm run lint", "npm run test"],
  "*.{ts,tsx,js,jsx,css,json,yaml,md}": "prettier --write",
};
