const stripAnsi = require('strip-ansi');

const trans = (obj) => {
    const result = {};

    result.success = obj.success;
    result.total = obj.numTotalTests;
    result.passed = obj.numPassedTests;
    result.filed = obj.numFailedTests;
    result.pending = obj.numPendingTests;

    const testResults = [];
    result.testResults = testResults;

    for (const item of obj.testResults) {
        const result = {
            results: [],
        };
        result.name = item.name;
        result.status = item.status;
        result.message = stripAnsi(item.message);
        result.time = item.endTime - item.startTime;

        testResults.push(result);

        const results = item.assertionResults;

        for (let i = 0; i < results.length; i++) {
            const item = {};
            item.status = results[i].status;
            item.titles = results[i].ancestorTitles;
            item.title = results[i].title;
            console.log(item.title);
            
            if(item.status !== 'passed') {
                item.msg = stripAnsi(results[i].failureMessages[0]);
            }

            result.results.push(item);
        }
    }

    return result;
}
module.exports = trans;