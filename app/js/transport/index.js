import TransportWorker from "./transport.worker";

export default class Transport {
    constructor(bpm = 120) {
        this.bpm = bpm;
        this.worker = new TransportWorker();
        this.listeners = [];
    }

    start() {
        this.worker.postMessage({ action: "SET_BPM", bpm: this.bpm });
        this.worker.postMessage({ action: "TRANSPORT_START" });

        this.worker.onmessage = e => {
            if (e.data.event === "TRANSPORT_TICK") {
                this.beatCount = e.data.beatCount;
                this.listeners.forEach(listener => listener.call(this));
            }
        };
    }

    addListener(listener) {
        this.listeners.push(listener);
    }
}
