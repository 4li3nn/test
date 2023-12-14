import express from 'express'
import * as ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import App from '../client/components/App.jsx'
import { StaticRouter } from 'react-router-dom/server'
import React from 'react';


const app = express()
app.use('/static', express.static(__dirname))
// const PORT = process.env.PORT
const PORT = 3001

app.get('*', async (req, res) => {
  const indexHtml = await createReactApp(req.url)
  res.status(200).send(indexHtml)
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

const createReactApp = async (location) => {
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  )
  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8')
  const reactHtml = html.replace(
    '<div id="root"></div>',
    `<div id="root">${reactApp}</div>`
  )
  return reactHtml
}
