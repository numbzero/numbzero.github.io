
function	getDataAboutObjects() {
	let 	numberOfObjects = document.getElementById('numberOfObjects').value;
	let 	numberOfMonths  = document.getElementById('numberOfMonths').value;

	if ((isNaN(numberOfObjects) || (numberOfObjects < 0)) ||
		(isNaN(numberOfMonths) || (numberOfMonths < 0))) {
		console.log(numberOfObjects);
		console.log(numberOfMonths);
		alert('Inputs data is invalid!!!');
	} else {
		getObjectValues(numberOfObjects, numberOfMonths);
	}
}

function	getObjectValues(numberOfObjects, numberOfMonths) {
	const	divObjectValues = document.getElementById('objectValues');
	let 	table = document.createElement('table');
	let 	thead = document.createElement('thead');
	let 	tbody = document.createElement('tbody');
	let 	headRow = document.createElement('tr');

	table.className = 'tableXYZ';
	
	/*
	 * Head part.
	 *
	 * Empty cell */
	let 	th = document.createElement('th');
	headRow.appendChild(th);
	/* Months collumns */
	for (let i = 0; i < numberOfMonths; i++) {
		th = document.createElement('th');
		th.appendChild(document.createTextNode(i + 1));
		headRow.appendChild(th);
	}
	thead.appendChild(headRow);

	/*
	 * Body part.
	 */
	let 	bodyRow;
	let 	td;
	let 	input;
	for (let i = 0; i < numberOfObjects; i++) {
	 	/* Object name (or index) */
	 	bodyRow = document.createElement('tr');
	 	td = document.createElement('td');
	 	td.appendChild(document.createTextNode(i + 1));
	 	bodyRow.appendChild(td);
	 	for (let j = 0; j < numberOfMonths; j++) {
	 		td = document.createElement('td');
	 		/* Inputs */
	 		input = document.createElement('input');
	 		input.type = 'text';
	 		input.name = 'array_' + i + '[]';
	 		input.required = true;
	 		td.appendChild(input); 
	 		bodyRow.appendChild(td);
	 	}
	 	tbody.appendChild(bodyRow);
	}

	/*
	 * Button.
	 */
	let		button = document.createElement('input');
	button.type = 'button';
	button.value = 'Calculate';
	button.setAttribute('onclick', 'makeCalculations(' + numberOfObjects + ', ' + numberOfMonths + ')');

	/* Append all to div */
	table.appendChild(thead);
	table.appendChild(tbody);
	divObjectValues.appendChild(table);
	divObjectValues.appendChild(button);
}

function	makeCalculations(numberOfObjects, numberOfMonths) {
	/*
	 * Get all values.
	 */
	let 	objects = [];
	for (let i = 0; i < numberOfObjects; i++) {
		let 	inputsOfObject = []
		let 	array = document.getElementsByName('array_' + i + '[]');
		for (let j = 0; j < array.length; j++) {
			let 	value = array[j].value;
			if (isNaN(value)) {
				alert('Invalid input!!!');
				return ;
			} else {
				inputsOfObject.push(Number(value));
			}
		}
		let 	object = {
			array: inputsOfObject.slice(),
			someSum: 0,
			average: 0,
			variation_coeffiecient: 0,
			divisionXYZ: ''
		}
		objects.push(object);
	}
	console.log(objects);

	/*
	 * Calculate average for all objects.
	 */
	for (let i = 0; i < objects.length; i++) {
		objects[i].average = objects[i].array.reduce((accumulator, curentValue) =>
			accumulator + curentValue, 0) / objects[i].array.length;
	}

	/*
	 * Get the coefficient of variation.
	 */
	for (let i = 0; i < objects.length; i++) {
		let 	sum = 0;
		for (let j = 0; j < objects[i].array.length; j++) {
			sum += Math.pow((objects[i].array[j] - objects[i].average), 2);
		}
		objects[i].someSum = sum / objects[i].array.length;
		objects[i].variation_coeffiecient = (Math.sqrt(sum / objects[i].array.length) / objects[i].average) * 100;
	}

	/*
	 * Find the division XYZ.
	 */
	for (let i = 0; i < objects.length; i++) {
		if (objects[i].variation_coeffiecient >= 0 && objects[i].variation_coeffiecient <= 10) {
			objects[i].divisionXYZ = 'X';
		}
		else if (objects[i].variation_coeffiecient >= 10 && objects[i].variation_coeffiecient <= 25) {
			objects[i].divisionXYZ = 'Y';
		}
		else if (objects[i].variation_coeffiecient >= 25) {
			objects[i].divisionXYZ = 'Z';
		}
	}

	console.log(objects);
	generateTable(objects, numberOfMonths);
}

