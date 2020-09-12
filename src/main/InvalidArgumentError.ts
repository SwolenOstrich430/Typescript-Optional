export default class InvalidArgumentError extends Error {

    constructor(message: string) {
        super(message);
    }

}