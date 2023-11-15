import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollors, setDollors] = useState();
  const [showResult, setShowResult] = useState(false);
  const onChange = (e) => {
    setDollors(e.target.value);
  };
  const onClick = (e) => {
    setShowResult(true);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>코인.. 얼마나 살 수 있을까..?</h1>
      <h2>구매 할 수 있는 코인은.. {coins.length}개 ! </h2>
      {loading ? <strong>Loading...</strong> : null}
      <form>
        <span>현재 보유하고 있는 달러 : </span>
        <input type="text" value={dollors} onChange={onChange}></input>
        <button type="button" onClick={onClick}>
          결과보기 !{" "}
        </button>
      </form>
      <hr />
      {dollors > 0 && showResult ? (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name}({coin.symbol}) : {dollors / coin.quotes.USD.price} 개
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}

export default App;
