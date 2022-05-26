module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/leads/1",
        permanent: true,
      },
    ];
  },
};
