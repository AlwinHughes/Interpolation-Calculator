<html>
<head>
	<title>Intermpolation</title>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script> 
		<link rel="stylesheet" type="text/css" href="css.css">
		<script type="text/javascript" src="calculate.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/mathjs/3.2.1/math.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	</head>
<body>
	<center><h1>Interpolation</h1></center>
	
	<center>
	<table id="value_table">
		<tr>
			<td><center>x</center></td>
			<td><center>f(x)</center></td>
		</tr>
		<tr id="row_0">
			<td><input type="number" id="X_0"></td>
			<td><input type="number" id="Y_0"></td>
		</tr>
		<tr id="row_1">
			<td><input type="number" id="X_1"></td>
			<td><input type="number" id="Y_1"></td>
		</tr>
		<tr id="row_2">
			<td><input type="number"id="X_2"></td>
			<td><input type="number" id="Y_2"></td>
		</tr>
		<trid="row_3">
			<td><input type="number"id="X_3"></td>
			<td><input type="number"id="Y_3"></td>
		</tr>

	</table>
	</center>
	<br>
	<br>
	<center>
		<button text="calculate" onclick="calculate()">Calculate!</button>
	</center>
	<center>
		<button onclick="deleteRow()">Delete Row</button>
	</center>
	<center>
		<button onclick="addRow()">Add row</button>
	</center>


</body>
</htm>