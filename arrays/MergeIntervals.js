/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
//I: nested array or tuples, NOT ORDERED , duplicates? YESSSSS
//O: return everything but merged
//E: empty? yes, 1 item,  empty array or empty [[]]

//high level: 

var merge = function(intervals) {
    if (intervals.length === 0 || intervals[0].length === 0 || !intervals) return [];
    intervals.sort((a,b) => a[0] - b[0]); //sorting by sort time
    const result = []   //stack
    
    for(let i = 0; i < intervals.length; i++) {
        [currStart, currEnd] = intervals[i]; 
        if (result.length === 0) {
            result.push(intervals[i]);
            continue;
        } 
       [prevStart, prevEnd] = result[result.length-1];
            
       if (prevEnd >= currStart && currStart >= prevStart) {  //MUST HAVE &&
            if (prevEnd < currEnd) {
                result.pop()
                result.push([prevStart, currEnd])
            } //ignore all else since won't do anything anywayz
        } else {
            // result.psuh([currStart, currEnd]);
            result.push(intervals[i]);
        }
    }
     return result;
};