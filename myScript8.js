///////////////////////////CREATE THE GRID//////////////////////////////////
//name is the svg1, svg2, etc
function createGrid(name){
	var svgns = "http://www.w3.org/2000/svg";
	for (var x = 0; x < 1000; x += 10) {
    	for (var y = 0; y < 550; y += 10) {
       		var rect = document.createElementNS(svgns, 'rect');
        	rect.setAttributeNS(null, 'x', x);
        	rect.setAttributeNS(null, 'y', y);
        	rect.setAttributeNS(null, 'height', '10');
        	rect.setAttributeNS(null, 'width', '10');
        	rect.setAttributeNS(null, 'class', 'unit');
        	rect.setAttributeNS(null, 'id', 'unit'+ name + '.' +x+'.'+y);
        	document.getElementById(name).appendChild(rect);
        	var id = 'unit'+ name +'.' +x+'.'+y;
        	document.getElementById(id).onmouseout = function() {onmouseoutSet(this.id);};
        	document.getElementById(id).onmousedown = function() {onmousedownSet(this.id);};
        	document.getElementById(id).onmouseover = function() {onmouseoverSet(this.id);};
        	document.getElementById(id).onmouseup = function() {onmouseupSet();};
        	document.getElementById(id).ondblclick = function() {ondblclickSet(this.id, name);};
        	document.getElementById(id).onclick = function() {onclickSet(this.id, name);};
    	}
	}
}

var w = window.innerWidth;
var h = window.innerHeight;

var offsetX = (w - 1000)/2;

function centerSVG(name){
	document.getElementById(name).style.marginLeft = offsetX - 10;
}

function createBaseLine(canvas){
	var baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    	baseLine.setAttribute('x1', 0);
    	baseLine.setAttribute('y1', 400);
    	baseLine.setAttribute('x2', 1000);
    	baseLine.setAttribute('y2', 400);
    	baseLine.setAttribute('stroke', 'rgb(105, 105, 105)');
    	baseLine.setAttribute('stroke-width', 1);

    	document.getElementById(canvas).appendChild(baseLine);
    	var id = 'baseLine';

    	return baseLine;
    	console.log("ok1");
}

function createCenterLine(canvas){
    var centerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    	centerLine.setAttribute('x1', 500);
    	centerLine.setAttribute('y1', 0);
    	centerLine.setAttribute('x2', 500);
    	centerLine.setAttribute('y2', 550);
    	centerLine.setAttribute('stroke', 'rgb(105, 105, 105)');
    	centerLine.setAttribute('stroke-width', 1);

    	document.getElementById(canvas).appendChild(centerLine);
    	var id = 'centerLine';

    	return centerLine;
    	console.log("ok2");
}

function onLoadSet(name){
	centerSVG(name);
	createGrid(name);
	createBaseLine(name);
	createCenterLine(name);
}


/////////////////////////////////button toggles////////////////////////////////

var gridMode = true;
var sketchMode = false;
var finetuneMode = false;
var pencil = true;
var eraser = false;
var ghostMode = false;
var ghostModeTab; //id of tab containing svg

var currentTab = 'tab1'; //id of tab that is showing, default is first tab

function toggleGrid(){

	console.log("hello");
	var img = document.getElementById("gridmode_img");

	if(img.src.match("grid_mode_on")){
		img.src = "grid_mode.svg";
		gridMode = false;
	} else {
		img.src = "grid_mode_on.svg";
		gridMode = true;

		document.getElementById("sketchmode_img").src = "sketch_mode.svg";
		sketchMode = false;
	}
}

function toggleSketch(){

	console.log("hello");
	var img = document.getElementById("sketchmode_img");

	if(img.src.match("sketch_mode_on")){
		img.src = "sketch_mode.svg";
		sketchMode = false;
	} else {
		img.src = "sketch_mode_on.svg";
		sketchMode = true;

		document.getElementById("gridmode_img").src = "grid_mode.svg";
		gridMode = false;
	}
	console.log(sketchMode);
}

function toggleRefine(){

	console.log("hello");
	var img = document.getElementById("refinemode_img");
				
	if(img.src.match("finetune_mode_error")){
		img.src = "finetune_mode.svg";
		// finetuneMode = false;
	} else {
		img.src = "finetune_mode_error.svg";
		// finetuneMode = true;
	}
}

