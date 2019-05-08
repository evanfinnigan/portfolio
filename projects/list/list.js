var idNum = 0;

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	
	if (ev.target.classList.contains("drag_box"))
	{
		ev.target.parentElement.appendChild(document.getElementById(data));
	}
	else {
		ev.target.appendChild(document.getElementById(data));
	}
}

function addItem() {
	var txt = document.getElementById("insert").value;
	
	// Check img URL
	if (txt.match(/\.(jpeg|jpg|gif|png)$/) == null)
	{
		window.alert("Invalid Image URL!");
		return;
	}
	
	document.getElementById("insert").value = "";

	//newItem.innerHTML = txt;
	var img = document.createElement("img");
	img.setAttribute("id", ("newItem" + window.idNum));
	idNum++;
	img.setAttribute("class", "drag_box");
	img.setAttribute("draggable", "true");
	img.setAttribute("ondragstart", "drag(event)");
	img.src = txt;
	
	document.getElementById("unrank_box").appendChild(img);
}

function checkURL(url) {
	
}

function clearItems() {
	var unrank_box = document.getElementById("unrank_box");
	
	while (unrank_box.firstChild)
	{
		unrank_box.removeChild(unrank_box.firstChild);
	}
}