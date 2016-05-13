var table_coifits;
var order = 3;
function tablemodeCalculate(){

};
$(document).ready(function(){
	$("#tablemode_add_row").click(function(){
		order++;
		$('#table_mode_input tr:eq(0)').after('<tr id="coif_row_'+order+'"><td><center>x^'+order+'</center></td><td id="inx^'+order+'" height="20px" width="50px"><center><input type="number" id="coif_'+order+'"></center></td></tr>');
	});

	$("#tablemode_delete_row").click(function(){
		
		if(order>1){
			$("#coif_row_"+order).remove();
			order--;	
		}
	})
})
