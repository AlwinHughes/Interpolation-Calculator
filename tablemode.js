var table_coifits;// table_coifits[i] is coifitiont in Ax^n where n = i
var order = 3;
var x_vals;
var y_vals;
var no_of_x=3;//zero based counting
var table_answer_as_decimal = true;
var from;
var to;
var step;
math.config({
  number: 'Fraction'
});
function tablemodeCalculate(push_to_ui,in_x,in_coif){
	//set up
	x_vals = [];
	table_coifits = [];
	
	from = parseFloat(document.getElementById("table_mode_from").value);
	to = parseFloat(document.getElementById("table_mode_to").value);
	step = parseFloat	(document.getElementById("table_mode_step").value);
	console.log(from +"|"+to+"|"+step);
	if((!isNaN(from))&&(!isNaN(to))&&(!isNaN(step))&&step>0&&to>from){
		if(order>x_vals){
			for(var i = order; i>x_vals; i--){
				
			}
		}
		for(var i = 0; from + i*step<=to;i++){
			if(i>no_of_x){
				no_of_x++;
				$("#table_restuls_above").before('<tr> <td><center><input type="text" id="table_x_'+no_of_x+'"></center></td><td><center><p id="table_y_'+no_of_x+'"></p></center></td> </tr>');
			}
			document.getElementById("table_x_"+i).value = (from + i*step);
		}
	}

	if(!push_to_ui){
		//getting values
		for (var i = 0; i < no_of_x+1; i++) {
			if(document.getElementById("table_x_"+i).value){
				x_vals.push(math.eval(document.getElementById("table_x_"+i).value));	
			}else{
				x_vals.push(0);
				document.getElementById("table_x_"+i).value = 0;
			}
			
		};
		console.log(x_vals);
		//checking for undefined and seeting them to zero

		for (var i = 0; i <= order; i++) {
			console.log(i);
			table_coifits.push(math.eval(document.getElementById("coif_"+i).value));
		}

	}else{
		x_vals = in_x;
		table_coifits = in_coif;
	}

	
	y_vals = Array(x_vals.length);

	//calculatign values
	for (var i = 0; i < y_vals.length; i++) {
		y_vals[i] = getYValue(x_vals[i],table_coifits);
	};
	if(!push_to_ui){
		//displaying values
		displayYValues();
	}else{
		return y_vals;
	}
};

function transferCoifitionts(){
	if(coifitionts||coifitionts[0]){
		if(order> coifitionts.length-2){
			for (var i = 0; i <= order; i++) {
				document.getElementById("coif_"+i).value = (coifitionts[coifitionts.length-1-i].n==0)? "0": (coifitionts[coifitionts.length-1-i].d == 1) ? coifitionts[coifitionts.length-1-i].n*coifitionts[coifitionts.length-1-i].s :  coifitionts[coifitionts.length-1-i].s*coifitionts[coifitionts.length-1-i].n +"/" +coifitionts[coifitionts.length-1-i].d;
			};
		}else{
			for(var i = order+1; i<coifitionts.length;i++){
				order++;
				$('#table_mode_input tr:eq(0)').after('<tr id="coif_row_'+order+'"><td><center>\\(x^'+order+'\\)</center></td><td id="inx^'+order+'" height="20px" width="50px"><center><input type="text" id="coif_'+order+'"></center></td></tr>');
			};
			for (var i = 0; i <= order; i++) {
				document.getElementById("coif_"+i).value = (coifitionts[coifitionts.length-1-i].n==0)? "0": (coifitionts[coifitionts.length-1-i].d == 1) ? coifitionts[coifitionts.length-1-i].n*coifitionts[coifitionts.length-1-i].s :  coifitionts[coifitionts.length-1-i].s*coifitionts[coifitionts.length-1-i].n +"/" +coifitionts[coifitionts.length-1-i].d;
			};
			MathJax.Hub.Typeset();
		}
	}
}


function getYValue(x,coifitionts){
	var return_val = 0;
	for(var i = 0; i<coifitionts.length; i++){

		return_val = math.chain(x).pow(i).multiply(coifitionts[i]).add(return_val).done();
	}
	return return_val;
}

function displayYValues(){
	if(y_vals){
		console.log(y_vals);
		for (var i = 0; i < y_vals.length; i++) {

			document.getElementById("table_y_"+i).innerHTML = table_answer_as_decimal ? y_vals[i] : (y_vals[i].d ==1 ? y_vals[i].n: y_vals[i].s*y_vals[i].n +"/"+y_vals[i].d);
		};	
	}
}


$(document).ready(function(){
	$("#tablemode_higher_order").click(function(){
		order++;
		$('#table_mode_input tr:eq(0)').after('<tr id="coif_row_'+order+'"><td><center>\\(x^'+order+'\\)</center></td><td id="inx^'+order+'" height="20px" width="50px"><center><input type="text" id="coif_'+order+'"></center></td></tr>');
		MathJax.Hub.Typeset()
	});

	$("#tablemode_lower_order").click(function(){
		
		if(order>1){
			$("#coif_row_"+order).remove();
			order--;	
		}
	});

	$('#table_add_input_row').click(function(){
		no_of_x++;
		$("#table_restuls_above").before('<tr> <td><center><input type="text" id="table_xf_'+no_of_x+'"></center></td><td><center><p id="table_y_'+no_of_x+'"></p></center></td> </tr>');
	});

	$('#table_delete_input_row').click(function(){
		if(no_of_x>0){
			$("#table_restuls_above").prev().remove();
			no_of_x--;
		}
	})

	$('#table_radio_frac').click(function(){
		console.log("frac");
		table_answer_as_decimal = false;
		displayYValues();
	});
	
	$('#table_radio_decimal').click(function(){
		console.log("decimal");
		table_answer_as_decimal = true;
		displayYValues();
	});
})