function	generateTable(objects, numberOfMonths) {
	const 	divTableXYZ = document.getElementById('tableXYZ');
	let 	table = document.createElement('table');
	let 	thead = document.createElement('thead');
	let 	tbody = document.createElement('tbody');

	table.className = 'tableXYZ';

	console.log(objects);
	/*
	 * Table head.
	 */
	let 	tr = document.createElement('tr');
	let 	th;
	for (let i = 0; i < 4 + numberOfMonths; i++) {
		th = document.createElement('th');
		th.appendChild(document.createTextNode(i + 1));
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	tr = document.createElement('tr');
	th = document.createElement('th');
	th.rowSpan = 2;
	th.appendChild(document.createTextNode('Obiecte'));
	tr.appendChild(th);
	th = document.createElement('th');
	th.appendChild(document.createTextNode('Vinzari inregistrate, (unitati)'));
	th.colSpan = numberOfMonths;
	tr.appendChild(th);
	th = document.createElement('th');
	th.appendChild(document.createTextNode('avg.x'));
	th.rowSpan = 2;
	tr.appendChild(th);
	th = document.createElement('th');
	th.appendChild(document.createTextNode('Coeficientul de variatie, (v, %)'));
	th.rowSpan = 2;
	tr.appendChild(th);
	th = document.createElement('th');
	th.appendChild(document.createTextNode('Divizarea XYZ'));
	th.rowSpan = 2;
	tr.appendChild(th);
	thead.appendChild(tr);
	tr = document.createElement('tr');
	for (let i = 0; i < numberOfMonths; i++) {
		th = document.createElement('th');
		th.appendChild(document.createTextNode(i + 1));
		tr.appendChild(th);
	}
	thead.appendChild(tr);

	/*
	 * Table body.
	 */
	for (let i = 0; i < objects.length; i++) {
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.appendChild(document.createTextNode(i + 1));
		tr.appendChild(td);
		for (let j = 0; j < objects[i].array.length; j++) {
			td = document.createElement('td');
			td.appendChild(document.createTextNode(objects[i].array[j]));
			tr.appendChild(td);
		}
		td = document.createElement('td');
		td.appendChild(document.createTextNode((objects[i].average).toFixed(2)));
		tr.appendChild(td);		
		td = document.createElement('td');
		td.appendChild(document.createTextNode((objects[i].variation_coeffiecient).toFixed(2)));
		tr.appendChild(td);
		td = document.createElement('td');
		td.appendChild(document.createTextNode(objects[i].divisionXYZ));
		tr.appendChild(td);
		tbody.appendChild(tr);
	}

	/* Final part for table. */
	table.appendChild(thead);
	table.appendChild(tbody);
	divTableXYZ.appendChild(table);

	generateCalculations(objects);
}

function	generateCalculations(objects) {
	const	divStepByStepXYZ = document.getElementById('stepByStepXYZ');

	let 	paragraph;
	for (let i = 0; i < objects.length; i++) {
		/* How the fuck to generate that shit ... */
		paragraph = document.createElement("p");
		paragraph.id = 'math_' + i;
		paragraph.innerHTML = 'V.' + (i + 1) + ') \\(\\sqrt' + objects[i].someSum.toFixed(2) + 
							  '\\over' + objects[i].average.toFixed(2) +
							  ' \\) \\(\\times 100\\) = ' + 
							  objects[i].variation_coeffiecient.toFixed(2);
		document.body.insertBefore(paragraph, divStepByStepXYZ);
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'math_' + i]);
	
	}
}