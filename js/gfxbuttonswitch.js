"use strict";

class GfxButtonswitch extends GfxBase
{
	constructor(x, y, callback)
	{
		super(nvl(x, 0), nvl(y, 0), 30, 9);
		
		this.spriteName = "action_invalid";
		this.clickable = true;
		this.clickCallback = nvl(callback, null);
	}
	
	draw()
	{
		_gfx.drawSprite(this.spriteName, this.x, this.y);
	}
	
	click()
	{
		this.clickCallback.call();
	}
}
