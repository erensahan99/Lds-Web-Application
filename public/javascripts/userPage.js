// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

$(function () {

    'use strict';

    // Start chart
    var chart = document.getElementById('myChart');
    Chart.defaults.global.animation.duration = 2000; // Animation duration
    Chart.defaults.global.title.display = false; // Remove title
    Chart.defaults.global.title.text = "Chart"; // Title
    Chart.defaults.global.title.position = 'bottom'; // Title position
    Chart.defaults.global.defaultFontColor = '#999'; // Font color
    Chart.defaults.global.defaultFontSize = 10; // Font size for every label

    // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
    Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
    Chart.defaults.global.legend.labels.padding = 0;
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
    Chart.defaults.global.legend.display = false;

    var myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", 'Jul'],
            datasets: [{
                label: "Lost",
                fill: false,
                lineTension: 0,
                data: [45, 25, 40, 20, 45, 20],
                pointBorderColor: "#4bc0c0",
                borderColor: '#4bc0c0',
                borderWidth: 2,
                showLine: true,
            }, {
                label: "Succes",
                fill: false,
                lineTension: 0,
                startAngle: 2,
                data: [20, 40, 20, 45, 25, 60],
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#ff6384",
                borderColor: '#ff6384',
                borderWidth: 2,
                showLine: true,
            }]
        },
    });

    //  Chart ( 2 )
    var Chart2 = document.getElementById('myChart2').getContext('2d');
    var chart = new Chart(Chart2, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", 'test', 'test', 'test', 'test'],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 79, 116)',
                borderWidth: 2,
                pointBorderColor: false,
                data: [5, 10, 5, 8, 20, 30, 20, 10],
                fill: false,
                lineTension: .4,
            }, {
                label: "Month",
                fill: false,
                lineTension: .4,
                startAngle: 2,
                data: [20, 14, 20, 25, 10, 15, 25, 10],
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#4bc0c0",
                borderColor: '#4bc0c0',
                borderWidth: 2,
                showLine: true,
            }, {
                label: "Month",
                fill: false,
                lineTension: .4,
                startAngle: 2,
                data: [40, 20, 5, 10, 30, 15, 15, 10],
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#ffcd56",
                borderColor: '#ffcd56',
                borderWidth: 2,
                showLine: true,
            }]
        },

        // Configuration options
        options: {
            title: {
                display: false
            }
        }
    });



    $('#map').vectorMap({
        map: 'turkey_1_mill_en',
        selector: "#map",
        zoomButtons: true,
        scale: 1
    });

    window.addEventListener('resize', () => {
        jsvmap.updateSize()
    })
})