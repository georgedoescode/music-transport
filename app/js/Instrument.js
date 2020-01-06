/**
 * Instrument
 * Basic synth for playing a melody.
 */
export default class Instrument {

    /**
     * Constructor
     * @param {AudioContext} context 
     */
    constructor(context) {
        this.context = context;
        this.oscillator = context.createOscillator();
        this.gainNode = context.createGain();
        this.gainNode.connect(context.destination);
        this.oscillator.connect(this.gainNode);
        
        // Set default type to sine as it's easier on the ears
        oscillator.type = 'sine';
    }

    /**
     * Play the set frequency at the set gain.
     */
    play() {
        this.oscillator.start(0);
    }

    /**
     * Stop the current tone.
     */
    stop() {
        this.oscillator.stop(0);
    }

    /**
     * Set the synth waveform.
     * @param {string} form Available options: "sine", "square", "sawtooth", "triangle" or "custom"
     */
    setWaveForm(form) {
        this.oscillator.type = form;
    }

    /**
     * Set the frequency of the synth.
     * @param {number} frequency A non-negative integer
     */
    setFrequency(frequency) {
        this.oscillator.frequency.setValueAtTime(frequency,0)
    }

    /**
     * Set the gain of the synth.
     * @param {number} gain A float between 0-1
     */
    setGain(gain) {
        this.gainNode.gain.setValueAtTime(gain,0)
    }
}