function togglePencil(){

	console.log("hello");
	var img = document.getElementById("pencil_img");

	if(img.src.match("pencil_on")){
		img.src = "pencil.svg";
		pencil = false;
	} else {
		img.src = "pencil_on.svg";
		pencil = true;

		//turn off eraser
		document.getElementById("eraser_img").src = "eraser.svg";
		eraser = false;		
	}
}

function toggleEraser(){

	console.log("hello");
	var img = document.getElementById("eraser_img");

	if (img.src.match("eraser_on")){
		img.src = "eraser.svg";
		eraser = false;
	} else {
		img.src = "eraser_on.svg";
		eraser = true;

		//turn off pencil
		document.getElementById("pencil_img").src = "pencil.svg";
		pencil = false;

		//reset drag (to get around bug)
		drag = "False";
	}
}

function toggleGhost(){

	//ghostMode = !ghostMode;

	var img = document.getElementById("ghost_img");

	if(img.src.match("ghost_mode_on")){
		img.src = "ghost_mode.svg";
		ghostMode = false;
		ghostModeTab = undefined;
		console.log("ghostMode is off");
		console.log(ghostModeTab);
	} else {
		img.src = "ghost_mode_on.svg";
		ghostMode = true;
		ghostModeTab = currentTab;
		console.log("ghostMode is on");
		console.log(ghostModeTab);
	}
}


/////////////////////////INSTRUCTION POPUP/////////////////////////////////
var grid_instr = document.getElementById("gridmode");
var sketch_instr = document.getElementById("sketchmode");
var fine_instr = document.getElementById("refinemode");
var pencil_instr = document.getElementById("pencil");
var eraser_instr = document.getElementById("eraser");
var ghost_instr = document.getElementById("ghostmode");

// grid_instr.onmouseover = function(){
// 	document.getElementById("gridmode_caption").style.marginLeft = (offsetX -72)+ "px";
// 	document.getElementById("gridmode_caption").style.display = 'block';
// 	console.log(document.getElementById("gridmode_caption").style.marginLeft);
// }

var grid_timeout;
grid_instr.onmouseover = function(){
	grid_timeout = window.setTimeout(grid_helper, 1500);
}
function grid_helper(){
	document.getElementById("gridmode_caption").style.marginLeft = (offsetX -72)+ "px";
	document.getElementById("gridmode_caption").style.display = 'block';
	console.log(document.getElementById("gridmode_caption").style.marginLeft);
}
grid_instr.onmouseout = function(){
	window.clearTimeout(grid_timeout);
	document.getElementById("gridmode_caption").style.display = 'none';
}

var sketch_timeout;
sketch_instr.onmouseover = function(){
	sketch_timeout = window.setTimeout(sketch_helper, 1500);
}
function sketch_helper(){
	document.getElementById("sketchmode_caption").style.marginLeft = (offsetX + 11) + "px";
	document.getElementById("sketchmode_caption").style.display = 'block';
	console.log(document.getElementById("sketchmode_caption").style.marginLeft);	
}
sketch_instr.onmouseout = function(){
	window.clearTimeout(sketch_timeout);
	document.getElementById("sketchmode_caption").style.display = 'none';
}

var fine_timeout;
fine_instr.onmouseover = function(){
	fine_timeout = window.setTimeout(fine_helper, 1500);
}
function fine_helper(){
	document.getElementById("finetunemode_caption").style.marginLeft = (offsetX + 85 + 11) + "px";
	document.getElementById("finetunemode_caption").style.display = 'block';
	console.log(document.getElementById("finetunemode_caption").style.marginLeft);
}
fine_instr.onmouseout = function(){
	window.clearTimeout(fine_timeout);
	document.getElementById("finetunemode_caption").style.display = 'none';
}

var pencil_timeout;
pencil_instr.onmouseover = function(){
	pencil_timeout = window.setTimeout(pencil_helper, 1500);
}
function pencil_helper(){
	document.getElementById("pencil_caption").style.marginLeft = (offsetX + 578 + 85 + 13) + "px";
	document.getElementById("pencil_caption").style.display = 'block';
	console.log(document.getElementById("pencil_caption").style.marginLeft);
}
pencil_instr.onmouseout = function(){
	window.clearTimeout(pencil_timeout);
	document.getElementById("pencil_caption").style.display = 'none';
}

var eraser_timeout;
eraser_instr.onmouseover = function(){
	eraser_timeout = window.setTimeout(eraser_helper, 1500);
}
function eraser_helper(){
	document.getElementById("eraser_caption").style.marginLeft = (offsetX + 578 + 2*85 + 13) + "px";
	document.getElementById("eraser_caption").style.display = 'block';
	console.log(document.getElementById("eraser_caption").style.marginLeft);
}
eraser_instr.onmouseout = function(){
	window.clearTimeout(eraser_timeout);
	document.getElementById("eraser_caption").style.display = 'none';
}

