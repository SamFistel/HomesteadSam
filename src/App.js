import './App.css';
import React, { useState } from 'react';
import BibInput from './BibInput';
import Stats from './Stats'

function App() {
  const [receivedObject, setReceivedObject] = useState(null);

  const handleObjectFromChild = (object) => {
    setReceivedObject(object.data);

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homestead 24 2024 tracker</h1>
        <BibInput onObjectReceived={handleObjectFromChild} />
        <Stats data={receivedObject} />
      </header>
    </div>


  )
}




export default App;
