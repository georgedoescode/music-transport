import Transport from "./transport/index.js";
import WeightedRhythmGenerator from './WeightedRhythmGenerator';

const ctx = new AudioContext();

window.transport = new Transport(120);
transport.start(onTransportTick);

const wr = new WeightedRhythmGenerator({
    probabilities: {
        3: 0.75,
        1: 0.125,
        4: 0.5
    },
    regenerate: true
});

const beatCounter = document.querySelector('h1');

function onTransportTick() {
    const currentBeat = transport.beatCount;

    if(wr.check(currentBeat)) {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 175 * (Math.floor(Math.random() * 5));
        osc.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05)
    }

    beatCounter.innerHTML = `Current beat: ${currentBeat}`;
}
