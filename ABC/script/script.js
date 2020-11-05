
function	getNumberOfObjects() {
	let	numberOfObjects; 
	let	response;

	numberOfObjects = document.getElementById("numberOfObjects").value;
	if (isNaN(numberOfObjects) || (numberOfObjects < 0)) {
		alert("Input is not valid!");
	} else {
		getObjectValues(numberOfObjects);
	}
}

function	getObjectValues(numberOfObjects) {
	const	divObjects = document.getElementById("objects");
	let		label;
	let		br;
	let		input;
	let		inputButton;

	br = document.createElement("br");
	for (let i = 1; i <= numberOfObjects; i++) {
		br = document.createElement("br");
		label = document.createElement("label");
		label.innerHTML = i + ' ';
		input = document.createElement("input");
		input.type = "text";
		input.name = "array[]";
		input.required = true;
		divObjects.appendChild(label);
		divObjects.appendChild(input);
		divObjects.appendChild(br);
	}
	inputButton = document.createElement("input");
	inputButton.type = "button";
	inputButton.value = "Calculate";
	inputButton.onclick = makeCalculations;
	divObjects.appendChild(inputButton);	
}

function 	validateValues(objectInputs) {
	let 	value;

	for (let i = 0; i < objectInputs.length; i++) {
		value = objectInputs[i].value;
		if (isNaN(value) || (value < 0)) return false;
	}
	return true;
}

function	makeCalculations() {
	let		objectInputs = document.getElementsByName('array[]');
	let 	objectInputsArray = [];
	let 	objectInputsArrayDescending;
	let 	total;
	let 	average;
	let 	half_from_average;
	let 	sum_of_percent;
	let 	total_A;
	let 	total_B;
	let 	total_C;

	if (validateValues(objectInputs) == false) {
		alert('Invalid data');
		return ;
	}

	for (let i = 0; i < objectInputs.length; i++) {
		let obj = {	value: Number(objectInputs[i].value), 
					index: i + 1,
					percent: 0,
					cumul_percent: 0,
					category: ''
		};
		objectInputsArray.push(obj);
	}
	
	/* Getting the total */
	total = objectInputsArray.reduce((accumulator, currentValue) => 
			accumulator + currentValue.value, 0);
	console.log(total); 

	/* Get the percent */
	for (let i = 0; i < objectInputsArray.length; i++) {
		objectInputsArray[i].percent = (objectInputsArray[i].value / total) * 100;
	}
	console.log(objectInputsArray);

	/* Descending sorting */
	objectInputsArrayDescending = objectInputsArray.slice().sort(function(a, b) {
		return b.value - a.value;
	});
	console.log(objectInputsArrayDescending);


	/* Get average */
	average = total / objectInputsArray.length;
	/* Get a half from average */
	half_from_average = average / 2;

	/* Find category of objects */
	total_A = 0;
	total_B = 0;
	total_C = 0;
	sum_of_percent = 0;
	for (let i = 0; i < objectInputsArrayDescending.length; i++) {
		if (objectInputsArrayDescending[i].value > average) {
			objectInputsArrayDescending[i].category = 'A';
			total_A++;
		}
		else if (objectInputsArrayDescending[i].value > half_from_average &&
					objectInputsArrayDescending[i].value < average) {
			objectInputsArrayDescending[i].category = 'B';
			total_B++;
		}
		else {
			objectInputsArrayDescending[i].category = 'C';
			total_C++;
		}
		sum_of_percent += objectInputsArrayDescending[i].percent;
		objectInputsArrayDescending[i].cumul_percent = sum_of_percent;
	}

	let 	totalObj = {
		total: total,
		total_A: total_A,
		total_B: total_B,
		total_C: total_C
	};

	generateTable(objectInputsArray, objectInputsArrayDescending, totalObj);
}