var ghost_timeout;
ghost_instr.onmouseover = function(){
	ghost_timeout = window.setTimeout(ghost_helper, 1500);
}
function ghost_helper(){
	document.getElementById("ghostmode_caption").style.marginLeft = (offsetX + 578 + 3*85 + 13) + "px";
	document.getElementById("ghostmode_caption").style.display = 'block';
	console.log(document.getElementById("ghostmode_caption").style.marginLeft);
}
ghost_instr.onmouseout = function(){
	window.clearTimeout(ghost_timeout);
	document.getElementById("ghostmode_caption").style.display = 'none';
}



////////////////////////////HOVER FUNCTIONS////////////////////////////////////
function hoverOn(name) {
	//console.log(document.getElementById(name).style.fill);
	if(gridMode == true){
		if(dblclicked == "False"){
			if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
				document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
			} else {
				document.getElementById(name).style.fill = 'rgb(223, 223, 223)';
				document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
			}
		} else {
			if(document.getElementById(name).id != startID){
				if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
					document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
					document.getElementById(name).style.stroke = 'rgb(255, 247, 168)';
				} else {
					document.getElementById(name).style.fill = 'rgb(255, 247, 168)';
					document.getElementById(name).style.stroke = 'rgb(255, 247, 168)';
				}
			}
			if(document.getElementById(name).id == startID){
				document.getElementById(name).style.fill = 'rgb(255, 247, 168)';
				document.getElementById(name).style.stroke = 'rgb(255, 247, 168)';	
			}
		}
	}
}

function hoverOff(name) {
	if(gridMode == true){
		if((document.getElementById(name).id == startID) && (startID != endID)){
			document.getElementById(name).style.fill = 'rgb(255, 247, 168)';
			document.getElementById(name).style.stroke = 'rgb(255, 247, 168)';	
		}
		else if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
			document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
			document.getElementById(name).style.stroke = 'rgb(0, 0, 0)';
		} else {
			document.getElementById(name).style.fill = 'rgb(255, 255, 255)';
			document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
		}
	}
}

//sketching hover
function hoverSketchOn(name) {
	//console.log(document.getElementById(name).style.fill);
	if(sketchMode == true){
		if(sketchingCurve == false  || sketchingEllipse == false){
			if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
				document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
			} else {
				document.getElementById(name).style.fill = 'rgb(223, 223, 223)';
				document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
			}
		} else if(sketchingCurve == true){
			if(document.getElementById(name).id != sketchStart){
				if(xy2 == document.getElementById(name).id || xy3 == document.getElementById(name).id ){
					document.getElementById(name).style.fill = 'rgb(202, 225, 255)';
					document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';
				}
				else if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
					document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
					document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';
				} else {
					document.getElementById(name).style.fill = 'rgb(202, 225, 255)';
					document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';
				}
			}
			if(document.getElementById(name).id == sketchStart){
				document.getElementById(name).style.fill = 'rgb(202, 225, 255)';
				document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';	
			}
		} else if(sketchingEllipse == true){
			if(document.getElementById(name).id != center){
				if(xradius == document.getElementById(name).id || yradius == document.getElementById(name).id ){
					document.getElementById(name).style.fill = 'rgb(189, 252, 201)';
					document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';
				}
				else if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
					document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
					document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';
				} else {
					document.getElementById(name).style.fill = 'rgb(189, 252, 201)';
					document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';
				}
			}
			if(document.getElementById(name).id == center){
				document.getElementById(name).style.fill = 'rgb(189, 252, 201)';
				document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';	
			}
		}
	}
}

function hoverSketchOff(name) {
	if(sketchMode == true){
		if(sketchingCurve == true && (document.getElementById(name).id == sketchStart) && (sketchStart != xy2)){
			document.getElementById(name).style.fill = 'rgb(202, 225, 255)';
			document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';	
		}
		else if(sketchingCurve == true && xy2 == document.getElementById(name).id || xy3 == document.getElementById(name).id){
			document.getElementById(name).style.fill = 'rgb(202, 225, 255)';	
			document.getElementById(name).style.stroke = 'rgb(202, 225, 255)';	
		}
		else if(sketchingEllipse == true && (document.getElementById(name).id == center) && (center != xradius)){
			document.getElementById(name).style.fill = 'rgb(189, 252, 201)';
			document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';	
		}
		else if(sketchingEllipse == true && xradius == document.getElementById(name).id || yradius == document.getElementById(name).id){
			document.getElementById(name).style.fill = 'rgb(189, 252, 201)';	
			document.getElementById(name).style.stroke = 'rgb(189, 252, 201)';	
		}

		else if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
			document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
			document.getElementById(name).style.stroke = 'rgb(0, 0, 0)';
		} else {
			document.getElementById(name).style.fill = 'rgb(255, 255, 255)';
			document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
		}
	}
}

