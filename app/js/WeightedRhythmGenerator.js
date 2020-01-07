export default class WeightedRhythmGenerator {
    constructor({ probabilities = {}, regenerate = true }) {
        this.probabilities = probabilities;
        this.weights = [];
        this.beats = 16;
        this.regenerate = regenerate;
        this.lastBeat = 0;

        this.setup();
    }

    setup() {
        this.generate();
    }

    generate() {
        const weights = [];

        for(let i = 0; i < this.beats; i++) {
            let beatWasSet = false;
            Object.keys(this.probabilities).forEach(beat => {
                if(i % ~~beat === 0 && !weights[i]) {
                    const probability = this.probabilities[beat];
                    if(probability >= Math.random()) {
                        weights[i] = 1;
                        beatWasSet = true;
                    }
                }
            });
            if(!beatWasSet) {
                weights[i] = 0;
            }
        }

        this.weights = weights;
    }

    setProbabilities(probabilities) {
        this.probabilities = probabilities;
    }

    check(beat) {
        if(this.lastBeat === this.beats - 1 && this.regenerate) {
            this.generate();
        }
        this.lastBeat = beat;
        return !!this.weights[beat];
    }
}
