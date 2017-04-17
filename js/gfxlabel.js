"use strict";

class GfxLabel extends GfxBase
{
	constructor(x, y, align, text)
	{
		super(nvl(x, 0), nvl(y, 0), 100, 8);
		
		this.align = nvl(align, 'left');
		this.text = nvl(text, 'label');
		this.inverted = false;
		this.scale = 1;
	}
	
	draw()
	{
		let i, tmp;
		
		if (!this.inverted)
		{
			_gfx.finalCtx.fillStyle = _gfx.foreground;
		}
		else
		{
			_gfx.finalCtx.fillStyle = _gfx.background;
		}
		_gfx.finalCtx.font = (16 * _gfx.z * this.scale) + "px " + FONT_NAME;
		_gfx.finalCtx.textAlign = this.align;
		
		// convert the text to string
		if (typeof this.text !== 'string')
		{
			this.text = "" + this.text;
		}
		
		tmp = this.text.split('\n');
		for (i in tmp)
		{
			_gfx.finalCtx.fillText(tmp[i], Math.round(this.x * _gfx.z), (this.y + i * 8 * this.scale) * _gfx.z);
		}
	}
}
