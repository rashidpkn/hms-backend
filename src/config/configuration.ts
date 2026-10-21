export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  mongodbUri: process.env.MONGODB_URI!,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  },
});
