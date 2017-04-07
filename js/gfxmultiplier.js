"use strict";

class GfxMultiplier extends GfxBase
{
	constructor(x, y)
	{
		super(nvl(x, 0), nvl(y, 0), 0, 0);
		
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
				_gfx.drawSprite("multiplier_fixed", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else if (i <= a)
			{
				_gfx.drawSprite("multiplier_current", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else
			{
				_gfx.drawSprite("multiplier_unlocked", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
		}
	}
}