function	generateTable(objectInputsArray, objectInputsArrayDescending, totalObj) {
	let 	divTableABC = document.getElementById("tableABC");
	let 	table = document.createElement("table");

	table.className = "tableABC";
	let 	thead = document.createElement("thead");
	let 	tbody = document.createElement("tbody");
	let 	th;

	/* Number of column */
	let 	headRow_1 = document.createElement("tr");
	for (let i = 1; i <= 8; i++) {
		th = document.createElement("th");
		th.appendChild(document.createTextNode(i));
		headRow_1.appendChild(th);
	}

	/* Name of column */
	let 	headRow_2 = document.createElement("tr");
	["Obiecte",
	 "Contributia obiectului, (unitati)",
	 "Ponderea obiectului, (%)",
	 "Obiecte",
	 "Contributia obiectului, (unitati)",
	 "Ponderea obiectului, (%)",
	 "Ponderea cumulativa, (%)",
	 "Divizarea ABC"].forEach(function(element) {
	 	th = document.createElement("th");
	 	th.appendChild(document.createTextNode(element));
	 	headRow_2.appendChild(th);
	 });

	 console.log(objectInputsArray);
	 console.log(objectInputsArrayDescending);
	 let 	objectRow;
	 let 	td;
	 let 	flag_A = true;
	 let 	flag_B = true;
	 let 	flag_C = true;
	 let 	percent = 0;

	 console.log(totalObj);

	 for (let i = 0; i < objectInputsArray.length; i++) {
	 	objectRow = document.createElement("tr");
	 	/* Index */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArray[i].index));
	 	objectRow.appendChild(td);	 	
	 	/* Value */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArray[i].value));
	 	objectRow.appendChild(td);
	 	/* Percent */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArray[i].percent.toFixed(2)));
	 	objectRow.appendChild(td);
	 	/* Index of descending array element by value */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArrayDescending[i].index));
	 	objectRow.appendChild(td);
	 	/* Value of descending array element by value */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArrayDescending[i].value));
	 	objectRow.appendChild(td);
	 	/* Percent of descending array element by value */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArrayDescending[i].percent.toFixed(2)));
	 	objectRow.appendChild(td);
	 	/* Cumulative percent of descending array element by value */
	 	td = document.createElement("td");
	 	td.appendChild(document.createTextNode(objectInputsArrayDescending[i].cumul_percent.toFixed(2)));
	 	objectRow.appendChild(td);

	 	if (objectInputsArrayDescending[i].category == 'A' && flag_A) {
	 		td = document.createElement("td");
	 		td.rowSpan = totalObj.total_A;
	 		percent = (totalObj.total_A / objectInputsArrayDescending.length) * 100;
	 		td.appendChild(document.createTextNode('A=' + totalObj.total_A + 'prod=' + percent.toFixed(2) + '%'));
	 		objectRow.appendChild(td);
	 		flag_A = false;
	 	}
	 	if (objectInputsArrayDescending[i].category == 'B' && flag_B) {
	 		td = document.createElement("td");
	 		td.rowSpan = totalObj.total_B;
	 		percent = (totalObj.total_B / objectInputsArrayDescending.length) * 100;
	 		td.appendChild(document.createTextNode('B=' + totalObj.total_B + 'prod=' + percent.toFixed(2) + '%'));
	 		objectRow.appendChild(td);
	 		flag_B = false;
	 	}
	 	if (objectInputsArrayDescending[i].category == 'C' && flag_C) {
	 		td = document.createElement("td");
	 		td.rowSpan = totalObj.total_C;
	 		percent = (totalObj.total_C / objectInputsArrayDescending.length) * 100;
	 		td.appendChild(document.createTextNode('C=' + totalObj.total_C + 'prod=' + percent.toFixed(2) + '%'));
	 		objectRow.appendChild(td);
	 		flag_C = false;
	 	}
		tbody.appendChild(objectRow);	
	}
	/*
		Last row
	*/
	/* Name "Total" */
	objectRow = document.createElement("tr");
	td = document.createElement("td");
	td.appendChild(document.createTextNode("Total"));
	objectRow.appendChild(td);
	/* Total of values */
	td = document.createElement("td");
	td.appendChild(document.createTextNode(totalObj.total));
	objectRow.appendChild(td);
	/* Total percent */
	td = document.createElement("td");
	td.appendChild(document.createTextNode(100));
	objectRow.appendChild(td);
	/* 5 empty cells */
	for (let i = 0; i < 5; i++) {
		td = document.createElement("td");
		td.appendChild(document.createTextNode("-"));
		objectRow.appendChild(td);
	}
	tbody.appendChild(objectRow);

	thead.appendChild(headRow_1);
	thead.appendChild(headRow_2);
	table.appendChild(tbody);
	table.appendChild(thead);
	divTableABC.appendChild(table);
}