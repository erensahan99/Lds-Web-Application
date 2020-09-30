// Other important pens.

// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

var user = document.getElementById("user").value;
var clients = [],
    admins = [],
    vehicles = [];
var newClients = [],
    newAdmins = [],
    newVehicles = [];

function countConnections() {
    try {
        $('#ulAdmin').empty();
        $('#ulClient').empty();

        admins.forEach(admin => {
            msg = JSON.parse(admin);
            $('#ulAdmin').append('<li class="admin"><div class="info"><h3>' + msg.name + ' ' + msg.lastname + '</h3><p>' + msg.username + '</p></div></li>');    
        });
        
        clients.forEach(client => {
            msg = JSON.parse(client);
            $('#ulClient').append('<li class="admin"><div class="info"><h3>' + msg.name + ' ' + msg.lastname + '</h3><p>' + msg.username + '</p></div></li>');
        });

        $('#onlineAdmin').text(admins.length)
        $('#onlineClient').text(clients.length)
        $('#onlineVehicle').text(vehicles.length)

        clients = Array.from(newClients);
        admins = Array.from(newAdmins);
        vehicles = Array.from(newVehicles);

        newClients.length = 0
        newAdmins.length = 0
        newVehicles.length = 0

        message = new Paho.MQTT.Message('');
        message.qos = 2;
        message.destinationName = 'connection/admin';
        client.send(message);
        message.destinationName = 'connection/client';
        client.send(message);
        message.destinationName = 'connection/vehicle';
        client.send(message);
    } catch (err) {
        console.log(err)
    }
}

// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "AdminID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = 'postman.cloudmqtt.com';
    port = '33787';
    username = 'LodosAdmin';
    password = '3548788';

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
    client.subscribe('connection/admin/online');
    client.subscribe('connection/client/online');
    client.subscribe('connection/vehicle/online');
    client.subscribe('connection/admin');
    countConnections();
    setInterval(countConnections, 5000);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {

}

// Called when a message arrives
function onMessageArrived(message) {

    if (message.destinationName == 'connection/admin') {
        message = new Paho.MQTT.Message(user);
        message.destinationName = 'connection/admin/online';
        message.qos = 0;
        client.send(message);
    } else {
        if (message.destinationName == 'connection/admin/online') {
            if (!newAdmins.includes(message.payloadString)) {
                newAdmins.push(message.payloadString)
            }
        } else if (message.destinationName == 'connection/client/online') {
            if (!newClients.includes(message.payloadString)) {
                newClients.push(message.payloadString)
            }
        } else if (message.destinationName == 'connection/vehicle/online') {
            if (!newVehicles.includes(message.payloadString)) {
                newVehicles.push(message.payloadString)
            }
        }
    }

}



var showLastLocs = function () {
    var lastLocs = JSON.parse(document.getElementById('lastLocs').value);

    var locs = []

    lastLocs.forEach(lastLoc => {
        var loc = lastLoc.loc.split(',');
        locs.push({
            lat: loc[0],
            lng: loc[1]
        })
    });

    /*
    locs.push({lat:40.9601817, lng:29.1233131})
    locs.push({lat:36.77872, lng:31.4414554})
    locs.push({lat:39.9477068, lng:32.8153198})
    */

    locs.forEach(loc => {
        map.addObject(new H.map.Marker(loc));
    });

}


// map codes
var platform = new H.service.Platform({
    apikey: '4oMgmQA4vo50vCUbVR_bAUvVQWhKzt879J3Gn45awJM'
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
    defaultLayers.raster.satellite.map, {
        center: {
            lat: 39.0578771,
            lng: 34.4999527
        },
        zoom: 6.2,
        pixelRatio: window.devicePixelRatio || 1
    });

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);



window.onload = function () {
    map.getViewPort().resize();
    showLastLocs();
    startConnect();
}