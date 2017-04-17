"use strict";

class GfxBase
{
	constructor(x, y, width, height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clickCallback = null;
		this.clickable = false;
		this.isMouseOver = false;
		this.hidden = false;
		this.tooltip = "";
	}
	
	checkRectangle(x, y)
	{
		if (x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height)
		{
			return true;
		}
		
		return false;
	}
	
	checkClick(x, y)
	{
		if (this.clickable && this.checkRectangle(x, y))
		{
			return true;
		}
		
		return false;
	}
	
	checkAndDoClick(x, y)
	{
		if (this.checkClick(x, y))
		{
			if (this.click())
			{
				return true;
			}
		}
		
		return false;
	}
	
	checkHover(x, y)
	{
		if (this.checkRectangle(x, y))
		{
			if (this.tooltip != "")
			{
				_game.commonObjects["tooltip"].show(this.tooltip, this);
			}
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
		if (!this.clickable || this.hidden || this.disabled)
		{
			return false;
		}
		
		if (this.clickCallback === null)
		{
			return false;
		}
		
		this.clickCallback.call();
		
		return true;
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
