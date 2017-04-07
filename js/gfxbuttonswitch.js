"use strict";

class GfxButtonswitch extends GfxBase
{
	constructor(gfx, x, y, callback)
	{
		super(gfx, nvl(x, 0), nvl(y, 0), 30, 9);
		
		this._gfx = gfx;
		this.spriteName = "action_invalid";
		this.clickable = true;
		this.clickCallback = nvl(callback, null);
	}
	
	draw()
	{
		this._gfx.drawSprite(this.spriteName, this.x, this.y);
	}
	
	click()
	{
		this.clickCallback.call();
	}
}
