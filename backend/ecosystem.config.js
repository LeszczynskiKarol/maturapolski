// backend/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "maturapolski-backend",
      script: "./dist/index.js",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      error_file: "/var/log/maturapolski/error.log",
      out_file: "/var/log/maturapolski/out.log",
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