/////////////////////////////////////////////////////////////////////////
///////////////////////PENCIL && GRIDMODE FUNCTIONS//////////////////////
////////////////////////////Filling FUNCTIONS////////////////////////////
function bucketFill(name) {
	if(pencil == true && gridMode == true){
		//console.log(document.getElementById(name).style.fill);
		if(document.getElementById(name).style.fill === 'rgb(0, 0, 0)'){
			//console.log(document.getElementById(name).style.fill);
			//console.log("detected as black");
			document.getElementById(name).style.fill = 'rgb(255, 255, 255)';
			document.getElementById(name).style.stroke = 'rgb(223, 223, 223)';
		} else{
			//console.log(document.getElementById(name).style.fill);
			//console.log("detected as white");
			document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
			document.getElementById(name).style.stroke = 'rgb(0, 0, 0)';
		}
	}
}


///////////////////////////DRAGGING FUNCTIONS///////////////////////////
var drag = "False";

function setDrag(){
	if(pencil == true && gridMode == true){
		if(drag == "False"){
			drag = "True";
		} else {
			drag = "False";
		}
	}
}

function dragFill(name){
	if(pencil == true && gridMode == true){
		if(drag == "True") {
			document.getElementById(name).style.fill = 'rgb(0, 0, 0)';
			document.getElementById(name).style.stroke = 'rgb(0, 0, 0)';
			//bucketFill(name);
		} 
	}
}

//////////////////////////DOUBLE CLICK LINE CREATION//////////////////////////
var dblclicked = "False";
var highlight;

var startID;
var endID;
var startX;
var startY;
var endX;
var endY;

function getStart(name){
	if(pencil == true && gridMode == true){
		console.log("getStart");

		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		startX = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		startY = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		startID = document.getElementById(name).id;

		// console.log(startX);
		// console.log(startY);
		// console.log(document.getElementById(name).x);
		// console.log(document.getElementById(name).id);
	}
}

function getEnd(name){
	if(pencil == true && gridMode == true){
		console.log("getEnd");

		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		endX = (Math.floor((event.clientX -offsetX)/10) * 10)  + 5 + scrollxOffset;
		endY = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		endID = document.getElementById(name).id;

		// console.log(endX);
		// console.log(endY);
	}
}

function diagonal(canvas){
	if(pencil == true && gridMode == true){
		if(startID == endID){
			//undo line creation
			if(highlight == "Black"){
				document.getElementById(startID).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(startID).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(startID).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(startID).style.stroke = 'rgb(223, 223, 223)';
			}

		} else {

	    	var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	    	aLine.setAttributeNS(null, 'x1', startX);
	    	aLine.setAttributeNS(null, 'y1', startY);
	    	aLine.setAttributeNS(null, 'x2', endX);
	    	aLine.setAttributeNS(null, 'y2', endY);
	    	aLine.setAttributeNS(null, 'stroke', 'rgb(0, 0, 0)');
	    	aLine.setAttributeNS(null, 'stroke-width', 10);
	    	aLine.setAttributeNS(null, 'class', 'diagonal');
	    	aLine.setAttributeNS(null, "id", 'line'+ canvas + '.' + startX+'.'+startY+'.'+endX+'.'+endY);	    	

	    	document.getElementById(canvas).appendChild(aLine);
	    	var id = 'line'+ canvas + '.' + startX+'.'+startY+'.'+endX+'.'+endY;

	    	document.getElementById(id).onmouseover = function() {diagonalHighlightOn(this.id);};
			document.getElementById(id).onmouseout = function() {diagonalHighlightOff(this.id);};
			document.getElementById(id).onclick = function() {diagonalErase(this.id, canvas);};

	    	console.log(aLine.id);
	    	return aLine;
	    }
	}
}


///////////////////////////////SKETCH  CURVE FUNCTIONS//////////////////////////////
//supports simple curves
var sketchStart;
var x1;
var y1;
var sketchStartColor;

