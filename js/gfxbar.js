"use strict";

class GfxBar extends GfxBase
{
	constructor(x, y, width, height, max, value, type)
	{
		super(nvl(x, 0), nvl(y, 0), nvl(width, 100), nvl(height, 8));
		
		this.max = nvl(max, 100);
		this.value = nvl(value, 50);
		this.type = nvl(type, 1);
		this.clickCallback = null;
	}
	
	click()
	{
		
	}
	
	draw()
	{
		let a, z, h;
		
		a = Math.max(Math.min(this.value / this.max, 1), 0);
		
		if (this.type == 1)
		{
			z = Math.round(a * (this.width - 5));
			
			_gfx.drawSprite("bar_left", this.x, this.y);
			_gfx.drawSpriteElastic("bar_empty", this.x + 2, this.y, this.width - 6, 8);
			if (z > 0)
			{
				_gfx.drawSpriteElastic("bar_full", this.x + 2, this.y, z - 1, 8);
				if (a < 1)
				{
					_gfx.drawSprite("bar_full_tip", this.x + 2 + z - 1, this.y);
				}
			}
			_gfx.drawSprite("bar_right", this.x + this.width - 4, this.y);
		}
		else if (this.type == 2 || this.type == 3)
		{
			z = Math.round(a * (this.width));
			
			if (this.type == 2)
			{
				h = 7;
			}
			else
			{
				h = 3;
			}
			
			_gfx.drawSpriteElastic("bar2_empty", this.x, this.y, this.width, h);
			if (z > 0)
			{
				_gfx.drawSpriteElastic("bar2_full", this.x, this.y, z, h);
				
				if (a < 1)
				{
					_gfx.drawSpriteElastic("bar2_full_tip", this.x + z, this.y, 1, h);
				}
			}
		}
	}
}
