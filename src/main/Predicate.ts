export default class Predicate<T> {
    public test: Function;

    constructor(test: (value: T) => boolean) {
        this.test = test;
    }

    and(predicateToCombine: Predicate<T>): Predicate<T> {
        return new Predicate((val: T) => {
            return this.test(val) && predicateToCombine.test(val);
        });
    }

    or(predicateToCombine: Predicate<T>): Predicate<T> {
        return new Predicate((val: T) => {
            return this.test(val) || predicateToCombine.test(val);
        });
    }

    negate(): Predicate<T> {
        const negationOfTest = (value: T) => !this.test(value);
        return new Predicate<T>(negationOfTest);
    }

}