"use strict";

class GfxSwitch extends GfxBase
{
	constructor(gfx, x, y, value)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), 22, 8);
		
		this._gfx = gfx;
		this.value = nvl(value, false);
		// this.clickable = true;
	}
	
	click()
	{
		
	}
	
	draw()
	{
		if (this.value)
		{
			this._gfx.drawSprite("switch_on", this.x, this.y);
		}
		else
		{
			this._gfx.drawSprite("switch_off", this.x, this.y);
		}
	}
}
