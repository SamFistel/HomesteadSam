import './App.css';
import React, { useState } from 'react';
import BibInput from './BibInput';
import Stats from './Stats'
import LineChart from './LineChart';

function App() {
  const [receivedObject, setReceivedObject] = useState(null);

  const handleObjectFromChild = (object) => {
    setReceivedObject(object.data);

  };

  return (
    <div className="App">
      <header className="App-header">
        <BibInput onObjectReceived={handleObjectFromChild} />
        <Stats data={receivedObject} />
        <LineChart />
      </header>
    </div>


  )
}




export default App;
