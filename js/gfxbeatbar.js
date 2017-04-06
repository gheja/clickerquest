"use strict";

class GfxBeatbar extends GfxBase
{
	// , x = 0, y = 0, width = 100, height = 8, max = 100, value = 50
	constructor(gfx, x, y, width)
	{
		super(gfx,  nvl(x, 0), nvl(y, 0), nvl(width, 96), 8);
		
		this._gfx = gfx;
		this._beats = [];
		this.status = "normal";
	}
	
	setBeats(a)
	{
		this._beats = a;
	}
	
	setBeatsFrom(beater, now)
	{
		let beat;
		
		this._beats.length = 0;
		for (beat of beater.beats)
		{
			this._beats.push(beat - now);
		}
	}
	
	draw()
	{
		let a;
		
		this._gfx.drawSpriteElastic("beatbar_empty", this.x, this.y, this.width - 8, 8);
		this._gfx.drawSprite("beatbar_end", this.x + this.width - 8, this.y);
		for (a of this._beats)
		{
			a = a - _game.beater.soundCorrection - _game.beater.gfxCorrection;
			a = a / 15;
			
			if (a > 0)
			{
				this._gfx.drawSprite("beatbar_beat", this.x + this.width - 8 - a, this.y);
			}
			else if (a > -5)
			{
//				if (this.status == "normal")
				{
					this._gfx.drawSprite("beatbar_beat", this.x + this.width - 8, this.y);
				}
			}
		}
		
		if (this.status == "missed")
		{
			this._gfx.drawSprite("beatbar_beat_missed", this.x + this.width - 8, this.y);
		}
		else if (this.status == "matched")
		{
//			this._gfx.drawSprite("beatbar_beat_matched", this.x + this.width - 8, this.y);
		}
	}
}
