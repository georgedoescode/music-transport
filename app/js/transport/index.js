import TransportWorker from './transport.worker';

export default class Transport {
    constructor(bpm = 120) {
        this.bpm = bpm;
        this.worker = new TransportWorker();
    }
} 
