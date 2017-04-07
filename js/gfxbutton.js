"use strict";

class GfxButton extends GfxBase
{
	constructor(x, y, width, text, callback)
	{
		super(nvl(x, 0), nvl(y, 0), nvl(width, 100), 16);
		
		this.text = text;
		this.disabled = false;
		this.clickable = true;
		this.clickCallback = nvl(callback, null);
	}
	
	draw()
	{
		let status;
		
		if (this.disabled)
		{
			status = "disabled";
		}
		else if (this.isMouseOver)
		{
			status = "hover";
		}
		else
		{
			status = "normal";
		}
		
		_gfx.drawSprite("button_" + status + "_left", this.x, this.y);
		_gfx.drawSpriteElastic("button_" + status + "_middle", this.x + 4, this.y, this.width - 8, 13);
		_gfx.drawSprite("button_" + status + "_right", this.x + this.width - 4, this.y);
		
		_gfx.finalCtx.fillStyle = _gfx.foreground;
		_gfx.finalCtx.font = (16 * _gfx.z) + "px " + FONT_NAME;
		_gfx.finalCtx.textAlign = "center";
		_gfx.finalCtx.fillText(this.text, Math.round((this.x + this.width / 2) * _gfx.z), (this.y + 9) * _gfx.z);
	}
}
