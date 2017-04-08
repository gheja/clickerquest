"use strict";

class GfxBeatbar extends GfxBase
{
	constructor(x, y, width)
	{
		super(nvl(x, 0), nvl(y, 0), nvl(width, 96), 8);
		
		this._beats = [];
		this.status = "normal";
	}
	
	setBeats(a)
	{
		this._beats = a;
	}
	
	setBeatsFromBeater(now)
	{
		let beat;
		
		this._beats.length = 0;
		for (beat of _beater.beats)
		{
			this._beats.push(beat - now);
		}
	}
	
	draw()
	{
		let a;
		
		_gfx.drawSpriteElastic("beatbar_empty", this.x, this.y, this.width - 8, 12);
		_gfx.drawSprite("beatbar_end", this.x + this.width - 12, this.y);
		for (a of this._beats)
		{
			a = a - _beater.soundCorrection - _beater.gfxCorrection;
			a = a / 15;
			
			if (a > 0)
			{
				_gfx.drawSprite("beatbar_beat", this.x + this.width - 12 - a, this.y);
			}
			else if (a > -5)
			{
//				if (this.status == "normal")
				{
					_gfx.drawSprite("beatbar_beat", this.x + this.width - 12, this.y);
				}
			}
		}
		
		if (this.status == "missed")
		{
			_gfx.drawSprite("beatbar_beat_missed", this.x + this.width - 12, this.y);
		}
		else if (this.status == "matched")
		{
//			_gfx.drawSprite("beatbar_beat_matched", this.x + this.width - 8, this.y);
		}
	}
}
