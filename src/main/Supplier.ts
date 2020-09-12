export default class Supplier<T> {
    private value?: T;

    constructor(value?: T) {
        this.value = value;
    }

    get(): T | undefined {
        return this.value;
    }
}