var xy2;
var x2;
var y2;
var xy2Color;

var xy3;
var x3;
var y3;
var xy3Color;

var sketchEnd;
var x4;
var y4;
var sketchEndColor;

var sketchingCurve = false;

//we need four get functions
function getSketchStart(name){
		//console.log("getSketch was called!");
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		x1 = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		y1 = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		sketchStart = document.getElementById(name).id;
		sketchStartColor = document.getElementById(name).style.fill;

		console.log(x1);
		console.log(y1);
		console.log(sketchStart);
		console.log(sketchStartColor);
}

function getxy2(name){
		//console.log("getSketch was called!");
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		x2 = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		y2 = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		xy2 = document.getElementById(name).id;
		xy2Color = document.getElementById(name).style.fill;

		console.log(x2);
		console.log(y2);
		console.log(xy2);
		console.log(xy2Color);
}

function getxy3(name){
		//console.log("getSketch was called!");
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		x3 = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		y3 = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		xy3 = document.getElementById(name).id;
		xy3Color = document.getElementById(name).style.fill;

		console.log(x3);
		console.log(y3);
		console.log(xy3);
		console.log(xy3Color);
}

function getSketchEnd(name){
		//console.log("getSketch was called!");
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		x4 = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		y4 = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		sketchEnd = document.getElementById(name).id;
		sketchEndColor = document.getElementById(name).style.fill;

		console.log(x4);
		console.log(y4);
		console.log(sketchEnd);
		console.log(sketchEndColor);
}


//start and end are allowed to be same
//but, if sketchStart == xy2, then cancel the sketch curve
//the above are specified ondblclickSet
//http://stackoverflow.com/questions/10546135/appending-path-child-within-svg-using-javascript
function sketchCurve(canvas){
	console.log("sketchCurve was called!");

	var svgns = "http://www.w3.org/2000/svg";
	aCurve = document.createElementNS(svgns, "path");   
	//aCurve.setAttributeNS(null, "d", "M 1,97.857143 C 19.285714,96.428571 24.016862,131.64801 90.714286,132.85714 140.78762,133.7649 202.79376,66.16041 202.79376,66.16041");  
	aCurve.setAttributeNS(null, "d", "M "+x1+" "+y1+"C "+x2+" "+y2+" "+x3+" "+y3+" "+x4+" "+y4);
	aCurve.setAttributeNS(null, "stroke", "black"); 
	aCurve.setAttributeNS(null, "stroke-width", 10);  
	aCurve.setAttributeNS(null, "opacity", 1);  
	aCurve.setAttributeNS(null, "fill", "none");
	aCurve.setAttributeNS(null, "class", "curve");
	aCurve.setAttributeNS(null, "id", 'curve'+ canvas + '.' +x1+'.'+y1+'.'+x2+'.'+y2+'.'+x3+'.'+y3+'.'+x4+'.'+y4); //edit name

	document.getElementById(canvas).appendChild(aCurve);
	//var id = "curve" + canvas;
	var id = 'curve'+ canvas + '.' +x1+'.'+y1+'.'+x2+'.'+y2+'.'+x3+'.'+y3+'.'+x4+'.'+y4;

	document.getElementById(id).onmouseover = function() {curveHighlightOn(this.id);};
	document.getElementById(id).onmouseout = function() {curveHighlightOff(this.id);};
	document.getElementById(id).onclick = function() {curveErase(this.id, canvas);};

	console.log(id);

}

// //reset curve variables
// function resetCurve(){
// 		sketchStart = undefined;
// 		x1 = undefined;
// 		y1 = undefined;
// 		xy2 = undefined;
// 		x2 = undefined;
// 		y2 = undefined;
// 		xy3 = undefined;
// 		x3 = undefined;
// 		y3 = undefined;
// 		sketchEnd = undefined;
// 		x4 = undefined;
// 		y4 = undefined;

// 		sketchingCurve = false;
// }

////////////////////////SKETCH ELLIPSE FUNCTIONS////////////////////////////////
var center;
var cx;
var cy;
var centerColor;

var xradius;
var rx;
var xradiusColor;

var yradius;
var ry;
var yradiusColor;

var sketchingEllipse = false;
var ellipseError = false;

// //dummy test
// cx = 500;
// cy = 300;
// rx = 50;
// ry = 70;

function getCenter(name){
		console.log("getCenter was called!");
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

		cx = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		cy = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		center = document.getElementById(name).id;
		centerColor = document.getElementById(name).style.fill;

		console.log(cx);
		console.log(cy);
		console.log(center);
		console.log(centerColor);
}

