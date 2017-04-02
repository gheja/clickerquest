"use strict";

class Spritestore
{
	construct()
	{
		this.sprites = [];
	}
	
	register(name, x, y, width, height)
	{
		this.sprites.push({ name: name, x: x, y: y, width: width, height: height });
	}
	
	put()
	{
		
	}
}
