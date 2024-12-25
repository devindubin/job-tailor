import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
export default {
  mode: "production",
  entry: {
    react: "./src/index.jsx",
    serviceWorker: "./service-workers/service-workers.js",
    contentScript: "./content/content-script.js",
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("./public/manifest.json"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
};