function getXradius(name){
		console.log("getXradius was called!");

		var tempx;
		var scrollxOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
		tempx = (Math.floor((event.clientX - offsetX)/10) * 10) + 5 + scrollxOffset;
		rx = Math.abs(cx - tempx);

		xradius = document.getElementById(name).id;
		xradiusColor = document.getElementById(name).style.fill;

		console.log(rx);
		console.log(xradius);
		console.log(xradiusColor);
}

function getYradius(name){
		console.log("getYradius was called!");

		var tempy;
		var scrollyOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
		tempy = (Math.floor((event.clientY + scrollyOffset)/10) * 10) - 135 ;
		ry = Math.abs(cy - tempy);

		yradius = document.getElementById(name).id;
		yradiusColor = document.getElementById(name).style.fill;

		console.log(ry);
		console.log(yradius);
		console.log(yradiusColor);
}

function sketchEllipse(canvas){
	console.log("sketchEllipse was called!");

	var svgns = "http://www.w3.org/2000/svg";
	anEllipse = document.createElementNS(svgns, "ellipse");   
	anEllipse.setAttributeNS(null, "cx", cx);
	anEllipse.setAttributeNS(null, "cy", cy);
	anEllipse.setAttributeNS(null, "rx", rx);
	anEllipse.setAttributeNS(null, "ry", ry);
	anEllipse.setAttributeNS(null, "stroke", "black"); 
	anEllipse.setAttributeNS(null, "stroke-width", 10);  
	anEllipse.setAttributeNS(null, "opacity", 1);  
	anEllipse.setAttributeNS(null, "fill", "none");
	anEllipse.setAttributeNS(null, "class", "ellipse");
	//anEllipse.setAttributeNS(null, "id", "ellipse" + canvas); //edit name
	anEllipse.setAttributeNS(null, "id", 'ellipse'+ canvas + '.' +cx+'.'+cy+'.'+rx+'.'+ry); //edit name
	document.getElementById(canvas).appendChild(anEllipse);
	var id = 'ellipse'+ canvas + '.' +cx+'.'+cy+'.'+rx+'.'+ry;

	document.getElementById(id).onmouseover = function() {ellipseHighlightOn(this.id);};
	document.getElementById(id).onmouseout = function() {ellipseHighlightOff(this.id);};
	document.getElementById(id).onclick = function() {ellipseErase(this.id, canvas);};

	console.log(id);

}

//reset all ellipse varabiables, to prevent conflicts
function resetEllipse(){
	//reset all vars
	sketchingEllipse = false;

	center = undefined;
	cx = undefined;
	cy = undefined;
	centerColor = undefined;
	xradius = undefined;
	rx = undefined;
	xradiusColor = undefined;
	yradius = undefined;
	ry = undefined;
	yradiusColor = undefined;

	ellipseError = false;
}

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////ERASER FUNCTIONS//////////////////////////////
//eraser can erase everything in any mode

var dragEraseOn = false;

//name is a square
function clickErase(name){
	if(eraser == true){
		var unit = document.getElementById(name);
		if(unit.style.fill == 'rgb(0, 0, 0)'){
			unit.style.fill = 'rgb(255, 255, 255)';
			unit.style.stroke = 'rgb(223, 223, 223)';
		}
	}
}

function setDragErase(){
	if(eraser == true){
		if(dragEraseOn == false){
			dragEraseOn = true;
		} else {
			dragEraseOn = false;
		}
	}
}

function dragErase(name){
	if(eraser == true){
		if(dragEraseOn == true){
			clickErase(name);
		}
	}
}

//name is id of a line
function diagonalHighlightOn(name){
	if(eraser == true){
		var line = document.getElementById(name);
		line.setAttributeNS(null, "stroke", 'rgb(169, 169, 169)');
	}
}

function diagonalHighlightOff(name){
	if(eraser == true){
		var line = document.getElementById(name);
		line.setAttributeNS(null, "stroke", 'rgb(0, 0, 0)');
	}
}

function diagonalErase(name, canvas){
	if(eraser == true){
		var line = document.getElementById(name);
		document.getElementById(canvas).removeChild(line);
	}
}

function curveHighlightOn(name){
	if(eraser == true){
		var curve = document.getElementById(name);
		curve.setAttributeNS(null, "stroke", 'rgb(169, 169, 169)');
	}
}

