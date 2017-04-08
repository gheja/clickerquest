"use strict";

class GfxCalibrationbar extends GfxBase
{
	constructor(gfx, x, y, width)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), nvl(width, 96), 8);
		
		this.a = 0;
		this.pos = 0;
	}
	
	tick()
	{
		this.a += 0.1;
		// this.pos = Math.cos(this.a);
	}
	
	draw()
	{
		_gfx.drawSpriteElastic("beatbar_empty", this.x, this.y, this.width, 12);
		_gfx.drawSprite("beatbar_end", this.x + this.width / 2 - 6, this.y);
		_gfx.drawSprite("beatbar_beat2", this.x + (this.width / 2 - 6)+ this.pos * (this.width / 2 - 6), this.y);
	}
}
