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
		_game.soundManager.switchMusic(null);
	}
	
	init()
	{
		this.beatbar = new GfxCalibrationbar(this._gfx, (288 - 120) / 2, 150, 120);
		this.label = new GfxLabel(this._gfx, 144, 180, "center", "Click when the box reaches the middle.");
		this.cover = new GfxImage(this._gfx, "cover_splash", 0, 32);
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
				this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 20);
				this.beater.addBeat(_game.getTime() + FRAME_TIME_MS * 60);
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
			if (this.ticks == 60)
			{
				this.beater.reset();
				this.label.text = "And now click when you hear the tone.";
				this.phase = 2;
				this.ticks = 0;
				_game.soundManager.switchMusic(0);
			}
		}
		else if (this.phase == 2)
		{
			if (this.ticks == 300)
			{
				this.label.text = "Just a few more times.";
			}
			if (this.beater.isStable)
			{
				this.beater.saveSoundCorrection();
				this.beater.save();
				this.label.text = "Thanks, we are good to go!";
				_game.soundManager.switchMusic(null);
				this.phase = 3;
				this.ticks = 0;
			}
		}
		else if (this.phase == 3)
		{
			if (this.ticks == 60)
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
		
		this.cover.draw();
		
		if (this.phase == 0)
		{
			this.beatbar.draw();
		}
		
		this.label.draw();
	}
}
