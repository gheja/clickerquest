"use strict";

class GfxLabel extends GfxBase
{
	constructor(x, y, align, text)
	{
		super(nvl(x, 0), nvl(y, 0), 100, 8);
		
		this.align = nvl(align, 'left');
		this.text = nvl(text, 'label');
		this.inverted = false;
		this.border = true;
		this.scale = 1;
	}
	
	draw()
	{
		let i, x, y, tmp;
		
		// TODO: should this be in tick()?
		this.padY = -8 * this.scale + 2;
		
		_gfx.finalCtx.font = (16 * _gfx.z * this.scale) + "px " + FONT_NAME;
		_gfx.finalCtx.textAlign = this.align;
		
		// convert the text to string
		if (typeof this.text !== 'string')
		{
			this.text = "" + this.text;
		}
		
		tmp = this.text.split('\n');
		
		if (this.border)
		{
			if (this.inverted)
			{
				_gfx.finalCtx.fillStyle = _gfx.foreground;
			}
			else
			{
				_gfx.finalCtx.fillStyle = _gfx.background;
			}
			
			for (x=-1; x<2; x++)
			{
				for (y=-1; y<2; y++)
				{
					for (i in tmp)
					{
						_gfx.finalCtx.fillText(tmp[i], Math.round((this.x + x) * _gfx.z), (this.y + y + i * 8 * this.scale) * _gfx.z);
					}
				}
			}
		}
		
		if (!this.inverted)
		{
			_gfx.finalCtx.fillStyle = _gfx.foreground;
		}
		else
		{
			_gfx.finalCtx.fillStyle = _gfx.background;
		}
		
		for (i in tmp)
		{
			_gfx.finalCtx.fillText(tmp[i], Math.round(this.x * _gfx.z), (this.y + i * 8 * this.scale) * _gfx.z);
		}
	}
}
