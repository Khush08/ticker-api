# Tickers API

### These is an API for getting tickers from the National Stock Exchange(NSE) and Bombay Stock Exchange(BSE).



#### To get tickers data for NSE use the following endpoint

```js 
/tickers/nse
```

#### To get tickers data for BSE use the following endpoint

```js
/tickers/bse
```


#### Return type of the endpoints for a valid response

``` ts
{
    data: {
         name: string,
         exchange: string,
         instrument_type: string,
         ticker: string,
         short_name: string,
    }[]
}
```

#### In order to run the project locally follow these steps

1. Create a ```.env``` file, copy the contents of ```env.template``` to it
2. Run ```npm install``` in terminal to install dependencies
3. Run ```npm run dev``` to start the node server
4. API endpoints should be available at these base url - ```http://localhost:3000/```





