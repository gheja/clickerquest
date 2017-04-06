"use strict";

class GfxButton extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, x, y, width, text, callback)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), nvl(width, 100), 16);
		
		this._gfx = gfx;
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
		
		this._gfx.drawSprite("button_" + status + "_left", this.x, this.y);
		this._gfx.drawSpriteElastic("button_" + status + "_middle", this.x + 4, this.y, this.width - 8, 16);
		this._gfx.drawSprite("button_" + status + "_right", this.x + this.width - 4, this.y);
		
		this._gfx.finalCtx.fillStyle = this._gfx.foreground;
		this._gfx.finalCtx.font = (16 * this._gfx.z) + "px " + FONT_NAME;
		this._gfx.finalCtx.textAlign = "center";
		this._gfx.finalCtx.fillText(this.text, (this.x + Math.round(this.width / 2)) * this._gfx.z, (this.y + 11) * this._gfx.z);
	}
}
