/*Write a function that takes in a number n and returns all possible outcomes of n games of heads or tails as an array of arrays
ex: headsOrTails(2)
=> [[heads, heads], [heads, tails],[taks, heads], [tails, tails]] */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var headsOrTailCombo = function (n) {
    if (!n)
        return [];
    var allPossibleResult = []; //nested array of array with strings
    function recurse(currCombo) {
        if (currCombo.length === n) {
            allPossibleResult.push(currCombo);
            return;
        }
        recurse(__spreadArrays(currCombo, ["heads"])); //we know it's just heads of tails
        recurse(__spreadArrays(currCombo, ["tails"]));
    }
    recurse([]);
    console.log(allPossibleResult);
    return allPossibleResult;
};
headsOrTailCombo(3);
