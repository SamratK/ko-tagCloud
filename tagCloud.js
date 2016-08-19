/*
Copyright (c) 2016 SamratK

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
function TagCloud(id, cloudElements, parameters){
var svgNS = 'http://www.w3.org/2000/svg';
var svg = document.createElementNS(svgNS, 'svg');

//If no parameters are sent then all values will be default.
if(parameters==undefined || parameters==null){
  parameters = {};
}

//Default dimensions for maximum width and maximum height of the tag cloud.
var width = isNaN(parseFloat(parameters.width)) ? 500 : parameters.width;
var height = isNaN(parseFloat(parameters.height)) ? 500 : parameters.height;

//Setting the bounds and background details of the tag cloud.
svg.setAttribute('width',width);
svg.setAttribute('height',height);
svg.setAttribute('id', id+'_svg');
var svgBg = document.createElementNS(svgNS, 'rect');
svgBg.setAttribute('x', 0);
svgBg.setAttribute('y', 0);
svgBg.setAttribute('height', height);
svgBg.setAttribute('width', width);
svgBg.setAttribute('fill', parameters.bgColor ? parameters.bgColor : 'rgb(255,255,255)');


var cloudElement = {};
var cloudElem = "";
var anchor = {};
var g = document.createElementNS(svgNS, 'g');
g.appendChild( svgBg );

for(var i=0;i<cloudElements.length;i++){
cloudElem = cloudElements[i];
cloudElement = document.createElementNS(svgNS, 'text');
cloudElement.setAttribute('id','tagCloud-elem'+i);
//Initial location for all elements before rearranging.
cloudElement.setAttribute('x',10);
cloudElement.setAttribute('y',10);
//If custom values are given for an element then they are applied.
cloudElement.setAttribute('fill', cloudElem.fill ? cloudElem.fill : parameters.fill ? parameters.fill : 'rgb(0,0,0)');
cloudElement.setAttribute('font-family', cloudElem['font-family'] ? cloudElem['font-family'] : parameters['font-family'] ? parameters['font-family'] : 'Helvetica Neue,Helvetica,Arial,sans-serif,Impact');
cloudElement.setAttribute('font-size', isNaN(parseFloat(cloudElem.weightage))? isNaN(parseFloat(parameters.weightage)) ? 30 :
            20 + parseFloat(parameters.weightage)*10 : 20 + parseFloat(cloudElem.weightage)*10);
cloudElement.setAttribute('font-weight', isNaN(parseFloat(cloudElem['font-weight']))? isNaN(parseFloat(parameters['font-weight'])) ? 400 :
            parseFloat(parameters['font-weight']) : parseFloat(cloudElem['font-weight']));
cloudElement.setAttribute('font-style', cloudElem['font-style'] ? cloudElem['font-style'] : parameters['font-style'] ? parameters['font-style'] : 'normal');//italic
cloudElement.setAttribute('font-stretch', cloudElem['font-stretch'] ? cloudElem['font-stretch'] : parameters['font-stretch'] ? parameters['font-stretch'] : 'normal');//wider, condensed, expanded and others.
cloudElement.textContent = cloudElem['textContent'];

//onmouseover and out events
cloudElement.setAttribute('onmouseover',"evt.target.setAttribute('text-decoration', 'underline')");
cloudElement.setAttribute('onmouseout',"evt.target.setAttribute('text-decoration', 'none')");

//If url is given then the anchors are created with the text elements.
if(cloudElem.url){
  anchor =  document.createElementNS( svgNS, 'a' );
  anchor.setAttributeNS( 'http://www.w3.org/1999/xlink', 'xlink:href', cloudElem.url );
  anchor.setAttribute( 'target', cloudElem.target?cloudElem.target:'_top' );
  anchor.appendChild(cloudElement);

  g.appendChild(anchor);
}else{
//If url is not given then text element will be given an onclick action.
//And also hand pointer option for on mouseover to indicate that the text is clickable.
//If knockout is being used to handle click action then ko_onclick is to be present.
if(cloudElem['ko_onclick']){
cloudElement.setAttribute('data-bind','click : '+cloudElem['ko_onclick']);
}else{
//onclick has to be present.
cloudElement.setAttribute('onclick', cloudElem.onclick + '(\''+cloudElement.textContent+'\',this);');
}

cloudElement.setAttribute('style','cursor : pointer;');
g.appendChild(cloudElement);
}
}//cloudElements for end.

//The main group element is appended in to svg element.
svg.appendChild(g);

//The svg element with all the tag cloud elements is placed in the element whose id is passed as parameter.
var element = document.getElementById(id);
element.innerHTML="";//Removing any existing content.
element.appendChild(svg);


var domTagElements =[];
var elemMaxWidth = 0;
var elemMaxHeight = 0;

//Getting all the cloud elements from the page.
for(var i=0;i<cloudElements.length;i++){
  element = document.getElementById('tagCloud-elem'+i);
  domTagElements.push(element);
if(element.getBBox().width>elemMaxWidth){
  elemMaxWidth = element.getBBox().width;
}

if(element.getBBox().height>elemMaxHeight){
  elemMaxHeight = element.getBBox().height;
}
}

var domSvg = document.getElementById(id+'_svg');
//Leaving 10 units on both sides, calculating the number of elements to fit in a row.
var elemsInRow = Math.floor(parseFloat(domSvg.getAttribute('width')-20)/elemMaxWidth);

var x=10,y=elemMaxHeight;

//Sorting the elements for the rectangular cloud based on font-size that is in turn based on weightage.
domTagElements.sort(function(elem1,elem2){
return elem1.getAttribute('font-size') > elem2.getAttribute('font-size')? -1:1;
});

var prevWidth = 0;
var maxX = 0,maxY=0;
//Re-arranging the elements in rows and cloumns.
for(var j=0;j<domTagElements.length;j++){
element = domTagElements[j];
var eleWidth = element.getBBox().width;

if(prevWidth + eleWidth + 10 > width-10){
//Go to next line
y = y + elemMaxHeight;
x=10;
}else{
x = prevWidth + 10;
}

element.setAttribute('x',x);
element.setAttribute('y',y);
prevWidth = x + eleWidth;

if(maxX < prevWidth){
  maxX = prevWidth;
}
}
maxY = y;

//Optimizing the bounding box space.
svgBg.setAttribute('width',maxX + 10);
svgBg.setAttribute('height',y+ elemMaxHeight/2);
svg.setAttribute('width', maxX + 10);
svg.setAttribute('height',maxY+ elemMaxHeight/2);

}
