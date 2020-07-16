class DiceParser {
    constructor(inputString) {
        this.input = inputString;
    }
    process(expression) {
        // if brackets then call process(bracketExpression)
        // -- while
        // once brackets are finished, check for multiply and divide and call process(multOrDivExpression)
        // once multiplication and division are done, check for 
        while(expression.indexOf('(') > 0) {
            // check for nested parens
            const start = expression.indexOf('(');
            const finish = expression.indexOf(')');
            const enclosedExpression = expression.slice(start, (finish + 1));
            // const result = process(enclosedExpression);
        }
    }
}

class Calculator {
    constructor() {

    }
}

module.exports = {
    Parser: DiceParser,
};