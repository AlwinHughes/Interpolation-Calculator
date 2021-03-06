var	points;
var coifitionts;//in decreaseing power
var block_size;
var no_of_points = 4;
var answer_as_decimal = true;
math.config({
  number: 'Fraction'
});
var start_time;
function calculate () {
	// set up
	
	start_time = new Date().getTime();
	resetResults();
	points = [];
	block_size = 0;
	coifitionts = Array(no_of_points);

	for (var i = 0; i < coifitionts.length; i++) {
		coifitionts[i] = 0;
	};
	math.config({
  		number: 'number'
	});
	//populating array
	for(var i = 0; i < no_of_points;i++ ){
		points.push([math.eval(document.getElementById('X_'+i).value), math.eval(document.getElementById('Y_'+i).value)]);
	}
	math.config({
  		number: 'Fraction'
	});
	//checking for repeats and zeroes
	for(var i = 0; i<points.length; i++){
		for(var j = 0; j< selectAllBut(points,i).length; j++){
			if(points[i][0].length==0 || points[i][1].length==""){
				alert("Please enter values for all fields");
				return;	
			}else if(points[i][0]==selectAllBut(points,i)[j]){
				alert("Repeated x cordinates");
				return;
			}else if(isNaN(points[i][0])||isNaN(points[i][1])){
				alert("f(x) and x \u2208 \u211A");
				return;
			}

		}
	}
	var eta = math.exp(points.length*0.8344)*0.376;
	if(eta>80000 && !confirm("This calculation is predicted to take around "+math.fix(eta/1000)+" seconds to complete. Do you want to continue with it?")){
		return;
	}

	for (var i = 0; i < points.length; i++) {// loop selects which x value is not in the top of the fraction (which term of the equation it is)
		var stuff = new Date().getTime();
		var combs = combinations(getstring(selectAllBut(points,i)));
		var string_denominator = "";
		for(var j = 0; j< points.length; j++){
			if(i != j){
				string_denominator += "("+points[i][0]+"-"+points[j][0]+")";//math.chain(points[i][0]).subtract(points[j][0]).multiply(denominator).done(); 
			}
		}
		
		var denominator = math.eval(string_denominator);
		//dealing with all terms that are not the highest power
		for (var k = 0; k < combs.length; k++) {
			coifitionts[combs[k].replace(/[^*]/g, "").length+1] = math.chain(math.eval(combs[k])).multiply(points[i][1]).divide(denominator).add(coifitionts[combs[k].replace(/[^*]/g, "").length+1]).done();
		};

		//dealing with coifitions for highest power
		coifitionts[0] = math.chain(coifitionts[0]).add(math.chain(points[i][1]).divide(denominator).done()).done();
	}

	var lowest = findSmallest(coifitionts);
	displayCoifits();

}
var math_string;
var iration_string;
var iration_start
function displayCoifits(){
	if(coifitionts){
		var latex_string = "";
		for (var i = 0; i < coifitionts.length; i++) {
			if(answer_as_decimal||coifitionts[i].d==1||coifitionts[i]==0){

				if(math.string(coifitionts[i]).indexOf("(") >= 0){// check if reocuring 
					math_string = math.string(math.abs(coifitionts[i]));
					iration_string = math_string.substring(math_string.indexOf("(")+1,math_string.length-1);
					iration_start = math.string(coifitionts[i]).indexOf("(")-1;
					if(no_of_points-i-1==0){//checkig power isn zero
						latex_string += (coifitionts[i]>0)? "+"+math_string.substring(0,iration_start+1)+"\\overline{"+iration_string+"}":"-"+math_string.substring(0,iration_start)+"\\overline{"+iration_string+"}";
					}else if(no_of_points-i-1==1){
						latex_string += (coifitionts[i]>0)? "+"+math_string.substring(0,iration_start+1)+"\\overline{"+iration_string+"}"+"x":"-"+math_string.substring(0,iration_start)+"\\overline{"+iration_string+"}"+"x";
					}else{
						latex_string += (coifitionts[i]>0)? "+" + math_string.substring(0,iration_start+1)+"\\overline{"+iration_string+"}"+String("x^"+String(no_of_points-i-1)): "-" + math_string.substring(0,iration_start)+"\\overline{"+iration_string+"}"+String("x^"+String(no_of_points-i-1));
					}	
				}else if(coifitionts[i] != 0){ //checking coifitiont isnt zero
					if(math.abs(coifitionts[i])==1){
						if(no_of_points-i-1==0){//checkig power isn zero
							latex_string += (coifitionts[i]>0)? "+1":"-1";
						}else if(math.abs(no_of_points-i-1)==1){
							latex_string += (coifitionts[i]>0)? "+x":"-x";
						}else{
							latex_string += (coifitionts[i]>0)? "+" + String("x^"+String(no_of_points-i-1)): "-" + String("x^"+String(no_of_points-i-1));
						}	
					}else{
						if(no_of_points-i-1==0){//checkig power isn zero
							latex_string += (coifitionts[i]>0)? "+"+coifitionts[i]:"-"+coifitionts[i].abs();
						}else if(no_of_points-i-1==1){
							latex_string += (coifitionts[i]>0)? "+"+coifitionts[i]+"x":"-"+coifitionts[i].abs()+"x";
						}else{
							latex_string += (coifitionts[i]>0)? "+" + coifitionts[i]+String("x^"+String(no_of_points-i-1)): "-" + coifitionts[i].abs()+String("x^"+String(no_of_points-i-1));
						}	
					}
						
				}
				
				document.getElementById("x^"+(no_of_points-i-1)).innerHTML = coifitionts[i]
			}else{
				if(no_of_points-i-1==0){//checkig power isn zero
					latex_string += ((coifitionts[i]>0)? "+":"-")+"\\frac{"+coifitionts[i].n+"}{"+coifitionts[i].d+"}";
				}else if(no_of_points-i-1==1){
					latex_string += ((coifitionts[i]>0)? "+":"-")+"\\frac{"+coifitionts[i].n+"}{"+coifitionts[i].d+"}x";
				}else{
					latex_string += ((coifitionts[i]>0)? "+":"-")+"\\frac{"+coifitionts[i].n+"}{"+coifitionts[i].d+"} x^"+String(no_of_points-i-1);
				}	
				document.getElementById("x^"+(no_of_points-i-1)).innerHTML = (coifitionts[i].n==0)? "0": (coifitionts[i].d == 1) ? coifitionts[i].n*coifitionts[i].s : (coifitionts[i].s == -1 ? "-" : " ") + coifitionts[i].n +"/" +coifitionts[i].d;	
			}	
		};
		
		if(latex_string.charAt(0)=="+"){
			latex_string = latex_string.substring(1);
		}
		document.getElementById("display_formula").innerHTML = "$$ f(x) ="+latex_string+"$$";
		MathJax.Hub.Typeset();
	}
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

function resetResults(){
	for (var i = 0; i < no_of_points; i++) {
		document.getElementById("x^"+i).innerHTML = "";
	}
}

function logPoints(){
	var points_string = "";
	points.forEach(function(item,index){
		points_string +='['+item[0]+','+item[1]+'],'
	})
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
	//geting block size
	for (var i = 0; i < data.length; i++) {
		if(String(-1*data[i]).length>block_size){
			block_size = String(-1*data[i]).length;		
		}
	};

	var return_string = "";

	for (var i = 0; i < data.length; i++) {
		return_string = return_string+ addzeroes(String((-1)*data[i]),((-1)*data[i])<0);
	}
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
	$("#delete_row").click(function(){
		if(no_of_points>2){
			resetResults();
			$('#value_table_body tr:last-child').remove();
			$("#results_lable td:first-child").remove();
			$("#result_row td:first-child").remove();
			no_of_points--;
		}
	});

	$("#add_row").click(function(){
		$('#value_table tbody').append('<tr id="row_'+(no_of_points)+'"> <td><input type="number"id="X_'+(no_of_points)+'"></td> <td><input type="number"id="Y_'+(no_of_points)+'"></td> </tr>');
		$('#results_lable').prepend("<td><center>\\(x^"+(no_of_points)+"\\)</center></td>");
		$('#result_row').prepend('<td id="x^'+(no_of_points)+'" height="20px" width="50px"></td>')
		no_of_points++;
		MathJax.Hub.Typeset();
	});

	$('#radio_frac').click(function(){
		answer_as_decimal = false;
		displayCoifits();
	});
	
	$('#radio_decimal').click(function(){
		answer_as_decimal = true;
		displayCoifits();
	});

});

var start;
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

