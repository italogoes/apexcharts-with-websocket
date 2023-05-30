import { useEffect, useState } from 'react';
import Chart from './Chart';
import Candle from './Candle';
import {getCandles} from './DataService'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import './App.css';

function App() {

  const [symbol, setSymbol] = useState('BTCUSDT')
  const [interval, setInterval] = useState('1m')
  const [data, setData] = useState([])

  useEffect(() => {
    getCandles(symbol, interval)
      .then(data => setData(data))
      .catch(err => alert(err.response ? err.response.data : err.message))
  },[symbol, interval])

  const {lastJsonMessage} = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`, {
    onOpen: () => console.log('Conctado com o binance'),
    onError: (err) => console.log(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    onMessage: () => {
      if(lastJsonMessage){
        const newCandle = new Candle(lastJsonMessage.k.t, lastJsonMessage.k.o, lastJsonMessage.k.h, lastJsonMessage.k.l, lastJsonMessage.k.c)
        const newData = [...data]

        if(lastJsonMessage.k.x === false){
          newData[newData.length - 1] = newCandle
        }
        else {
          newData.splice(0, 1)
          newData.push(newCandle)
        }
        setData(newData)
      }
    }
  })

  function onSymbolChange(e){
    setSymbol(e.target.value)
  }

  function onIntervalChange(e){
    setInterval(e.target.value)
  }

  return (
    <div>
      <select onChange={onSymbolChange}>
        <option>BTCUSDT</option>
        <option>ETHUSDT</option>
      </select>

      <select onChange={onIntervalChange}>
        <option>1m</option>
        <option>1d</option>
      </select>
      <Chart data={data}/>
    </div>
  );
}

export default App;