function curveHighlightOff(name){
	if(eraser == true){
		var curve = document.getElementById(name);
		curve.setAttributeNS(null, "stroke", 'rgb(0, 0, 0)');
	}
}

function curveErase(name, canvas){
	if(eraser == true){
		var curve = document.getElementById(name);
		document.getElementById(canvas).removeChild(curve);
	}
}

function ellipseHighlightOn(name){
	if(eraser == true){
		var ellipse = document.getElementById(name);
		ellipse.setAttributeNS(null, "stroke", 'rgb(169, 169, 169)');
	}
}

function ellipseHighlightOff(name){
	if(eraser == true){
		var ellipse = document.getElementById(name);
		ellipse.setAttributeNS(null, "stroke", 'rgb(0, 0, 0)');
	}
}

function ellipseErase(name, canvas){
	if(eraser == true){
		var ellipse = document.getElementById(name);
		document.getElementById(canvas).removeChild(ellipse);
	}
}




/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////SETS OF MOUSE EVENT FUNCTIONS/////////////////////
function onmouseoutSet(name){
	hoverOff(name);
	hoverSketchOff(name);
}

function onmousedownSet(name){
	setDrag();
	bucketFill(name);  //has one bug, first drag will negate color
	console.log(document.getElementById(name).id);

	setDragErase();
	clickErase(name);
}

function onmouseoverSet(name){
	hoverOn(name);
	dragFill(name);
	hoverSketchOn(name);

	dragErase(name);
}

function onmouseupSet(){
	setDrag();
	setDragErase();
}

function onclickSet(name, canvas){
	//sketchmode - for circles
	if(pencil == true && sketchMode == true){
		if(center == undefined){
			getCenter(name);
			sketchingEllipse = true;
		} 
		else if (xradius == undefined){
			getXradius(name);
		}
		else {
			getYradius(name);

			if(ry > 0 && rx > 0){
				sketchEllipse(canvas);
			} 
			else{
				ellipseError = true;
				console.log("error");
			}
			//reset ellipse variable
			sketchingEllipse = false;

			//reset color of all squares
			if(centerColor == 'rgb(0, 0, 0)'){
				document.getElementById(center).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(center).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(center).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(center).style.stroke = 'rgb(223, 223, 223)';
			}

			if(xradiusColor == 'rgb(0, 0, 0)'){
				document.getElementById(xradius).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(xradius).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(xradius).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(xradius).style.stroke = 'rgb(223, 223, 223)';
			}

			if(yradiusColor == 'rgb(0, 0, 0)'){
				document.getElementById(yradius).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(yradius).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(yradius).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(yradius).style.stroke = 'rgb(223, 223, 223)';
			}

			//error highlight
			//time out doesn't work, but mouseover gets rid of it
			if(ellipseError == true){
				console.log("ellipse error was true, error highlight");
			    document.getElementById(center).style.fill = 'rgb(243, 186, 186)';
				document.getElementById(center).style.stroke = 'rgb(243, 186, 186)';
			  //   setTimeout(function(){
			  //       if(centerColor == 'rgb(0, 0, 0)'){
					// 	document.getElementById(center).style.fill = 'rgb(0, 0, 0)';
					// 	document.getElementById(center).style.stroke = 'rgb(0, 0, 0)';
					// } else {
					// 	document.getElementById(center).style.fill = 'rgb(255, 255, 255)';
					// 	document.getElementById(center).style.stroke = 'rgb(223, 223, 223)';
					// }
			  //   }, 500);
			}

			//reset all vars
			center = undefined;
			cx = undefined;
			cy = undefined;
			centerColor = undefined;
			xradius = undefined;
			rx = undefined;
			xradiusColor = undefined;
			yradius = undefined;
			ry = undefined;
			yradiusColor = undefined;

			ellipseError = false;
		}

	}

}

