//var coords = {lat:40.9014805, lng:31.1656715};
var defaultCoords = {lat:39.0578771, lng:34.4999527};
var coords = {};

var user = document.getElementById("user").value;
var chart;
var lastLoc = {}

$(document).ready(function () {
    // Start chart
    chart = document.getElementById('myChart');
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

    var temp1 = []
    var temp2 = []
    var temp3 = []
    var temp4 = []
    var time = []

    data = JSON.parse(document.getElementById("data").value);
    data.forEach(d => {
        if (d.dataName == "sicaklik1") {
            time.push(d.time)
            temp1.push(d.data)
        } else if (d.dataName == "sicaklik2")
            temp2.push(d.data)
        else if (d.dataName == "sicaklik3")
            temp3.push(d.data)
        else if (d.dataName == "sicaklik4")
            temp4.push(d.data)
            
    });

    //  Chart ( 2 )
    var Chart2 = document.getElementById('myChart2').getContext('2d');
    chart = new Chart(Chart2, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: "Sıcaklık1",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 79, 116)',
                borderWidth: 4,
                pointBorderColor: false,
                pointRadius: 0,
                data: temp1,
                fill: false,
                lineTension: .4,
            }, {
                label: "Sıcaklık2",
                fill: false,
                lineTension: .4,
                startAngle: 2,
                data: temp2,
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#4bc0c0",
                pointRadius: 0,
                borderColor: '#4bc0c0',
                borderWidth: 4,
                showLine: true,
            }, {
                label: "Sıcaklık3",
                fill: false,
                lineTension: .4,
                startAngle: 2,
                data: temp3,
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#ffcd56",
                pointRadius: 0,
                borderColor: '#ffcd56',
                borderWidth: 4,
                showLine: true,
            }, {
                label: "Sıcaklık4",
                fill: false,
                lineTension: .4,
                startAngle: 2,
                data: temp4,
                // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
                backgroundColor: "transparent",
                pointBorderColor: "#bada55",
                pointRadius: 0,
                borderColor: '#bada55',
                borderWidth: 4,
                showLine: true,
            }]
        },

        // Configuration options
        options: {
            title: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 20,
                        suggestedMax:40,
                        min:20
                    }
                }]
            },
            elements: {
                point: {
                    radius: 1
                }
            }
        }
    });

});

// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.onConnectionLost = onConnectionLost;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
        userName: username,
        password: password,
        useSSL: true,
        cleanSession: true
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = document.getElementById("topic").value;

    // Subscribe to the requested topic
    client.subscribe(topic);

    client.subscribe('connection/client');

    message = new Paho.MQTT.Message(user);
    message.destinationName = 'connection/client/online';
    message.qos = 0;
    client.send(message);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {

}

function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255) - 20, Math.floor(b * 255) - 20];
}

