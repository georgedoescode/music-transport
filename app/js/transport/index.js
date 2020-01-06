import TransportWorker from "./transport.worker";

export default class Transport {
    constructor(bpm = 120) {
        this.bpm = bpm;
        this.worker = new TransportWorker();
    }

    start(callback) {
        this.worker.postMessage({ action: "SET_BPM", bpm: this.bpm });
        this.worker.postMessage({ action: "TRANSPORT_START" });

        this.worker.onmessage = e => {
            if (e.data.event === "TRANSPORT_TICK") {
                this.beatCount = e.data.beatCount;
                callback();
            }
        };
    }
    
    setBpm(bpm) {
        this.bpm = bpm;
        this.worker.postMessage({ action: "SET_BPM", bpm: this.bpm })
    }
}
