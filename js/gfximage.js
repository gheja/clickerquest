"use strict";

class GfxImage extends GfxBase
{
	constructor(name, x, y)
	{
		super(nvl(x, 0), nvl(y, 0), 288, 100);
		
		this.name = name;
	}
	
	draw()
	{
		_gfx.drawSprite(this.name, this.x, this.y);
	}
}
