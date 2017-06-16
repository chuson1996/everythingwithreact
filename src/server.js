import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import App from './containers/App/App';
import Html from './templates/Html';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use((req, res) => {
  if (process.env.NODE_ENV === 'development') {
    global.webpack_isomorphic_tools.refresh();
  }

  const assets = global.webpack_isomorphic_tools.assets();
  // console.log(assets);
  
  const component = (
    <StaticRouter
      location={req.url}
      context={{}}
    >
      <App/>
    </StaticRouter>
  );

  res.send(ReactDOMServer.renderToString(
    <Html component={component} assets={assets}/>
  ));
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
