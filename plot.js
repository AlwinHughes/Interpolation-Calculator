var function_string;
function plotGraph () {
	function_string = "";
	math.config({
  		number: 'number'
	});
	try{
		if(coifitionts){
			for (var i = 0; i <coifitionts.length; i++) {
				
				if(coifitionts[i]>0){
					function_string += "+" + coifitionts[i]+"*x^"+(coifitionts.length-i-1); 
				}else{
					function_string += "-" + math.abs(coifitionts[i])+"*x^"+(coifitionts.length-i-1);
				}
			};
		}
		if(function_string.charAt(0)=="+"){
			latex_string = latex_string.substring(1);
		}
		console.log(function_string);
		functionPlot({
			target: "#plot",
			data: [{
				fn: function_string,
				sampler: 'builtIn',
				graphType: 'polyline'
			}]
		});
	}catch(e){
		alert("could not plot: "+e );
	}
}