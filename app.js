const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const historyApiFallback = require('connect-history-api-fallback');


const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = parseInt(process.env.PORT, 10) || 3000;

const isDev = process.env.NODE_ENV !== 'production';

require('./routes')(app);



if (isDev) {
    const compiler = webpack(webpackConfig);
  
    app.use(historyApiFallback({
      verbose: false
    }));

  
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, './client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));
  
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, './dist')));
  } else {
    app.use(express.static(path.resolve(__dirname, './dist')));
    app.get('*', function (req, res) {
      res.sendFile(path.resolve(__dirname, './dist/index.html'));
      res.end();
    });
  }




// app.set('view engine', 'ejs');
// app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
