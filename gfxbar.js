"use strict";

class GfxBar extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, x, y, width, height, max, value)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), nvl(width, 100), nvl(height, 8));
		
		this._gfx = gfx;
		this.max = nvl(max, 100);
		this.value = nvl(value, 50);
		this.clickCallback = null;
	}
	
	click()
	{
		
	}
	
	draw()
	{
		const a = Math.max(Math.min(this.value / this.max, 1), 0);
		const z = Math.round(a * (this.width - 5));
		
		this._gfx.drawSprite("bar_left", this.x, this.y);
		this._gfx.drawSpriteElastic("bar_empty", this.x + 2, this.y, this.width - 6, 8);
		if (a > 0)
		{
			this._gfx.drawSpriteElastic("bar_full", this.x + 2, this.y, z - 1, 8);
			if (a < 1)
			{
				this._gfx.drawSprite("bar_full_tip", this.x + 2 + z - 1, this.y);
			}
		}
		this._gfx.drawSprite("bar_right", this.x + this.width - 4, this.y);
	}
}
