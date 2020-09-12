export default class Consumer<T> {
     accept: Function;

    constructor(accept: (parameter: T) => void) {
        this.accept = accept;
    }

    andThen(after: Consumer<T>): Consumer<T> {
        return new Consumer<T>((val: T) => {
            this.accept(val);
            after.accept(val);
        })
    }
}