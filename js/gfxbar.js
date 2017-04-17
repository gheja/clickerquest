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
		
		this.animationValue = 0;
	}
	
	click()
	{
		
	}
	
	animationOverflowTop()
	{
		this.animationValue = this.max;
	}
	
	animationOverflowBottom()
	{
		this.animationValue = 0;
	}
	
	draw()
	{
		let a, b, z;
		
		b = (this.value - this.animationValue) * 0.33;
		
		if (round2(b) == 0)
		{
			this.animationValue = this.value;
		}
		else
		{
			this.animationValue += b;
		}
		
		// a = Math.max(Math.min(this.value / this.max, 1), 0);
		a = Math.max(Math.min(this.animationValue / this.max, 1), 0);
		
		if (this.type == 1)
		{
			z = Math.round(a * (this.width - 3));
			
			_gfx.drawSprite("bar_left", this.x, this.y);
			_gfx.drawSpriteElastic("bar_empty", this.x + 2, this.y, this.width - 4, 8);
			if (z > 0)
			{
				_gfx.drawSpriteElastic("bar_full", this.x + 2, this.y, z - 1, 8);
				if (a < 1)
				{
					_gfx.drawSprite("bar_full_tip", this.x + 2 + z - 1, this.y);
				}
			}
			_gfx.drawSprite("bar_right", this.x + this.width - 2, this.y);
		}
		else if (this.type == 2)
		{
			z = Math.round(a * (this.width));
			
			_gfx.drawSpriteElastic("bar2_empty", this.x, this.y, this.width, this.height);
			if (z > 0)
			{
				_gfx.drawSpriteElastic("bar2_full", this.x, this.y, z, this.height);
				
				if (a < 1)
				{
					_gfx.drawSpriteElastic("bar2_full_tip", this.x + z, this.y, 1, this.height);
				}
			}
		}
		else if (this.type == 3)
		{
			z = Math.round(a * (this.width - 3));
			
			_gfx.drawSprite("bar3_left", this.x, this.y);
			_gfx.drawSpriteElastic("bar3_empty", this.x + 2, this.y, this.width - 4, 8);
			if (z > 0)
			{
				_gfx.drawSpriteElastic("bar3_full", this.x + 2, this.y, z - 1, 8);
				if (a < 1)
				{
					_gfx.drawSprite("bar3_full_tip", this.x + 2 + z - 1, this.y);
				}
			}
			_gfx.drawSprite("bar3_right", this.x + this.width - 2, this.y);
		}
	}
}
