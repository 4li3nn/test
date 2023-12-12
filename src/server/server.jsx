import express from "express";
import * as ReactDOMServer from "react-dom/server";
import fs from "fs";
import App from "../client/components/App.jsx";

const app = express();
app.use("/static", express.static(__dirname));
const PORT = process.env.PORT;

app.get("/", async (req, res) => {
  const indexHtml = await createReactApp();
  res.status(200).send(indexHtml);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const createReactApp = async () => {
  const reactApp = ReactDOMServer.renderToString(<App />);
  const html = await fs.promises.readFile(`${__dirname}/index.html`, "utf-8");
  const reactHtml = html.replace(
    '<div id="root"></div>',
    `<div id="root">${reactApp}</div>`
  );
  return reactHtml;
};
