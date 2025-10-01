
  export const config = {
    port: parseInt(process.env.PORT || "4000", 10),
    mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/donuts_db",
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
};