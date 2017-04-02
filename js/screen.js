"use strict";

class Screen2
{
	constructor(gfx)
	{
		this._gfx = gfx;
		this.objects = {};
	}
	
	enter()
	{
	}
	
	leave()
	{
	}
	
	tick()
	{
	}
	
	draw()
	{
	}
	
	clickDefault()
	{
	}
	
	mouseMove(x, y)
	{
		var i;
		
		for (i in this.objects)
		{
			this.objects[i].checkHover(x, y);
		}
	}
	
	click(x, y)
	{
		var i;
		
		for (i in this.objects)
		{
			if (this.objects[i].checkAndDoClick(x, y))
			{
				return true;
			}
		}
		
		this.clickDefault();
		
		return false;
	}
}
