export default class GeneticAlgorithm {

    /**
     * GeneticAlgorithm
     * @param {number} geneLength the size Genotypes can be.
     * @param {Array} chromosomes the available values a Genotype can consist of.
     */
    constructor(geneLength = 10,chromosomes = [0,1]) {
        this.geneLength  = geneLength;
        this.chromosomes = chromosomes;
    }

    /**
     * Generate a population of Genotypes of length 'size'
     * @param {number} size 
     */
    generatePopulation(size) {
        const population = [];
        for(let i = 0; i < size; i++) {
            const genotype = [];
            for(let i = 0; i < this.geneLength; i++) {
                const randomChromosome = this.chromosomes[Math.floor(Math.random()*this.chromosomes.length)];
                genotype.push(randomChromosome);
            }
            population.push(genotype);
        }
        return population;
    }

    /**
     * Select two random indices of the population
     * @param {boolean} demes 
     */
    selectRandomGenotypes(demes = false) {
        let index1,index2;
        if(demes) {
            index1 = Math.floor(Math.random()*this.population.length);
            index2 = index1 + ( (Math.random() < 0.5 && index1 > 0) || index1 == this.population.length-1 ? -1 : 1);
        } else {
            while(index1 === index2) {
                index1 = Math.floor(Math.random()*this.population.length);
                index2 = Math.floor(Math.random()*this.population.length);
            }
        }
        return [index1,index2];
    }

    /**
     * Compare fitness of genotypes and return winner and loser indicies.
     * If fitnesses are equal, then still return one as 
     * winner and one as loser to allow for mutation.
     * @param {Genotype} G1 
     * @param {Genotype} G2 
     */
    tournament(G1,G2) {
        const f1 = this.fitness(G1);
        const f2 = this.fitness(G2);
        if(f1 > f2) {
            return [0,1];
        } else {
            return [1,0];
        }
    }

    /**
     * Mutate the supplied Genotype with the supplied chromosomes
     * @param {Genotype} G 
     * @param {Array} chromosomes 
     * @param {number} probability 
     */
    mutate(G,probability = 0.01,chromosomes = [0,1]) {
        if(Math.random() < probability) {
            G[Math.floor(Math.random()*G.length)] = chromosomes[Math.floor(Math.random()*chromosomes.length)];
        }
        return G;
    }

    /**
     * Return the fitness of the supplied Genotype
     * @param {Genotype} G 
     */
    fitness(G) {
        // Terrible example fitness function
        return G.reduce((a,v) => a+v,0);
    }

    /**
     * Split each Genotype by a random index and concatenate.
     * @param {Genotype} winner 
     * @param {Genotype} loser 
     */
    singlePointCrossover(winner,loser) {
        const crossoverIndex = Math.floor(Math.random()*winner.length);
        return [].concat(winner.slice().splice(0,crossoverIndex),loser.slice().splice(crossoverIndex));
    }
      
    /**
     * Split each Genotype by a two random indices and concatenate.
     * @param {Genotype} winner 
     * @param {Genotype} loser 
     */
    twoPointCrossover(winner,loser) {
        const crossoverIndices = [
            Math.floor(Math.random()*winner.length),
            Math.floor(Math.random()*winner.length)
        ].sort();
        return [].concat(
            winner.slice().splice(0,crossoverIndices[0]), 
            loser.slice().splice(crossoverIndices[0],crossoverIndices[1]), 
            winner.slice().splice(crossoverIndices[1])
        );
    }
       
    /**
     * Create a new Genotype by randomly selecting chromosomes from each of the winner and loser.
     * @param {Genotype} winner 
     * @param {Genotype} loser 
     */
    uniformCrossover(winner,loser) {
        const offspring = [];
        const probability = 0.5
        for(let i = 0; i < winner.length; i++) {
            if(Math.random() < probability) {
                offspring.push(winner[i]);
            } else {
                offspring.push(loser[i]);
            }
        }
        return offspring;
    }

    /**
     * Just keep the winner.
     * @param {Genotype} winner 
     * @param {Genotype} loser 
     */
    noCrossover(winner,loser) {
        return winner;
    }

    /**
     * Run the algorithm
     * @param {number} populationCount 
     * @param {number} generationCount 
     */
    run(populationCount = 100, generationCount = 100) {

        this.population = this.generatePopulation(populationCount);

        const mutationProbability = 0.01;

        const crossoverFn = this.singlePointCrossover;

        for(let i = 0; i < generationCount * populationCount; i++) {

            // select tornament contestants
            const contestantIndicies = this.selectRandomGenotypes();
            
            // decide winner and loser
            const outcome = this.tournament(this.population[contestantIndicies[0]],this.population[contestantIndicies[1]]);
            
            // crossover and apply new genotype to loser
            this.population[contestantIndicies[outcome[1]]] = crossoverFn(this.population[contestantIndicies[0]],this.population[contestantIndicies[1]]);

            // mutate loser slightly
            this.population[contestantIndicies[outcome[1]]] = this.mutate(this.population[contestantIndicies[outcome[1]]],mutationProbability);

            // winner's fitness
            const winnersFitness = this.fitness(this.population[contestantIndicies[outcome[0]]]);

            console.log(winnersFitness);

        }

    }

}