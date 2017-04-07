"use strict";

class GfxLabel extends GfxBase
{
	constructor(x, y, align, text)
	{
		super(nvl(x, 0), nvl(y, 0), 100, 8);
		
		this.align = nvl(align, 'left');
		this.text = nvl(text, 'label');
	}
	
	draw()
	{
		_gfx.finalCtx.fillStyle = _gfx.foreground;
		_gfx.finalCtx.font = (16 * _gfx.z) + "px " + FONT_NAME;
		_gfx.finalCtx.textAlign = this.align;
		_gfx.finalCtx.fillText(this.text, Math.round(this.x * _gfx.z), this.y * _gfx.z);
	}
}
