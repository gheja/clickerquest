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
	
	clickDefault(x, y)
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
				// hide hover
				this.objects[i].checkHover(-1, -1);
				return true;
			}
		}
		
		this.clickDefault(x, y);
		
		return false;
	}
	
	draw()
	{
		let i;
		
		this._gfx.clear();
		
		for (i in this.objects)
		{
			this.objects[i].draw();
		}
	}
}
