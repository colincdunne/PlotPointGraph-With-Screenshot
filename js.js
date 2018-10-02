$(window).load(function(){	
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var xAxis = 75;
var yAxis = 265;
var margin = 95;

var weekDays = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0
}
//Sets the content in the combo boxes and what each number means on the Y-Axis
var dropdownOptions = [{
    val: 0,
    text: "0"
}, {
    val: 10,
    text: "5" 
}, {
    val: 20,
    text: "10"
}, {
    val: 30,
    text: "15"
}, {
    val: 40,
    text: "20"
}, {
    val: 50,
    text: "25"
},  {
    val: 60,
    text: "30"
},  {
    val: 70,
    text: "35"
},  {
    val: 80,
    text: "40"
},  {
    val: 90,
    text: "45"
},  {
    val: 100,
    text: "50"
},  {
    val: 110,
    text: "55"
},  {
    val: 120,
    text: "60"
},  {
    val: 130,
    text: "65"
},  {
    val: 140,
    text: "70"
},  {
    val: 150,
    text: "75"
},  {
    val: 160,
    text: "80"
},   {
    val: 170,
    text: "85"
},    {
    val: 180,
    text: "90"
},    {
    val: 200,
    text: "100"
}, ];

//Builds the HTML combo box elements.
for (var dayName in weekDays) {

    var select = $('<select>').attr("id", dayName).addClass("graphData").appendTo('#comboDiv');
    $(dropdownOptions).each(function () {
        select.append($("<option>").attr('value', this.val).text(this.text));
    });
};
//Redraws the graph accordingly to the chosen option.
$(".graphData").change(function (e) {
    weekDays[this.id] = $(this).val();
    draw();
});
draw();

function draw() {
	ctx.strokeStyle="#000000";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var i = 0;
    for (var day in weekDays) {
        var value = weekDays[day];
        if (day == "Sunday") {
            ctx.moveTo(xAxis + margin * (i++), yAxis - weekDays[day]);
        } else {
            ctx.lineTo(xAxis + margin * (i++), yAxis - weekDays[day]);
        }

    }
    ctx.stroke();

	//This creates the X-Axis line along the bottom of the graph and the Y-Axis along the left hand side of the graph.
	ctx.beginPath();
	ctx.moveTo(20,20);
	ctx.lineTo(20,265);
	ctx.lineTo(690,265);
	ctx.stroke();

    var i = 0;
    for (var day in weekDays) {
        var value = weekDays[day];
        ctx.beginPath();
		//Creates the circles on the graph.
        ctx.arc(xAxis + margin * (i++), yAxis - value, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
	//Adds each day of the week to the graph at specified co-ordinates.
	ctx.font = "16px Arial";
	ctx.fillText("Monday",45,290);
	ctx.fillText("Tuesday",140,290);
	ctx.fillText("Wednesday",223,290);
	ctx.fillText("Thursday",325,290);
	ctx.fillText("Friday",433,290);
	ctx.fillText("Saturday",520,290);
	ctx.fillText("Sunday",620,290);
}

});

function image() {
	//Saves the canvas data as Data URL(PNG Format).
	var dataURL = canvas.toDataURL();
    //Displays the Data URL into the chosen DIV.
    //document.getElementById('canvasImage').src = dataURL;
	var img = $('<img />', { 
	id: 'graphImages',
	src: dataURL,
	alt: 'Graph',
	height: '105',
	width: '205',
	onclick: "document.getElementById('centerpic').src = this.src; document.getElementById('lightboxDisplay').style.display = 'block';"
});
img.appendTo($('#imageHolder'));
}

function addTitle() {
	var x = document.getElementById("titleName").value;
    var ctx = canvas.getContext("2d");
	//Removes old text by removing the specified rectangular area.
	ctx.clearRect(50, 10, 1000, 45);
	ctx.font = "25px Arial";
	//Displays the input from the textbox onto the canvas at specified co-ordinates.
	ctx.fillText(x,500,50);
	document.getElementById("titleName").value= "";
}

document.getElementById("titleName")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("addTitleButton").click();
    }
});

$(document).keyup(function(e) { 
	if (e.keyCode == 27) { // esc keycode
		$('#lightboxDisplay').hide();
	}
});

function imgWindow() {
	//Opens the saved image in a new window when clicked.
	window.open(document.getElementById('centerpic').src) 
}