var	points = new Array(4);
var coifitionts = new Array(4);//in increasing powers
var raw_coifitions = [new Array(4),new Array(4),new Array(4),new Array(4)]
var block_size;
var no_of_points = 4;
function calculate () {
	points = [];
	block_size = 0;
	coifitionts = [0,0,0,0,0];
	for(var i = 0; i < 4;i++ ){
		points.push([document.getElementById('X_'+i).value, document.getElementById('Y_'+i).value]);
	}
	

	//console.log(selectAllBut(points,1));
	
 	console.log(getstring(selectAllBut(points,1)));
	var combs = combinations(getstring(selectAllBut(points,1)));
	console.log(combs);

	// for (var i = 0; i < points.length; i++) {// loop selects which x value is not in the top of the fraction (which term of the equation it is)
	// 	var combs = combinations(getstring(selectAllBut(points,i)));
	// 	console.log(combs);
	// 	//calculating bottom of fraciton 
	// 	var denominator = 1;
		
	// 	for(var j = 0; j< points.length; j++){
	// 		if(i != j){
	// 			// console.log("j"+j);

	// 			denominator *= (points[i][0]-points[j][0]); 
	// 		}
	// 	}
	// 	console.log("denominator:"+denominator);
	// 	for (var k = 0; k < combs.length; k++) {
	// 		console.log("k:"+k);
	// 		console.log("comb:"+combs[k]);
	// 		console.log("comb e:"+math.eval(combs[k]));
	// 		console.log("length"+combs[k].replace(/[^*]/g, "").length);
	// 		console.log("to add"+ math.eval(combs[k])*(points[i][1]/denominator));

	// 		coifitionts[combs[k].replace(/[^*]/g, "").length+1] += math.eval(combs[k])*(points[i][1]/denominator);
	// 	};
		
	// }

	console.log(coifitionts);
}

function selectAllBut(array,not) {
	var variable = [];
	for (var i = 0; i < array.length; i++) {
		if(i != not){
			variable.push(array[i][0]);
		}
	};
	return variable;
}

function logPoints(){
	var points_string = "";
	points.forEach(function(item,index){
		points_string +='['+item[0]+','+item[1]+'],'
	})
	console.log(points_string);
}


function getstring(data){
	//geting block size
	for (var i = 0; i < data.length; i++) {
		console.log(i);
		if(String(data[i][0]).length>block_size){
			block_size = String(-points[i][0]).length;
		}
	};
	console.log("block_size: "+block_size);
	var return_string = "";

	for (var i = 0; i < points.length; i++) {
		return_string = return_string+ addzeroes(String(-points[i][0]),(-points[i][0])<0);
	}
	console.log(return_string);
	return return_string;
}

function addzeroes(string,is_negative){
	if(!is_negative){
		if(string.length<block_size){
			return addzeroes("0"+string,is_negative);
		}else{
			return string;
		}	
	}else{
		if(string.length<block_size){
			return addzeroes(string.slice(0,1)+"0"+string.slice(1,string.length),is_negative);
		}else{
			return string;
		}
	}
}


function combinations(str) {
    return fn("", str, []);
}


var fn = function(active, rest, a) {
    
    if (!active && !rest)
            return;
    if (!rest) {
    a.push(active.substring(0,active.length-1));
    } else {
        fn(active+selectFromArray(rest), String(rest).slice(block_size) , a);
        fn(active, String(rest).slice(block_size), a);
    }
    return a;
}
function selectFromArray (rest) {
	var return_string = "";
	for(var i = 0; i<block_size; i++){
		return_string = return_string +rest[i];
	}
	return return_string+"*";
}

function deleteRow(){
	console.log("#row_"+String(no_of_points-1));
	$("#row_"+String(no_of_points-1)).remove();
}


function addRow(){
	console.log("addRow");
}