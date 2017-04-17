"use strict";

class GfxTooltip extends GfxBase
{
	constructor()
	{
		super(0, 0, 120, 8);
		
		this.text = "";
		this.hidden = true;
		this.label = new GfxLabel(0, 0, "left", "");
	}
	
	show(text, obj)
	{
		let tmp;
		
		this.text = text;
		this.label.text = this.text;
		tmp = this.text.split("\n");
		
		this.width = 100;
		this.height = tmp.length * 8;
		
		this.x = obj.x;
		if (this.x + this.width > FINAL_WIDTH)
		{
			this.x = 288 - this.width;
		}
		
		this.y = obj.y + 8;
		if (this.y + this.height > FINAL_HEIGHT)
		{
			this.y = obj.y - this.height - 8;
		}
		
		this.label.x = this.x;
		this.label.y = this.y;
		
		this.hidden = false;
	}
	
	hide()
	{
		this.hidden = true;
	}
	
	draw()
	{
		if (this.hidden)
		{
			return;
		}
		
		_gfx.finalCtx.fillStyle = _gfx.background;
		_gfx.finalCtx.fillRect((this.x - 1) * _gfx.z, (this.y - 1) * _gfx.z, (this.width + 4) * _gfx.z, (this.height + 4) * _gfx.z);
		this.label.draw();
	}
}
