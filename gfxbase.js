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
	}
	
	checkClick(x, y)
	{
		if (x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height)
		{
			this.click();
			return true;
		}
		
		return false;
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
		
		this.clickCallback.fire();
	}
}
