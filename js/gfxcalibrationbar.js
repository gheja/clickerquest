"use strict";

class GfxCalibrationbar extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, x, y, width)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), nvl(width, 96), 8);
		
		this._gfx = gfx;
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
		this._gfx.drawSpriteElastic("beatbar_empty", this.x, this.y, this.width, 8);
		this._gfx.drawSprite("beatbar_end", this.x + this.width / 2 - 4, this.y);
		this._gfx.drawSprite("beatbar_beat", this.x + (this.width / 2 - 4)+ this.pos * (this.width / 2 - 4), this.y);
	}
}