function ondblclickSet(name, canvas){
	//gridMode
	if(pencil == true && gridMode == true){
		if(dblclicked == "False"){
			getStart(name);
			if(document.getElementById(startID).style.fill === 'rgb(0, 0, 0)'){
				highlight = "Black";
			} else {
				highlight = "White";
			}

			document.getElementById(startID).style.fill = 'rgb(255, 247, 168)';
			document.getElementById(startID).style.stroke = 'rgb(255, 247, 168)';

			dblclicked = "True";
		}

		else{
			getEnd(name);
			diagonal(canvas);

			if(highlight == "Black"){
				document.getElementById(startID).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(startID).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(startID).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(startID).style.stroke = 'rgb(223, 223, 223)';
			}

			dblclicked = "False";
			startID = undefined;
			endID = undefined;
		}
	}
	//sketchMode - for curves
	if(pencil == true && sketchMode == true){
		resetEllipse();
		if(sketchStart == undefined){
			sketchingCurve = true;
			getSketchStart(name);
			console.log("sketchStart:", x1, y1);
		}
		else if(xy2 == undefined){
			getxy2(name);
			console.log("xy2:", x2, y2);

			//highlight xy2
			document.getElementById(xy2).style.stroke = 'rgb(202, 225, 255)';			

			if(sketchStart && xy2 && sketchStart == xy2){
				//uncolor first square
				if(sketchStartColor == 'rgb(0, 0, 0)'){
					document.getElementById(sketchStart).style.fill = 'rgb(0, 0, 0)';
					document.getElementById(sketchStart).style.stroke = 'rgb(0, 0, 0)';
				} else {
					document.getElementById(sketchStart).style.fill = 'rgb(255, 255, 255)';
					document.getElementById(sketchStart).style.stroke = 'rgb(223, 223, 223)';
				}
				//cancel curve and redefine:
				sketchStart = undefined;
				x1 = undefined;
				y1 = undefined;
				xy2 = undefined;
				x2 = undefined;
				y2 = undefined;
				sketchingCurve = false;
				console.log("curve canceled");
			}
		}
		else if(xy3 == undefined){
			getxy3(name);
			console.log("xy3", x3, y3);
			document.getElementById(xy3).style.stroke = 'rgb(202, 225, 255)';	
		}
		else{
			getSketchEnd(name);
			console.log("sketchEnd", x4, y4);

			//create the curve
			sketchCurve(canvas);
			sketchingCurve = false;

			//reset color of all squares
			if(sketchStartColor == 'rgb(0, 0, 0)'){
				document.getElementById(sketchStart).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(sketchStart).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(sketchStart).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(sketchStart).style.stroke = 'rgb(223, 223, 223)';
			}

			if(xy2Color == 'rgb(0, 0, 0)'){
				document.getElementById(xy2).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(xy2).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(xy2).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(xy2).style.stroke = 'rgb(223, 223, 223)';
			}

			if(xy3Color == 'rgb(0, 0, 0)'){
				document.getElementById(xy3).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(xy3).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(xy3).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(xy3).style.stroke = 'rgb(223, 223, 223)';
			}

			if(sketchEndColor == 'rgb(0, 0, 0)'){
				document.getElementById(sketchEnd).style.fill = 'rgb(0, 0, 0)';
				document.getElementById(sketchEnd).style.stroke = 'rgb(0, 0, 0)';
			} else {
				document.getElementById(sketchEnd).style.fill = 'rgb(255, 255, 255)';
				document.getElementById(sketchEnd).style.stroke = 'rgb(223, 223, 223)';
			}

			//reset all the variables
			sketchStart = undefined;
			x1 = undefined;
			y1 = undefined;
			xy2 = undefined;
			x2 = undefined;
			y2 = undefined;
			xy3 = undefined;
			x3 = undefined;
			y3 = undefined;
			sketchEnd = undefined;
			x4 = undefined;
			y4 = undefined;
		}
	}
}

/////////////////////////////////////////////////////////////////////////////
//////////////////////////CREATE TABS////////////////////////////////////////
//used code from: http://www.elated.com/articles/javascript-tabs/

var tabLinks = new Array();
var contentDivs = new Array();

function init() {

    // Grab the tab links and content divs from the page
    var tabListItems = document.getElementById('tabs').childNodes;
    for ( var i = 0; i < tabListItems.length; i++ ) {
      	if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;

    for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
    }

    // Hide all content divs except the first
    var i = 0;

    for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tab hide';
        i++;
    }
}

function showTab() {
    var selectedId = getHash( this.getAttribute('href') );
    currentTab = selectedId;
    console.log(currentTab);
    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for ( var id in contentDivs ) {

      // if (ghostMode && contentDivs[id].className == 'tab') {
      // 	//contentDivs[id].className = 'tab ghost'
      // 	contentDivs[ghostModeTab].className = 'tab ghost';
      //  } 
       if (id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tab';
       } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tab hide';
       }
    }

    if(ghostMode && ghostModeTab != selectedId){
    	tabLinks[ghostModeTab].className = 'selected';
    	contentDivs[ghostModeTab].className = 'tab ghost';
    }

      // Stop the browser following the link
      return false;
}

function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
}

function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
}

















