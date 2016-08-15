# ko-tagCloud
A tag cloud creator using SVG and KnockoutJS.

<h1>Features</h1>
<ul>
<li>The example uses KnockoutJS custom bindings. But the tagCloud.js can be used without KnockoutJS too.</li>
<li>Dependent on Scalable Vector Graphics. So might not work in older browsers that don't support SVG.</li>
<li>Lightweight - 7kb.</li>
<li>Simple, well documented and easy to use.</li>
</ul>

<h1>Usage</h1>
<div>
<pre>
<<span>head</span>>
  <<span>!--&nbsp;KnockoutJS is required only if ko_click option is used</span>&nbsp;-->
  <<span>script type="text/javascript" src="./knockout-3.4.0.js"/></span>
  <<span>script type="text/javascript" src="./tagCloud.js"/></span>
<<span>/head</span>>
</pre>
</div>

<h1>API</h1><pre>
Calling the TagCloud function with parameters will generate a tag cloud and append it to the 
element with given id. The parameters are :-
<b>id</b> - HTML element id.
<b>data</b> - javascript array of JSON objects with data for tag cloud elements.
<b>parameters</b> - JSON object with tag cloud level settings.
<b>TagCloud(element.id, data, parameters);</b>
</pre>

<h2>parameters argument options :-</h2>
<table width="100%">
<thead>
<tr>
<th>Option</th>
<th>Value</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tr>
<td>width</td>
<td>Any value allowed for SVG container</td>
<td>500</td>
<td>The given value for width or default value of 500 is treated as maximum width of the tag cloud. After the elements are created the space is optimized. If the elements seem to overflow then the value and/or the element weightage can be adjusted.</td>
</tr>
<tr>
<td>height</td>
<td>Any value allowed for SVG container.</td>
<td>500</td>
<td>The given value for height or default value of 500 is treated as maximum height of the tag cloud. After the elements are created the space is optimized. If the elements seem to overflow then the value and/or the element weightage can be adjusted.</td>
</tr>
<tr>
<td>bgColor</td>
<td>Value in format #ffffff or rgb(255,255,255).</td>
<td>rgb(255,255,255)</td>
<td>This option sets the background color of the tag cloud.</td>
</tr>
<tr>
<td>fill</td>
<td>Value in format #ffffff or rgb(255,255,255).</td>
<td>rgb(0,0,0)</td>
<td>This option sets the text color of all the tag elements in the cloud. It can be also set on specific cloud element.</td>
</tr>
<tr>
<td>font-family</td>
<td>Name of font family like Arial, Calibri etc.</td>
<td>Helvetica Neue,Helvetica,Arial,sans-serif,Impact</td>
<td>This option sets the font family of all the text elements. It can be also set on specific cloud element.</td>
</tr>
<tr>
<td>weightage</td>
<td>Value between 1 - 5. Decimal numbers are also allowed. </td>
<td>30</td>
<td>This option sets the font size of all the text elements. It can be also set on specific cloud element. It is recommended to set this option on specific element so that they are displayed as per their prominence.</td>
</tr>
<tr>
<td>font-weight</td>
<td>Values allowed for font-weight of SVG text element.</td>
<td>400</td>
<td>This option sets the font weight of all the text elements. This will set the value for boldness of the text. It can be also set on specific cloud element.</td>
</tr>
<tr>
<td>font-style</td>
<td>Values allowed for font-style of SVG text element.</td>
<td>normal</td>
<td>This option sets the font style of all the text elements. It can be also set on specific cloud element.</td>
</tr>
<tr>
<td>font-stretch</td>
<td>Values allowed for font-stretch of SVG text element.</td>
<td>normal</td>
<td>This option sets the font stretch of all the text elements. It can be also set on specific cloud element.</td>
</tr>
</table>
