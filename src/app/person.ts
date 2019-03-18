export class Person {
    constructor(
        public name: string,
        public lastname: string,
        public age: number,
        public weight: number,
        public height: number
    ) { }

    /**
     * Calcula el indice de masa corporal tomando los atributos del objeto.
     * @retun string
     */
    calcIMC(): string {
        let res: string;
        if (this.height < 0 || this.weight < 0) {
            return 'no found';
        }

        const calc = Math.round(this.weight / (Math.pow(this.height, 2)));

        if (calc < 18) {
            res = 'down';
        } else if (calc >= 18 && calc <= 24) {
            res = 'normal';
        } else if (calc >= 25 && calc <= 26) {
            res = 'overweight';
        } else if (calc >= 27 && calc <= 29) {
            res = 'overweight level 1';
        } else if (calc >= 30 && calc <= 39) {
            res = 'overweight level 2';
        } else if (calc >= 40) {
            res = 'overweight level 3';
        }
        return res;
    }
}
