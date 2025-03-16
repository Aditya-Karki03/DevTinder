module.exports = [
  {
    name: "devamor-apis",
    script: "src/index.ts",
    interpreter: "node",
    interpreter_args: "--loader ts-node/esm",
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
    },
    env_development: {
      NODE_ENV: "development",
    },
  },
];
