module.exports = ({ env }) => ({
  host: env('HOST', '192.168.1.110'),
  port: env.int('PORT', 1337),
  url: env('URL', 'http://localhost:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '7c3c6f490c5f7ae13ba862d1bb9ba143'),
    },
    host: env('ADMINHOST', '192.168.1.110'),
    port: env.int('ADMINPORT', 1338),
  },
  cron: {
    enabled: true
  },
});
