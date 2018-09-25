import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cors from 'cors';
import React from 'react';
import bodyParser from 'body-parser';
import { renderToString } from "react-dom/server";
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from './components/App';
import createStore from './store';
import routes from './routes';
import { getCurrentPage, initializeSession } from './actions/index';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({origin: 'http://dev.contenta.test'}));
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store = createStore();
store.dispatch(initializeSession());

app.get('/*', (req, res) => {
    const context = {};

    const dataRequirements = 
        routes.filter(route => matchPath(req.url, route.path))
                .map(route => route.component)
                .filter(comp => comp.serverFetch)
                .map(comp => store.dispatch(comp.serverFetch()));
  
    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
        
      store.dispatch(getCurrentPage(req.url));
  
      const html = renderToString(jsx);
      const reduxState = store.getState();
  
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(htmlTemplate(html, reduxState));
    })
});

function htmlTemplate(html, preloadedState) {
    return(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR - BASE</title>
        </head>

        <body>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
            </script>
            <script src="./client_bundle.js"></script>
        </body>
        </html>
    `);
}  

app.listen(port, () => {
    console.log(`Running on Port ${port}`);
});