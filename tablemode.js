var table_coifits;
var order = 3;
var x_vals;
function tablemodeCalculate(){
	//set up
	x_vals = [];
	for (var i = 0; i < order; i++) {
		x_vals.push(document.getElementById("table_x_"+i).value);
	};
	console.log(x_vals);
};
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
