const config = {
  limit: 10,
  page: process.env.SKIP || 1,
  dbURI: process.env.MONGO_URL,
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN ,
  jwt_secret: process.env.JWT_SECRET ,
};

module.exports = config;
