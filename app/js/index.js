import Transport from "./transport/index.js";

const ctx = new AudioContext();

const transport = new Transport(120);
transport.start();

transport.addListener(function() {
    console.log(this.beatCount);
});
