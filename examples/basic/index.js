const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

const app = express();
const port = process.env.PORT || 8080;

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'de'],
    saveMissing: true
  });

app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
  res.send(req.t('home.title'));
});

app.listen(port, (err) => {
  console.log(`Server is listening on port ${port}`);
});
