export default class JFunction<T, U> {
    public apply: Function;

    constructor(apply: (val: T) => U) {
        this.apply = apply;
    }

    andThen<V>(functionToRunAfter: JFunction<U, V>): JFunction<T, V> {
        const composedFunction = (val: T) => {
            let intermediateVal: U = this.apply(val);
            return functionToRunAfter.apply(intermediateVal);
        }

        return new JFunction(composedFunction);
    }

    compose<V>(functionToRunBefore: JFunction<V, T>): JFunction<V, U> {
        const composedFunction = (val: V) => {
            let intermediateVal: T = functionToRunBefore.apply(val);
            return this.apply(intermediateVal);
        }

        return new JFunction(composedFunction);
    }
}