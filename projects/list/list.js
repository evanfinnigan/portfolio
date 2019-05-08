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