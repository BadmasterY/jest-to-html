interface Result  {
    success: boolean;
    testResults?: {
        name: string;
        status: string;
        message: string;
    }[];
}

const trans = (obj: object): Result => {}

export {
    trans
};