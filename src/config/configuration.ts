export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL!,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!
  }
});
