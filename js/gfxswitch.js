"use strict";

class GfxSwitch extends GfxBase
{
	constructor(x, y, value)
	{
		super(nvl(x, 0), nvl(y, 0), 22, 8);
		
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
			_gfx.drawSprite("switch_on", this.x, this.y);
		}
		else
		{
			_gfx.drawSprite("switch_off", this.x, this.y);
		}
	}
}
