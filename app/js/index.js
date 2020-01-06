import Transport from "./transport/index.js";
import RhythmGenerator from './RhythmGenerator';

const ctx = new AudioContext();
const debug = true;

window.transport = new Transport(80);
transport.start(onTransportTick);
const probabilities = RhythmGenerator.run();

const beatCounter = document.querySelector('h1');

function onTransportTick() {
    const currentBeat = transport.beatCount;

    if(debug) {
        const osc = ctx.createOscillator();

        // Transport ticks along at 16th notes
        if(currentBeat % 16 === 0) { 
            // first note
            osc.frequency.value = 880 
        } else if(currentBeat % 4 === 0) {
            // quarter notes
            osc.frequency.value = 440;
        } else {
            // other notes
            osc.frequency.value = 220;
        }

        osc.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.075);
    }

    // if(!!probabilities[currentBeat]) {
    //     const osc = ctx.createOscillator();
    //     osc.frequency.value = 880;
    //     osc.connect(ctx.destination);
    //     osc.start(ctx.currentTime);
    //     osc.stop(ctx.currentTime + 0.05);
    // }

    beatCounter.innerHTML = `Current beat: ${currentBeat}`;
}
