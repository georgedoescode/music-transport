/**
 * RhythmGenerator
 * A class to generate arrays of 0's and 1's
 * to be used to create rhythms for beats, melodies, etc.
 */
export default class RhythmGenerator {

    /**
     * Run the generator to create a random rhythm.
     * @param {number} divisions (optional)
     */
    static run(divisions = 16) {
        const rhythm = [];
        while(rhythm.length <= divisions) {
            const value = Math.round(Math.random());
            rhythm.push(value);
        }
        return rhythm;
    }
}