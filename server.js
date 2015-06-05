
function solution(A){
	var calculateSumOfArray = function(arr){
		var result = 0;
		arr.forEach(function(i){
			result += i;
		});
		return result;
	};
	var result = 0;
	if (A.length === 0){
		result = -1;
	}
	var sum = 0;
	var sumOfTheRest = calculateSumOfArray(A);
	
	for (var i = 0; i<A.length; i++){

		console.log('Index=', i);		
		sumOfTheRest -= A[i];
		

		console.log('sum=', sum, 'sumOfTheRest=', sumOfTheRest);

		if (sum === sumOfTheRest){
			return i;
		}

		sum += A[i];
	}
	return -1;
}

var arr = [-1, 3, -4, 5, 1, -6, 2, 1] ;
var result = solution(arr);

console.log(result);
