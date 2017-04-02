"use strict";

class GfxLabel extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, x, y, align, text)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), 100, 8);
		
		this._gfx = gfx;
		this.align = nvl(align, 'left');
		this.text = nvl(text, 'label');
		this.clickable = true;
	}
	
	draw()
	{
		this._gfx.finalCtx.fillStyle = this._gfx.foreground;
		this._gfx.finalCtx.font = (16 * this._gfx.z) + "px savior";
		this._gfx.finalCtx.textAlign = this.align;
		this._gfx.finalCtx.fillText(this.text, this.x * this._gfx.z, this.y * this._gfx.z);
	}
	
	click()
	{
		console.log('e!');
	}
}
