import InvalidArgumentError from "./InvalidArgumentError";
import NoSuchElementError from "./NoSuchElementError";
import Consumer from "./Consumer";
import Predicate from "./Predicate";
import JFunction from "./JFunction";
import Supplier from "./Supplier";


export default class Optional<T> {
    private value?: T;
    private static OF_ERROR_MESSAGE = "value parameter must be non-null";
    private VALUE_NOT_PRESENT = "value instance variable must be non-null";
    private OR_ELSE_THROW_MESSAGE = "Error and value are not present";

    public static empty<T>(): Optional<T> {
        return new Optional<T>();
    }

    public static of<T>(value: T): Optional<T> {
        if(value === null || value === undefined) {
            throw new InvalidArgumentError(this.OF_ERROR_MESSAGE);
        }

        return new Optional<T>(value);
    }

    public static ofNullable<T>(value: T) {
        if(value === null || value === undefined) { 
            return Optional.empty();
        }
        return Optional.of(value);
    }

    constructor(value?: T) {
        this.value = value;
    }

    get(): T | undefined {
        if(!this.isPresent()) {
            throw new NoSuchElementError(this.VALUE_NOT_PRESENT);
        }
        return this.value;
    }

    isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    ifPresent(consumer: Consumer<T>): void {
        if(!this.isPresent()) return;
        consumer.accept(this.value); 
    }

    filter(predicate: Predicate<T>): Optional<T | null> {
        if(!this.isPresent()) {
            throw new NoSuchElementError(this.VALUE_NOT_PRESENT);
        }

        if(predicate.test(this.value)) {
            return new Optional<T>(this.value);
        } else {
            return Optional.empty();
        }
    }

    map<U>(mapFunction: JFunction<T, U>): Optional<U | null> {
        if(!this.isPresent()) return Optional.empty();
        let intermediateValue: U = mapFunction.apply(this.value);

        if(intermediateValue === null || intermediateValue === undefined) {
            return Optional.empty();
        }

        return new Optional<U>(intermediateValue);
    }

    orElse(otherValue: T | undefined): T | undefined {
        if(this.isPresent()) return this.value;
        return otherValue;
    }

    orElseGet(supplier: Supplier<T>): T {
        if(this.value !== undefined && this.value !== null) return this.value;
        let supplierVal = supplier.get();

        if(supplierVal === undefined || supplierVal === null) {
            throw new NoSuchElementError(this.VALUE_NOT_PRESENT);
        }

        return supplierVal;
    }

    orElseThrow(errorSupplier: Supplier<Error>): T {
        if(this.value === undefined || this.value === null)  {
            let err: Error | undefined = errorSupplier.get();
            if(err) throw err;
            throw new Error(this.OR_ELSE_THROW_MESSAGE);
        } else {
            return this.value;
        }
    }

    typeof(): string {
        if(this.value === null) return "undefined";
        return typeof this.value
    }

    toString(): string {
        if(this.value === undefined || this.value === null) {
            return "Optional[empty]";
        }

        return `Optional[${this.value}]`;
    }

}