"use strict";

class GfxImage extends GfxBase
{
	constructor(gfx, name, x, y)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), 288, 100);
		
		this._gfx = gfx;
		this.name = name;
	}
	
	draw()
	{
		this._gfx.drawSprite(this.name, this.x, this.y);
	}
}
