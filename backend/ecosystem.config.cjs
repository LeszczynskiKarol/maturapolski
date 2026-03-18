module.exports = {
  apps: [
    {
      name: "maturapolski-backend",
      script: "dist/index.js",
      exec_mode: "cluster",
      instances: 1,
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};
