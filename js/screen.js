"use strict";

class Screen2
{
	constructor()
	{
		this.objects = {};
	}
	
	enter()
	{
		this.hideHover();
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
	
	hideHover()
	{
		var i;
		
		for (i in this.objects)
		{
			this.objects[i].checkHover(-1, -1);
		}
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
		
		this.clickDefault(x, y);
		
		return false;
	}
	
	draw()
	{
		let i;
		
		_gfx.clear();
		
		for (i in this.objects)
		{
			if (this.objects[i].hidden == false)
			{
				this.objects[i].draw();
			}
		}
	}
}
