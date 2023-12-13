import './App.css';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputBib />
        <GetData />
      </header>
    </div>
  );
}

function InputBib() {
  const [val, setVal] = useState(12);
  const change = event => {
    setVal(event.target.value)
    this.bib = val
    console.log(this.bib)
  }
  return (
    <input onChange={change} value={val} type="number"></input>
    
  )
}

function GetData() {
  const [data, setData] = useState(null);

  function handleClick() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://my4.raceresult.com/192607/RRPublish/data/list?key=9d484a9a9259ff0ae1a4a8570861bc3b&fav=&listname=Online%7CLap%20Details&page=live&contest=0&r=bib2&bib=12');
    xhr.onload = function () {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
    if (data != null) {
      console.log(data.data);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Get Data</button>
      {data ? <div>{JSON.stringify(data)}</div> : <div>No Data Yet </div>}
    </div>
  )
    ;
}

export default App;
