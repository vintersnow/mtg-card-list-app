# card_searcher

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Set up data

1. download all card data from [MTGJSON](https://mtgjson.com/downloads/all-files/#atomiccards)
2. create dump data

```
python tools/extract_data.py AtomicCards.json > public/data/20220502.json
```

3. change env file
