import Optional from "../main/Optional";
import InvalidArgumentError from "../main/InvalidArgumentError";
import Consumer from "../main/Consumer";
import Predicate from "../main/Predicate";
import JFunction from "../main/JFunction";

test("empty: returns an empty Optional instance", function() {
    let emptyOptional = Optional.empty();
    expect(emptyOptional instanceof Optional).toBe(true);
});

test("of: creates optional with non-null value as arg", function() {
    let optional = Optional.of(1);
    expect(optional instanceof Optional).toBe(true);
});

test("of: throws exception when null value passed as arg", function() {
    expect(() => Optional.of(null)).toThrow(Error);
});

test("of: throws exception when undefined value passed as arg", function() {
    expect(() => Optional.of(undefined)).toThrow(Error);
});

test("ofNullable: if value is non-null/undefined, return non-empty Optional", function() {
    let nonNullOptional = Optional.ofNullable(1);
    expect(nonNullOptional.typeof()).toBe("number");
});

test("ofNullable: return empty optional is value is null or undefined", function() {
    let emptyOptional = Optional.ofNullable(undefined);
    expect(emptyOptional.typeof()).toBe("undefined");
});

test("get: return value passed when value is non-null", function() {
    let numToTest = 1;
    let optional = Optional.of(numToTest);
    expect(optional.get()).toBe(numToTest);
});

test("get: if optional has null value, error is thrown when called", function() {
    let emptyOptional = Optional.empty();
    expect(() => emptyOptional.get()).toThrow(Error);
});

test("isPresent: return true if non-null value is present", function() {
    let optoinal = Optional.of(1);
    expect(optoinal.isPresent()).toBe(true);
});

test("isPresent: expect return false when null value is present", function() {
    let emptyOptional = Optional.empty();
    expect(emptyOptional.isPresent()).toBe(false);
});

test("ifPresent: function accepts consumer and executes accept if value is non-null", function() {
    let optional = Optional.of("A String");
    const callbackToTest = jest.fn(() => Promise.resolve())
    let consumer: Consumer<String> = new Consumer<String>(function(val: String) {
       callbackToTest();
    });

    optional.ifPresent(consumer);

    expect(callbackToTest).toHaveBeenCalled();
});

test("ifPresent: if value is null, immediately return", function() {
    let optional = Optional.empty();
    const callbackToTest = jest.fn(() => Promise.resolve());
    let consumer: Consumer<String> = new Consumer<String>(function(val: String) {
        callbackToTest();
    });

    optional.ifPresent(consumer);

    expect(callbackToTest).toBeCalledTimes(0);
});

test("filter: if predicate returns true, return a new optional with old value", function() {
    let optional = Optional.of(2);
    let filterOutOdds = (val: number) => val % 2 === 0;
    let predicateToFilterBy = new Predicate<number>(filterOutOdds);
    let potentialOptionalToReturn = optional.filter(predicateToFilterBy);

    expect(potentialOptionalToReturn.get()).toBe(2);
});

test("filter: if predicate returns false, return a new, empty optional", function() {
    let optional = Optional.of(3);
    let filterOutOdds = (val: number) => val % 2 === 0;
    let predicateToFilterBy = new Predicate<number>(filterOutOdds);
    let potentialOptionalToReturn = optional.filter(predicateToFilterBy);

    expect(potentialOptionalToReturn.isPresent()).toBe(false);
});

test("filter: if value is null or undefined, throw a NoSuchElementError", function() {
    let emptyOptional = Optional.empty();
    let filterOutOdds = (val: number) => val % 2 === 0;
    let predicateToFilterBy = new Predicate<number>(filterOutOdds);

    expect(() => emptyOptional.filter(predicateToFilterBy)).toThrow(Error);
});

test("map: take current value and return new optional with value returned from JFunction", function() {
    let optional = Optional.of("2");
    let mapFunction = (val: string) => parseInt(val);
    let functionToMapWith = new JFunction<string, number>(mapFunction);

    let newOptionalAsInt = optional.map(functionToMapWith);
    expect(newOptionalAsInt.typeof()).toBe("number");
    expect(newOptionalAsInt.get()).toBe(2);
});

test("map: if value is not present, return empty optional", function() {
    let optional = Optional.empty();
    let mapFunction = (val: string) => parseInt(val);
    let functionToMapWith = new JFunction<string, number>(mapFunction);

    let newOptional = optional.map(functionToMapWith);
    expect(newOptional.isPresent()).toBe(false);
});

test("orElse: return value if present", function() {
    let optional = Optional.of(2);
    expect(optional.orElse(1)).toBe(2);
});

test("orElse: return other value when not present", function() {
    let emptyOptional = Optional.empty();
    expect(emptyOptional.orElse(1)).toBe(1);
})

test("typeof: get type of instance var value as string", function() {
    let optional = Optional.of(1);
    expect(optional.typeof()).toBe("number");
});

test("typeof: return null when type is undefined", function() {
    let optional = Optional.ofNullable(undefined);
    expect(optional.typeof()).toBe("undefined");
})

