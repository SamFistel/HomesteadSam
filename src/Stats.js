import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const Stats = (props) => {
    var stats = [];
    var statsSelected = [];
    var tempLabels = [];
    var tempData = [];
    var totalAverageSpeed = 0;
    var averageTime = { hours: 0, minutes: 0, seconds: 0 };
    var totalDistance = 0;
    var selectedAverageSpeed = 0;
    var selectedAverageTime = { hours: 0, minutes: 0, seconds: 0 };
    var selectedTotalDistance = 0;
    var timeRemaining = { hours: 0, minutes: 0, seconds: 0 };
    var lastLapNum = 0;


    // Access the data passed from the parent component using props
    const laps = props.data;
    // State to store the selected range
    const [selectedRange, setSelectedRange] = useState([0, 9999]);

    // Event handler to update the selected range
    const handleSliderChange = (newRange) => {
        setSelectedRange(newRange);
    };
    //goals
    const [miles, setMiles] = useState(0);
    const [milesPerLap, setMilesPerLap] = useState(1.38);
    const [goalLaps, setLaps] = useState(0);

    const calculateLaps = () => {
        setLaps(Math.ceil(miles / milesPerLap));
    };

    const [selectedOption, setSelectedOption] = useState("option1");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === "option1") {
            setMilesPerLap(1.38);
        } else {
            setMilesPerLap(1.46);
        }
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false
    };
    var data = {
        labels: [],
        datasets: [
            {
                label: 'Speed Vs Laps',
                data: [],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };


    if (laps != null) {
        stats = [];
        laps.forEach(element => {
            //Lap Number, Total Time, Lap Time, Lap Seconds, Lap Speed
            var stat = [element[1], element[2], element[3], timeStringToSeconds(element[3]), calculateMPH(milesPerLap, timeStringToSeconds(element[3]))];
            stats.push(stat);
        });


        if (stats != null) {
            if (stats.length > 0) {
                lastLapNum = stats[stats.length - 1][0];
                var remainingSeconds = 86400 - timeStringToSeconds(stats[stats.length - 1][1])
                timeRemaining = convertSecondsToMinutes(remainingSeconds, 1);
            }

            if (selectedRange[1] !== 9999) {
                for (let i = selectedRange[0], j = 0; i <= selectedRange[1]; i++, j++) {
                    statsSelected[j] = stats[i - 1];
                }
                statsSelected.forEach(element => {
                    tempLabels.push(parseInt(element[0]))
                    tempData.push(element[4])
                });
                data = {
                    labels: tempLabels,
                    datasets: [
                        {
                            label: 'Speed Vs Laps',
                            data: tempData,
                            fill: true,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                    ],
                };
            } else {
                //sliders not changed yet
                stats.forEach(element => {
                    tempLabels.push(parseInt(element[0]))
                    tempData.push(element[4])
                });
                data = {
                    labels: tempLabels,
                    datasets: [
                        {
                            label: 'Speed Vs Laps',
                            data: tempData,
                            fill: true,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                    ],
                };
            }

        }
    }
    //stuff to update total info
    //NOTE: Calculations are based on last entry in the stats datastructure
    if (stats != null && stats.length > 0) {
        //totalDistance = last lap number * milesPerLap
        totalDistance = parseFloat(parseInt(stats[stats.length - 1][0]) * milesPerLap).toFixed(2);
        //time = last lap total time
        var time = parseInt(timeStringToSeconds(stats[stats.length - 1][1]))
        totalAverageSpeed = calculateMPH(totalDistance, time);
        averageTime = convertSecondsToMinutes(timeStringToSeconds(stats[stats.length - 1][1]), stats[stats.length - 1][0]);
    }
    if (statsSelected != null && statsSelected.length > 0) {
        let i = 0;
        let selectedLapSeconds = 0;
        statsSelected.forEach(element => {
            i++;
            selectedLapSeconds += element[3];

        });
        if (i !== 0) {
            selectedAverageTime = convertSecondsToMinutes(selectedLapSeconds, i);
        }
        selectedTotalDistance = (i * milesPerLap).toFixed(2)
        selectedAverageSpeed = calculateMPH(selectedTotalDistance, selectedLapSeconds);

    }
    return (
        <div id="graph">
            <div>
                <label>
                    <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === "option1"}
                        onChange={handleOptionChange}
                    />
                    Inline Speed Skating
                </label>

                <label>
                    <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === "option2"}
                        onChange={handleOptionChange}
                    />
                    Skateboard
                </label>

            </div>
            <table style={{ width: '80%', margin: 'auto' }}>
                <tr>
                    <td>
                        <p>Total Average speed: {totalAverageSpeed} </p>
                    </td>
                    <td>
                        <p>Total Average Lap Time (HH:MM:SS): {averageTime.hours}:{averageTime.minutes}:{averageTime.seconds}</p>
                    </td>
                    <td>
                        <p>Total Milage : {totalDistance}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Selected Average speed: {selectedAverageSpeed} </p>
                    </td>
                    <td>
                        <p>Selected Average Lap Time (HH:MM:SS): {selectedAverageTime.hours}:{selectedAverageTime.minutes}:{selectedAverageTime.seconds}</p>
                    </td>
                    <td>
                        <p>Selected Milage : {selectedTotalDistance}</p>
                    </td>
                </tr>
            </table>
            <div style={{ width: '80%', paddingTop: '40px', margin: 'auto' }}>
                {/* Range slider with two handles */}
                <Slider disabled={stats.length < 1}
                    range
                    min={1}
                    max={stats.length}
                    step={1}
                    defaultValue={selectedRange}
                    onChange={handleSliderChange}
                />

                {/* Display the selected range */}
                <p hidden={selectedRange[1] === 9999}>
                    Selected Range: {selectedRange[0]} to {selectedRange[1]}
                </p>
            </div>

            {/* {stats ? <div>{JSON.stringify(stats)}</div> : <div> No Data yet</div>} */}
            <Line id="graph2" data={data} options={options} />

            <div>
                <h2>Mile to Laps Calculator</h2>
                <label htmlFor="miles">Enter miles: </label>
                <input
                    type="number"
                    id="miles"
                    value={miles}
                    onChange={(e) => setMiles(parseFloat(e.target.value))}
                />
                <button onClick={calculateLaps}>Calculate Laps</button>
                {goalLaps !== 0 && <p>Number of laps needed: {goalLaps}</p>}
                {lastLapNum !== 0 && <p>Number of laps skated: {lastLapNum}</p>}
                {lastLapNum !== 0 && goalLaps !== 0 && <p>Number of laps Remaining: {goalLaps - lastLapNum}</p>}

                <p>Remaining Time From Last Lap (HH:MM:SS): {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}</p>

            </div>
        </div>
    );


    //function that converts the time input into seconds
    function timeStringToSeconds(timeString) {
        const timeComponents = timeString.split(':');

        let totalSeconds = 0;

        if (timeComponents.length === 3) {
            // HH:MM:SS.SS format
            const [hours, minutes, secondsWithMillis] = timeComponents;
            const [seconds, milliseconds] = secondsWithMillis.split('.');

            totalSeconds =
                parseInt(hours, 10) * 3600 +
                parseInt(minutes, 10) * 60 +
                parseInt(seconds, 10);

            totalSeconds += parseFloat(`0.${milliseconds || 0}`);
        } else if (timeComponents.length === 2) {
            // MM:SS.SS format
            const [minutes, secondsWithMillis] = timeComponents;
            const [seconds, milliseconds] = secondsWithMillis.split('.');

            totalSeconds =
                parseInt(minutes, 10) * 60 +
                parseInt(seconds, 10);

            totalSeconds += parseFloat(`0.${milliseconds || 0}`);
        } else {
            console.error('Invalid time format');
        }

        return totalSeconds;
    }

    //Function to calculate miles per hour from distance and seconds.
    function calculateMPH(distanceInMiles, timeInSeconds) {
        // Convert time from seconds to hours
        const timeInHours = timeInSeconds / 3600;

        // Calculate miles per hour
        const mph = parseFloat((distanceInMiles / timeInHours).toFixed(2));

        return mph;
    }
    //Function to convert total seconds to minutes and seconds
    function convertSecondsToMinutes(totalSeconds, divisor) {
        // Calculate minutes and seconds
        const hours = Math.floor(totalSeconds / divisor / 3600);
        const minutes = Math.floor(((totalSeconds / divisor) % 3600) / 60);
        const seconds = Math.floor((totalSeconds / divisor) % 60);

        // Return the result as an object
        return {
            hours,
            minutes,
            seconds,
        };
    };


};

export default Stats;