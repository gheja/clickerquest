"use strict";

var _requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000 / FPS); };

/*
var _requestAnimationFrame = function(callback) { window.setTimeout(callback, 1000 / FPS); };
*/

// NOTE: supplied "array" will be modified!
function initArray(array, value)
{
	var x, y;
	
	array.length = VIEW_HEIGHT;
	
	for (y=0; y<VIEW_HEIGHT; y++)
	{
		array[y] = [];
		
		for (x=0; x<VIEW_WIDTH; x++)
		{
			// need to do a _copy() as 
			array[y].push(_copy(value));
		}
	}
}

function _copy(a)
{
	return JSON.parse(JSON.stringify(a));
}

function arrayInsert(array, position, item)
{
	return array.splice(position, 0, item);
}

function clip(x, min, max)
{
	return Math.min(Math.max(x, min), max);
}

function clip256(x)
{
	return clip(Math.round(x), 0, 255);
}

function round1(x, a)
{
	if (Math.abs(x) < a)
	{
		return 0;
	}
	
	return x;
}

function round2(x)
{
	return Math.round(x * 10) / 10;
}

function roundAndString(x)
{
	let result;
	
	result = "";
	
	if (x < 0)
	{
		result += "-";
	}
	
	x = Math.abs(x);
	
	result += Math.floor(x) + "." + Math.round((x % 1) * 10);
	
	return result;
}

function sqr(a)
{
	return a * a;
}

function chance(x)
{
	return Math.random() < x;
}

function randomPosNeg(x)
{
	return (Math.random() - 0.5) * 2 * x;
}

function random2()
{
	return randomPosNeg(1);
}

function randomInt(min, max)
{
	return min + Math.round(Math.random() * (max - min));
}

function distance(x1, y1, x2, y2)
{
	return Math.sqrt(sqr(x1 - x2) + sqr(y1 - y2));
}

function getDomElement(id)
{
	return document.getElementById(id);
}

function fixCanvasContextSmoothing(ctx)
{
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
}

function lerp(a, b, position)
{
	return (a + (b - a) * position);
}

function lerp256(a, b, position)
{
	return clip256(lerp(a, b, position));
}

function colors_to_string(a)
{
	return a.join("-");
}

function eee(value, min, max, pow)
{
	var a;
	
	// ensure that the result is 0..1
	value = Math.min(Math.max(value, min), max);
	
	a = (value - min) / (max - min);
	a = Math.pow(a, pow);
	
	return a;
}

function newCanvas()
{
	return document.createElement("canvas");
}

function appendCanvas(c)
{
	c.style.position = "fixed";
	_body.appendChild(c);
}

function hexColorToRgba(a)
{
	// numbers = "0123456789abcdef";
	// r = numbers.indexOf(a[0]);
	
	function f(x)
	{
		return parseInt(x + x, 16);
	}
	
	return "rgba(" + f(a[0]) + "," + f(a[1]) + "," + f(a[2]) + "," + (f(a[3]) / 255) + ")";
}

function hexColorToArray(a)
{
	function f(x)
	{
		return parseInt(x + x, 16);
	}
	
	return [ f(a[0]), f(a[1]), f(a[2]), f(a[3]) ];
}

function arrayToRgba(a)
{
	return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + (a[3]/255) + ")";
}

function arrayToHex(a)
{
	var numbers, output, i;
	
	numbers = "0123456789abcdef";
	
	output = "";
	for (i=0; i<4; i++)
	{
		output += numbers[Math.floor(a[i] / 16)];
	}
	
	return output;
}

function hexToPalette(s)
{
	return [
		hexColorToArray(s.substring(0, 4)),
		hexColorToArray(s.substring(4, 8)),
		hexColorToArray(s.substring(8, 12)),
		hexColorToArray(s.substring(12, 16))
	];
}

function nvl(a, b)
{
	if (typeof a === 'undefined')
	{
		return b;
	}
	
	return a;
}

function storageSet(key, value)
{
	localStorage.setItem(LOCAL_STORAGE_PREFIX + ":" + key, value);
}

function storageGet(key, defaultValue)
{
	return nvl(localStorage.getItem(LOCAL_STORAGE_PREFIX + ":" + key), defaultValue);
}

function float32concat(first, second)
{
	let result = new Float32Array(first.length + second.length);
	
	result.set(first);
	result.set(second, first.length);
	
	return result;
}

function float32trim(input, length)
{
	let result = new Float32Array(input, 0, length);
	
	return result;
}

function get_all_variations(recipe)
{
	var i, depth, item, lists, current_list, indexes, variations, finished;
	
	lists = [];
	current_list = [];
	indexes = [];
	variations = [];
	depth = 0;
	item = '';
	
	for (i=0; i<recipe.length; i++)
	{
		if (recipe[i] == '(')
		{
			current_list = [];
			item = '';
		}
		else if (recipe[i] == ')')
		{
			current_list.push(item);
			lists.push(current_list);
			indexes.push(0);
		}
		else if (recipe[i] == ',')
		{
			current_list.push(item);
			item = '';
		}
		else
		{
			item += recipe[i];
		}
	}
	
	finished = 0;
	while (!finished)
	{
		item = '';
		for (i=0; i<lists.length; i++)
		{
			item += lists[i][indexes[i]];
		}
		variations.push(item);
		
		indexes[lists.length-1]++;
		
		for (i=lists.length-1; i>=0; i--)
		{
			if (indexes[i] == lists[i].length)
			{
				if (i == 0)
				{
					finished = 1;
					break;
				}
				indexes[i-1]++;
				indexes[i] = 0;
			}
		}
	}
	
	return variations;
}

function array_shuffle(array)
{
	array.sort(function(a, b) { return Math.random() - 0.5; } );
}

// window.onerror = _error;
// DEBUG BEGIN
function _error(s)
{
	var obj;
	
	obj = getDomElement("errors");
	obj.innerHTML = s + "<br/>" + obj.innerHTML;
	obj.style.display = "block";
}
// DEBUG END
