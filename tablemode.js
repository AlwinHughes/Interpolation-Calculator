var table_coifits;// table_coifits[i] is coifitiont in Ax^n where n = i
var order = 3;
var x_vals;
var y_vals;

function tablemodeCalculate(){
	//set up
	x_vals = [];
	table_coifits = [];
	
	//getting values
	for (var i = 0; i < 3; i++) {
		x_vals.push(document.getElementById("table_x_"+i).value);
	};
	
	for (var i = 0; i <= order; i++) {
		table_coifits.push(document.getElementById("coif_"+i).value);	
	}
	
	y_vals = Array(x_vals.length);

	//calculatign values
	for (var i = 0; i < y_vals.length; i++) {
		y_vals[i] = getYValue(x_vals[i],table_coifits);
	};
	
	//displaying values
	for (var i = 0; i < y_vals.length; i++) {
		document.getElementById("table_y_"+i).innerHTML = y_vals[i];
	};

};


function getYValue(x,coifitionts){
	var return_val = 0;
	for(var i = 0; i<coifitionts.length; i++){
		console.log(Math.pow(x,i)*coifitionts[i]);
		return_val += Math.pow(x,i)*coifitionts[i];
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
	})
})
