"use strict";

class ScreenCalibration extends Screen2
{
	constructor(a)
	{
		super(a);
		
		this.a = 0;
		this.ticks = 0;
		this.phase = 0;
		this.beater = null;
		this.finished = false;
	}
	
	enter()
	{
		this.phase = 0;
		this.ticks = 0;
		this.beater.reset();
		this.beater.resetCorrections();
		this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 20);
		this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 60);
		this.finished = false;
		this.objects["beatbar"].hidden = false;
		this.objects["label"].text = "Click when the box reaches the middle.";
		_game.soundManager.switchMusic(null);
	}
	
	init()
	{
		_game.addHeaderObjects(this.objects, this._gfx);
		
		this.objects["beatbar"] = new GfxCalibrationbar(this._gfx, (288 - 120) / 2, 150, 120);
		this.objects["label"] = new GfxLabel(this._gfx, 144, 180, "center", "...");
	}
	
	tick()
	{
		this.ticks++;
		
		if (this.phase == 0)
		{
			if (this.ticks == 300)
			{
				this.objects["label"].text = "Just a few more times.";
			}
			
			if (this.ticks % 80 == 0)
			{
				this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 20);
				this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 60);
			}
			
			this.objects["beatbar"].pos = Math.cos(this.ticks / 80 * (2 * Math.PI));
			
			if (this.beater.isStable)
			{
				this.objects["beatbar"].hidden = true;
				this.beater.saveGfxCorrection();
				this.objects["label"].text = "Thanks!";
				this.phase = 1;
				this.ticks = 0;
			}
		}
		else if (this.phase == 1)
		{
			if (this.ticks == 60)
			{
				this.beater.reset();
				this.objects["label"].text = "And now click when you hear the tone.";
				this.phase = 2;
				this.ticks = 0;
				_game.soundManager.switchMusic(0);
			}
		}
		else if (this.phase == 2)
		{
			if (this.ticks == 300)
			{
				this.objects["label"].text = "Just a few more times.";
			}
			if (this.beater.isStable)
			{
				this.beater.saveSoundCorrection();
				this.beater.save();
				this.objects["label"].text = "Thanks, we are good to go!";
				_game.soundManager.switchMusic(null);
				this.phase = 3;
				this.ticks = 0;
			}
		}
		else if (this.phase == 3)
		{
			if (this.ticks == 60)
			{
				_game.switchScreen("menu");
				this.finished = true;
			}
		}
		
		this.objects["beatbar"].tick();
	}
}
