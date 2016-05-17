var table_coifits;// table_coifits[i] is coifitiont in Ax^n where n = i
var order = 3;
var x_vals;
var y_vals;
var no_of_x=3;//zero based counting
math.config({
  number: 'Fraction'
});
function tablemodeCalculate(push_to_ui,in_x,in_coif){
	//set up
	x_vals = [];
	table_coifits = [];
	if(!push_to_ui){
		//getting values

		for (var i = 0; i < no_of_x+1; i++) {
			x_vals.push(document.getElementById("table_x_"+i).value);
		};
		
		for (var i = 0; i <= order; i++) {
			console.log(i);
			table_coifits.push(document.getElementById("coif_"+i).value);	
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
		for (var i = 0; i < y_vals.length; i++) {
			document.getElementById("table_y_"+i).innerHTML = y_vals[i];
		};	
	}else{
		return y_vals;
	}
};

function transferCoifitionts(){
	if(coifitionts[0]){
		if(order> coifitionts.length-2){
			for (var i = 0; i <= order; i++) {
				document.getElementById("coif_"+i).value = coifitionts[coifitionts.length-1-i];
			};
		}else{
			for(var i = order+1; i<coifitionts.length;i++){
				order++;
				$('#table_mode_input tr:eq(0)').after('<tr id="coif_row_'+i+'"><td><center>x^'+i+'</center></td><td id="inx^'+i+'" height="20px" width="50px"><center><input type="number" id="coif_'+i+'"></center></td></tr>');
			};
			for (var i = 0; i <= order; i++) {
				document.getElementById("coif_"+i).value = coifitionts[coifitionts.length-1-i];
			};
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


$(document).ready(function(){
	$("#tablemode_higher_order").click(function(){
		order++;
		$('#table_mode_input tr:eq(0)').after('<tr id="coif_row_'+order+'"><td><center>x^'+order+'</center></td><td id="inx^'+order+'" height="20px" width="50px"><center><input type="number" id="coif_'+order+'"></center></td></tr>');
	});

	$("#tablemode_lower_order").click(function(){
		
		if(order>1){
			$("#coif_row_"+order).remove();
			order--;	
		}
	});

	$('#table_add_input_row').click(function(){
		no_of_x++;
		$("#table_restuls_above").before('<tr> <td><center><input type="number" id="table_x_'+no_of_x+'"></center></td><td><center><p id="table_y_'+no_of_x+'"></p></center></td> </tr>');
	});

	$('#table_delete_input_row').click(function(){
		if(no_of_x>0){
			$("#table_restuls_above").prev().remove();
			no_of_x--;
		}
	})
})
