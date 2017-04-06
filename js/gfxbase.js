"use strict";

class GfxBase
{
	constructor(gfx, x, y, width, height)
	{
		this._gfx = gfx;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clickCallback = null;
		this.clickable = false;
		this.isMouseOver = false;
	}
	
	checkRectangle(x, y)
	{
		if (x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height && this.clickable)
		{
			return true;
		}
		
		return false;
	}
	
	checkClick(x, y)
	{
		if (this.checkRectangle(x, y))
		{
			return true;
		}
		
		return false;
	}
	
	checkAndDoClick(x, y)
	{
		if (this.checkClick(x, y))
		{
			this.click();
			return true;
		}
		
		return false;
	}
	
	checkHover(x, y)
	{
		
		if (this.checkRectangle(x, y))
		{
			this.isMouseOver = true;
			return true;
		}
		
		this.isMouseOver = false;
		return false;
	}
	
	tick()
	{
	}
	
	click()
	{
		if (!this.clickable)
		{
			return;
		}
		
		if (this.clickCallback === null)
		{
			return;
		}
		
		this.clickCallback.call();
	}
	
	drawDefault()
	{
		if (this.hidden)
		{
			return;
		}
		
		this.draw();
	}
	
	draw()
	{
	}
}
