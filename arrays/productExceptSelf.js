var productExceptSelf = function(nums) {
    
    
};


//O(n) DOES NOT MEAN 1 PASS!!!!
//


[1,2,3,4]
     c
iteration 1 => 1, 2, 6, 24    -> = from left

iteration 2 => 24, 24, 12, 4   <- = from right

iterate c => index c-1 + c+1 indexing with boundary check and place in final arr

  anything left c then  EXCLUE c index c-1 + c+1 indexing with boundary check 
       
still O(n)!!!! linear time doesn't mean ONLY LINEAR PASS, so O(n) doesn't mean it's faster if you have many vs a n^2
space = O(2n) not counting result arr


set arr to another var since that's not new space but just referencing