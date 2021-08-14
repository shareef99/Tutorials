module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_API"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