function numberToColorHsl(i) {
    var hue = i * 1.2 / 360;
    var rgb = hslToRgb(hue, 1, .5);
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

// Called when a message arrives
function onMessageArrived(message) {
    if(message.destinationName == 'connection/client'){
        message = new Paho.MQTT.Message(user);
        message.destinationName = 'connection/client/online';
        message.qos = 0;
        client.send(message);
    }
    else if(message.destinationName == 'connection/client/online'){}
    else{
        var data = JSON.parse(message.payloadString);
        $('#hizText').text(data.hiz);
        $('#sarjText').text(data.sarj);
        document.getElementById("battery-icon").style.color = numberToColorHsl(data.sarj);
        if (data.sarj >= 95) {
            document.getElementById("battery-icon").classList.add('fa-battery-full');
            document.getElementById("battery-icon").classList.remove('fa-battery-empty');
            document.getElementById("battery-icon").classList.remove('fa-battery-quarter');
            document.getElementById("battery-icon").classList.remove('fa-battery-half');
            document.getElementById("battery-icon").classList.remove('fa-battery-three-quarters');
        } else if (data.sarj >= 75) {
            document.getElementById("battery-icon").classList.add('fa-battery-three-quarters');
            document.getElementById("battery-icon").classList.remove('fa-battery-empty');
            document.getElementById("battery-icon").classList.remove('fa-battery-quarter');
            document.getElementById("battery-icon").classList.remove('fa-battery-half');
            document.getElementById("battery-icon").classList.remove('fa-battery-full');
        } else if (data.sarj >= 50) {
            document.getElementById("battery-icon").classList.add('fa-battery-half');
            document.getElementById("battery-icon").classList.remove('fa-battery-empty');
            document.getElementById("battery-icon").classList.remove('fa-battery-quarter');
            document.getElementById("battery-icon").classList.remove('fa-battery-three-quarters');
            document.getElementById("battery-icon").classList.remove('fa-battery-full');
        } else if (data.sarj > 5) {
            document.getElementById("battery-icon").classList.add('fa-battery-quarter');
            document.getElementById("battery-icon").classList.remove('fa-battery-half');
            document.getElementById("battery-icon").classList.remove('fa-battery-empty');
            document.getElementById("battery-icon").classList.remove('fa-battery-three-quarters');
            document.getElementById("battery-icon").classList.remove('fa-battery-full');
        } else {
            document.getElementById("battery-icon").classList.add('fa-battery-empty');
            document.getElementById("battery-icon").classList.remove('fa-battery-half');
            document.getElementById("battery-icon").classList.remove('fa-battery-quarter');
            document.getElementById("battery-icon").classList.remove('fa-battery-three-quarters');
            document.getElementById("battery-icon").classList.remove('fa-battery-full');
        }

        $('#akimText').text(data.akim + " A");
        $('#sicaklik1Text').text(data.sicaklik1);
        $('#sicaklik2Text').text(data.sicaklik2);
        $('#sicaklik3Text').text(data.sicaklik3);
        $('#sicaklik4Text').text(data.sicaklik4);

        chart.data.labels.push("deneme");
        chart.data.datasets[0].data.push(data.sicaklik1);
        chart.data.datasets[1].data.push(data.sicaklik2);
        chart.data.datasets[2].data.push(data.sicaklik3);
        chart.data.datasets[3].data.push(data.sicaklik4);
        chart.data.datasets[0].data.pop();
        chart.data.datasets[1].data.pop();
        chart.data.datasets[2].data.pop();
        chart.data.datasets[3].data.pop();
        chart.update();

        $('#t1').text(data.bataryaGerilim[0]);
        $('#t2').text(data.bataryaGerilim[1]);
        $('#t3').text(data.bataryaGerilim[2]);
        $('#t4').text(data.bataryaGerilim[3]);
        $('#t5').text(data.bataryaGerilim[4]);
        $('#t6').text(data.bataryaGerilim[5]);
        $('#t7').text(data.bataryaGerilim[6]);
        $('#t8').text(data.bataryaGerilim[7]);
        $('#t9').text(data.bataryaGerilim[8]);
        $('#t10').text(data.bataryaGerilim[9]);
        $('#t11').text(data.bataryaGerilim[10]);
        $('#t12').text(data.bataryaGerilim[11]);
        $('#t13').text(data.bataryaGerilim[12]);
        $('#t14').text(data.bataryaGerilim[13]);

        if(data.gps!='None,None'){
            try{
                var newCoords = data.gps.split(',');
                console.log(newCoords);
                coords.lat=newCoords[0];
                coords.lng=newCoords[1];
                moveMapToLoc(window.map);
            }
            catch(err){
                console.log(err)
            }
        }
    }
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}



var vehicleMarker;

function moveMapToLoc(map){
    map.setCenter(coords);
    map.setZoom(17);
    
    if(vehicleMarker)
        map.removeObject(vehicleMarker);

    vehicleMarker = new H.map.Marker(coords);
    map.addObject(vehicleMarker);
}

function moveMapToLastLoc(map){
    var gps = JSON.parse(document.getElementById("gps").value).data.split(',');
    // console.log(gps);
    lastLoc.lat = gps[0];
    lastLoc.lng = gps[1];
    
    if(gps != ''){
        map.setCenter(lastLoc);
        map.setZoom(17);

        if(vehicleMarker)
        map.removeObject(vehicleMarker);

        vehicleMarker = new H.map.Marker(lastLoc);
        map.addObject(vehicleMarker);
    }
    else{
        map.setCenter(defaultCoords);
        map.setZoom(6.2);
    }    
}
  
   
var platform = new H.service.Platform({
apikey: '4oMgmQA4vo50vCUbVR_bAUvVQWhKzt879J3Gn45awJM'
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
defaultLayers.raster.satellite.map,{
center: {lat:39.0578771, lng:34.4999527},
zoom: 6.2,
pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);


window.onload = function () {
    startConnect();
    moveMapToLastLoc(map);
    map.getViewPort().resize();
}