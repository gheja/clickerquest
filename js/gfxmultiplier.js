"use strict";

class GfxMultiplier extends GfxBase
{
	constructor(x, y)
	{
		super(nvl(x, 0), nvl(y, 0), 0, 0);
	}
	
	click()
	{
		
	}
	
	draw()
	{
		let i, j, fixed, unlocked, part, available;
		
		fixed = _multiplier.levelMin;
		unlocked = Math.floor(_multiplier.levelValue);
		part = _multiplier.getPartialPoint();
		available = _multiplier.levelMax;
		
		for (i=1; i<=available; i++)
		{
			j = i - 1;
			
			if (i <= this.min)
			{
				_gfx.drawSprite("multiplier_locked", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else if (i <= unlocked)
			{
				_gfx.drawSprite("multiplier_part8", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else if (i == unlocked + 1)
			{
				_gfx.drawSprite("multiplier_part" + part, this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
			else
			{
				_gfx.drawSprite("multiplier_part0", this.x + (j % 10) * 10, this.y + Math.floor(j / 10) * 10);
			}
		}
	}
}
