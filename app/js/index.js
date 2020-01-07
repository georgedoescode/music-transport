import Transport from "./transport/index.js";
import WeightedRhythmGenerator from './WeightedRhythmGenerator';

const ctx = new AudioContext();

window.transport = new Transport(120);
transport.start(onTransportTick);

const wr = new WeightedRhythmGenerator({
    probabilities: {
        4: 1,
        1: 0.5,
        // 3: 1
    }
});
console.log(wr)

const beatCounter = document.querySelector('h1');

function onTransportTick() {
    const currentBeat = transport.beatCount;

    if(wr.check(currentBeat)) {
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05)
    }

    // if(currentBeat % 4 === 0) {
    //     const osc = ctx.createOscillator();
    //     osc.connect(ctx.destination);
    //     osc.frequency.value = 880;
    //     osc.start(ctx.currentTime);
    //     osc.stop(ctx.currentTime + 0.05)
    // }

    beatCounter.innerHTML = `Current beat: ${currentBeat}`;
}
