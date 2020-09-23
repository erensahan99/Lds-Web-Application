// Other important pens.

// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

var user = document.getElementById("user").value;
var clients = [], admins = [], vehicles = [];

function countConnections(){
    try{
        $('#ulAdmin').empty();
        $('#ulClient').empty();
        clients.length = 0
        admins.length = 0
        vehicles.length = 0

        message = new Paho.MQTT.Message('');
        message.qos = 2;
        message.destinationName = 'connection/admin';
        client.send(message);
        message.destinationName = 'connection/client';
        client.send(message);
        message.destinationName = 'connection/vehicle';
        client.send(message);
        }
        catch(err){
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
    setInterval(countConnections,5000);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {

}

// Called when a message arrives
function onMessageArrived(message) {

    if(message.destinationName == 'connection/admin'){
        message = new Paho.MQTT.Message(user);
        message.destinationName = 'connection/admin/online';
        message.qos = 0;
        client.send(message);
    }
    else{
        if(message.destinationName == 'connection/admin/online'){
            if(!admins.includes(message.payloadString))
                admins.push(message.payloadString)
            
                msg = JSON.parse(message.payloadString)
                $('#ulAdmin').append('<li class="admin"><div class="info"><h3>'+ msg.name + ' ' + msg.lastname +'</h3><p>' + msg.username + '</p></div></li>');
        }
        else if(message.destinationName == 'connection/client/online'){
            if(!clients.includes(message.payloadString))
                clients.push(message.payloadString)
                msg = JSON.parse(message.payloadString)
                $('#ulClient').append('<li class="admin"><div class="info"><h3>'+ msg.name + ' ' + msg.lastname +'</h3><p>' + msg.username + '</p></div></li>');
        }
        else if(message.destinationName == 'connection/vehicle/online'){
            if(!vehicles.includes(message.payloadString))
                vehicles.push(message.payloadString)
        }
        $('#onlineAdmin').text(admins.length)
        $('#onlineClient').text(clients.length)
        $('#onlineVehicle').text(vehicles.length)       
    }

}



var showLastLocs = function(){
    var lastLocs = JSON.parse(document.getElementById('lastLocs').value);
    
    var locs = []

    lastLocs.forEach(lastLoc => {
        var loc = lastLoc.loc.split(',');
        locs.push({lat:loc[0], lng:loc[1]})
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
    defaultLayers.raster.satellite.map,{
    center: {lat:39.0578771, lng:34.4999527},
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