const stripAnsi = require('strip-ansi');

const trans = (obj) => {
    const result = {};

    result.success = obj.success;

    if(!result.success) {
        const testResults = [];
        for(const item of obj.testResults) {
            if(item.status !== 'passed') {
                const result = {};
                result.name = item.name;
                result.status = item.status;
                result.message = stripAnsi(item.message);

                testResults.push(result);
            }
        }

        result.testResults = testResults;
    }
    return result;
}
module.exports = trans;