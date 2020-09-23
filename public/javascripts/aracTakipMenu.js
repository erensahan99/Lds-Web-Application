
var user = document.getElementById("user").value;
var vehicles = [];

function countConnections(){
    try{
        var buttons = document.getElementsByClassName('btn');
        for (const button in buttons) {
                if (buttons.hasOwnProperty(button)) {
                    const element = buttons[button];
                    if (element.classList.contains('btn-success')){
                        element.classList.remove('btn-success')
                        element.classList.add('btn-danger')
                    }
            }
        }
        
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
        if(message.destinationName == 'connection/vehicle/online'){
            if(!vehicles.includes(message.payloadString))
                vehicles.push(message.payloadString)
            vehicles.forEach(vehicle=>{
                document.getElementById(vehicle).classList.add('btn-success');
                document.getElementById(vehicle).classList.remove('btn-danger');
            })
        }    
    }

}

window.onload = function () {
    startConnect();
}