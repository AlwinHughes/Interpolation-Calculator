var	points;
var coifitionts;//in increasing powers
var raw_coifitions = [new Array(4),new Array(4),new Array(4),new Array(4)]
var block_size;
var no_of_points = 4;
function calculate () {
	// set up
	points = [];
	block_size = 0;
	coifitionts = Array(no_of_points);

	for (var i = 0; i < coifitionts.length; i++) {
		coifitionts[i] = 0;
	};
	//populating array
	for(var i = 0; i < no_of_points;i++ ){
		points.push([parseInt(document.getElementById('X_'+i).value), parseInt(document.getElementById('Y_'+i).value)]);
	}
	
	for(var i = 0; i<points.length; i++){
		for(var j = 0; j< selectAllBut(points,i).length; j++){
			if(points[i][0]==selectAllBut(points,i)[j]){
				alert("Repeated x cordinates");
				return;
			}
		}
	}

	for (var i = 0; i < points.length; i++) {// loop selects which x value is not in the top of the fraction (which term of the equation it is)
		var combs = combinations(getstring(selectAllBut(points,i)));
			console.log(combs);
		//calculating bottom of fraciton 
		var denominator = 1;
		for(var j = 0; j< points.length; j++){
			if(i != j){
				denominator *= (points[i][0]-points[j][0]); 
			}
		}

		//dealing with all terms that are not the highest power
		console.log("denominator:"+denominator);
		for (var k = 0; k < combs.length; k++) {
			console.log(combs[k]);
			coifitionts[combs[k].replace(/[^*]/g, "").length+1] += math.chain(math.eval(combs[k])).multiply(math.fraction(points[i][1],denominator)).done();
		};

		//dealing with coifitions for highest power
		coifitionts[0] += points[i][1]/denominator;
	}

	console.log(coifitionts);

	var lowest = findSmallest(coifitionts);
	for (var i = 0; i < coifitionts.length; i++) {
		console.log(no_of_points-i-1);
		document.getElementById("x^"+(no_of_points-i-1)).innerHTML = coifitionts[i];
	};
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

function findSmallest(array){
	var current = array[0];
	for (var i = 0; i < array.length; i++) {
		if(array[i]<current){
			current = array[i];
		}
	};
	return current;
}

function getstring(data){
	console.log(data);
	//geting block size
	for (var i = 0; i < data.length; i++) {

		if(String(-1*data[i]).length>block_size){
			console.log("data: "+-1*data[i]);
			block_size = String(-1*data[i]).length;		
		}
	};

	console.log("block size"+block_size)
	var return_string = "";

	for (var i = 0; i < data.length; i++) {
		return_string = return_string+ addzeroes(String((-1)*data[i]),((-1)*data[i])<0);
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

$(document).ready(function(){
	$("#delete_row").on('click',function(){
		console.log(no_of_points);
		if(no_of_points>3){
			
			console.log($('#value_table_body').children().last().remove());
			no_of_points--;
		}
	})

	$("#add_row").click(function(){

		no_of_points++;
		$('#value_table tbody').append('<tr id="row_'+(no_of_points-1)+'"> <td><input type="number"id="X_'+(no_of_points-1)+'"></td> <td><input type="number"id="Y_'+(no_of_points-1)+'"></td> </tr>');
	})
})


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

