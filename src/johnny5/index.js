var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
let mapa = require('./dijkstra')

// var sp = new VirtualSerialPort({
//   host: '192.168.1.103'
// });

var sp = new VirtualSerialPort({
  host: 'localhost',
  type: 'udp4',
  port: 41234
});

// console.log('IO Ready');

var io = new firmata.Board(sp);
io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    // teste para conectivade da placa
    board.on('ready', function(){
        console.log('five ready');
        var led = new five.Led(13);
        led.blink();
    });
});

var wifi = new firmata.Board(sp);

// var wifi = new five.Sensor({
//   pin: "A0", 
//   freq: 250, 
//   threshold: 5
// });


wifi.once("ready", function() {

  wifi.on("change", function() {
    mapa();
  });
});

