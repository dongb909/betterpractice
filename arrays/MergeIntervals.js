/* Given a collection of intervals, merge all overlapping intervals.

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.
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





var merge = function(intervals) {
    if (intervals.length === 0 || intervals[0].length === 0 || !intervals) return [];
    intervals.sort((a,b) => a[0] - b[0]); //sorting by sort time
    const result = [intervals[0]]   //stack
    
    for(let i = 1; i < intervals.length; i++) {
        let [currStart, currEnd] = intervals[i]; 
        // if (result.length === 0) {
        //     result.push(intervals[i]);
        //     continue;
        // } 
       
       let [prevStart, prevEnd] = result[result.length-1];
             
       if (prevEnd >= currStart && currStart >= prevStart) {  //MUST HAVE &&
           // prevEnd = Math.max(prevEnd, currEnd)  //chance that reference point directly NO CANNOT DO THAT?????
            result.pop()
            result.push([prevStart, Math.max(prevEnd, currEnd)]) 
           
           // if (prevEnd < currEnd) {
            //     result.pop()
            //     result.push([prevStart, currEnd])
             //ignore all else since won't do anything anywayz
        } else {
            // result.push([currStart, currEnd]);
            result.push(intervals[i]);
        }
    }
     return result;
};



Optimized
var merge = function(intervals) {
if(intervals.length<2) return intervals;
    
intervals.sort((a,b)=>a[0]-b[0]);

const result = [intervals[0]];

for(let i=1; i<intervals.length; i++) {
    const pre = result[result.length-1];
    if(intervals[i][0]<=pre[1]) {
        result.pop();
        result.push([Math.min(intervals[i][0], pre[0]), Math.max(intervals[i][1], pre[1])]);
    } else {
        result.push(intervals[i]);
    }
}

return result;
};