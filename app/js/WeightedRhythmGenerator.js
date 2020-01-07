export default class WeightedRhythmGenerator {
    constructor({ probabilities = {} }) {
        this.probabilities = probabilities;
        this.weights = [];
        this.beats = 16;

        this.setup();
    }

    setup() {
        this.generate();
    }

    generate() {
        const weights = [];

        for(let i = 0; i < this.beats; i++) {
            let beatWasSet = false;
            // For each beat, iterate through probabilities.
            Object.keys(this.probabilities).forEach(beat => {
                // There is a chance that a beat should be played here
                if(i % ~~beat === 0 && !weights[i]) {
                    const probability = this.probabilities[beat];
                    if(probability >= Math.random()) {
                        weights[i] = 1;
                        beatWasSet = true;
                    }
                }
            });
            // None of the beats / probabilities managed to add the note, return 0
            if(!beatWasSet) {
                weights[i] = 0;
            }
        }

        this.weights = weights;
    }

    check(beat) {
        return !!this.weights[beat];
    }
}
