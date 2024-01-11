import { CustomError } from "./Errors";



export class LikeError extends CustomError {
    constructor(code: number, status: number, message: string) {
        super(code, status, message);
    }

    static NOT_LOGGED_IN() {
        return new LikeError(0, 401, "Please choose a value greater than 0.");
    }
}