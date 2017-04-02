"use strict";

class GfxCover extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, name, x, y)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), 288, 100);
		
		this._gfx = gfx;
		this._beats = [];
		this.name = name;
	}
	
	draw()
	{
		this._gfx.drawSprite("cover_" + this.name, this.x, this.y);
	}
}
