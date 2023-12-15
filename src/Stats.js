import React from 'react';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';


const Stats = (props) => {
    // Access the data passed from the parent component using props
    const laps = props.data;
    const options = {
        scales: {
            y: {
                // beginAtZero: true,
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
    var stats;
    var tempLabels = [];
    var tempData = [];


    if (laps != null) {
        stats = [];
        laps.forEach(element => {
            //Lap Number, Total Time, Lap Time, Lap Seconds, Lap Speed
            var stat = [element[1], element[2], element[3], timeStringToSeconds(element[3]), calculateMPH(1.38, timeStringToSeconds(element[3]))];
            stats.push(stat);
        });


        if (stats != null) {
            stats.forEach(element => {
                tempLabels.push(parseInt(element[0]))
                tempData.push(element[4])
            });
            console.log(tempLabels)
            console.log(tempData)


            data = {
                labels: tempLabels,
                datasets: [
                    {
                        label: 'Speed Vs Laps',
                        data: tempData,
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 2,
                    },
                ],
            };
        }
    }
    return (
        <div id = "graph">
            {/* {stats ? <div>{JSON.stringify(stats)}</div> : <div> No Data yet</div>} */}
            <Line data={data} options={options}/>
        </div>
    );



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

    function calculateMPH(distanceInMiles, timeInSeconds) {
        // Convert time from seconds to hours
        const timeInHours = timeInSeconds / 3600;

        // Calculate miles per hour
        const mph = parseFloat((distanceInMiles / timeInHours).toFixed(2));

        return mph;
    }


};

export default Stats;