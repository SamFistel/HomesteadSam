import './App.css';
import React, { useState } from 'react';
import BibInput from './BibInput';
import Stats from './Stats'

function App() {
  const [receivedObject, setReceivedObject] = useState(null);

  const handleObjectFromChild = (object) => {
    setReceivedObject(object);

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homestead 24 2022-2025 Stats & Grapher Sam Fistel Edition</h1>
        <BibInput onObjectReceived={handleObjectFromChild} />
        <Stats data={receivedObject} />
      </header>
    </div>


  )
}




export default App;
