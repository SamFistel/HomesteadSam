import React from 'react';

const Stats = (props) => {
    // Access the data passed from the parent component using props
    const laps = props.data;
    var stats = [];
    var speed;
    if (laps != null) {
        // console.log(props.data);
        stats = [];
        laps.forEach(element => {
            var stat = [element[1], element[2], element[3]];
            stats.push(stat);
        });
        speed = stats[0][2];
        console.log(stats);
    }

    return (
        <div>
            {stats ? <div>{JSON.stringify(stats)}</div> : <div></div>}
            {/* {laps ? <div>{JSON.stringify(laps)}</div> : <div>No Data Yet </div>} */}
        </div>
    );
    
};

export default Stats;