import React, { useState } from 'react';

const BibInput = ({ onObjectReceived }) => {

    const [inputValue, setInputValue] = useState(12);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    
    const handleButtonClick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://my4.raceresult.com/192607/RRPublish/data/list?key=9d484a9a9259ff0ae1a4a8570861bc3b&fav=&listname=Online%7CLap%20Details&page=live&contest=0&r=bib2&bib=' + inputValue);
        xhr.onload = function () {
          if (xhr.status === 200) {
            onObjectReceived(JSON.parse(xhr.responseText));

          }
        };
        xhr.send();

        
        // if (data != null) {
        //   console.log(data.data);
        // }
    };


    return (
        <div>
            <input onChange={handleInputChange} value={inputValue} type="number"></input>
            <button onClick={handleButtonClick}>Get Data From Bib Number</button>
        </div>
    );
};

export default BibInput;