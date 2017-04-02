"use strict";

class GfxMultiplier extends GfxBase
{
	constructor(gfx, x, y)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), 0, 0);
		
		this._gfx = gfx;
		this.min = 1;
		this.max = 5;
		this.value = 3.2;
	}
	
	click()
	{
		
	}
	
	draw()
	{
		let i, j;
		const a = Math.floor(this.value);
		
		for (i=1; i<=this.max; i++)
		{
			j = i - 1;
			
			if (i <= this.min)
			{
				this._gfx.drawSprite("multiplier_fixed", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else if (i <= a)
			{
				this._gfx.drawSprite("multiplier_current", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else
			{
				this._gfx.drawSprite("multiplier_unlocked", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
		}
	}
}
