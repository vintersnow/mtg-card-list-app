module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/mtg-card-list-app/" : "/",
  pages: {
    index: {
      entry: 'src/main.ts',
      title: "MtG Cards",
    }
  }
};
