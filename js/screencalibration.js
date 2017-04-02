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
		this.beater.addBeat(Date.now() + FRAME_TIME_MS * 20);
		this.beater.addBeat(Date.now() + FRAME_TIME_MS * 60);
		this.finished = false;
	}
	
	init()
	{
		this.beatbar = new GfxCalibrationbar(this._gfx, (288 - 120) / 2, 120, 120);
		this.label = new GfxLabel(this._gfx, 144, 140, "center", "Click when the box reaches the middle.");
		this.cover = new GfxCover(this._gfx, "splash", 0, 0);
	}
	
	tick()
	{
		this.ticks++;
		
		if (this.phase == 0)
		{
			if (this.ticks == 300)
			{
				this.label.text = "Just a few more times.";
			}
			
			if (this.ticks % 80 == 0)
			{
				this.beater.addBeat(Date.now() + FRAME_TIME_MS * 20);
				this.beater.addBeat(Date.now() + FRAME_TIME_MS * 60);
			}
			
			this.beatbar.pos = Math.cos(this.ticks / 80 * (2 * Math.PI));
			
			if (this.beater.isStable)
			{
				this.beater.saveGfxCorrection();
				this.label.text = "Thanks!";
				this.phase = 1;
				this.ticks = 0;
			}
		}
		else if (this.phase == 1)
		{
			if (this.ticks == 45)
			{
				this.beater.reset();
				this.label.text = "And now click when you hear the tone.";
				this.phase = 2;
				this.ticks = 0;
			}
		}
		else if (this.phase == 2)
		{
//			if (this.ticks == 300)
//			{
//				this.label.text = "Just a few more times.";
//			}
//			if (this.beater.isStable)
			{
				this.beater.saveSoundCorrection();
				this.beater.save();
				this.label.text = "Thanks, we are good to go!";
				this.phase = 3;
				this.ticks = 0;
			}
		}
		else if (this.phase == 3)
		{
			if (this.ticks == 45)
			{
				_game.switchScreen('menu');
				this.finished = true;
			}
		}
		
		this.beatbar.tick();
	}
	
	draw()
	{
		this._gfx.clear();
		
		if (this.phase == 0)
		{
			this.beatbar.draw();
		}
		
		this.label.draw();
		this.cover.draw();
	}
}
