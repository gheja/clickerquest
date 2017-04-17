"use strict";

class ScreenCalibration extends Screen2
{
	constructor()
	{
		super();
		
		this.drawLogo = true;
		
		this.a = 0;
		this.screenTicks = 0;
		this.phase = 0;
		this.finished = false;
	}
	
	enter()
	{
		this.phase = 0;
		this.screenTicks = 0;
		_beater.reset();
		_beater.resetCorrections();
		_beater.addBeat(_game.getTime() + FRAME_TIME_MS * 20);
		_beater.addBeat(_game.getTime() + FRAME_TIME_MS * 60);
//		_beater.noEarlier = true;
		this.finished = false;
		this.objects["beatbar"].hidden = false;
		this.objects["label"].text = "Click when the box is at the center.";
		_soundManager.switchMusic(null);
	}
	
	leave()
	{
//		_beater.noEarlier = false;
	}
	
	init()
	{
		this.objects["beatbar"] = new GfxCalibrationbar((288 - 120) / 2, 150, 120);
		this.objects["label"] = new GfxLabel(144, 180, "center", "...");
	}
	
	tick()
	{
		this.screenTicks++;
		
		this.tickCommonObjects();
		
		if (this.phase == 0)
		{
			if (this.screenTicks == 300)
			{
				this.objects["label"].text = "Just a few more times.";
			}
			
			if (this.screenTicks % 80 == 0)
			{
				_beater.addBeat(_game.getTime() + FRAME_TIME_MS * 20);
				_beater.addBeat(_game.getTime() + FRAME_TIME_MS * 60);
			}
			
			this.objects["beatbar"].pos = Math.cos(this.screenTicks / 80 * (2 * Math.PI));
			
			if (_beater.isStable)
			{
				this.objects["beatbar"].hidden = true;
				_beater.saveGfxCorrection();
				this.objects["label"].text = "Thanks!";
				this.phase = 1;
				this.screenTicks = 0;
			}
		}
		else if (this.phase == 1)
		{
			if (this.screenTicks == 60)
			{
				_beater.reset();
				this.objects["label"].text = "And now click when you hear the tone.";
				this.phase = 2;
				this.screenTicks = 0;
				_soundManager.switchMusic(0);
			}
		}
		else if (this.phase == 2)
		{
			if (this.screenTicks == 300)
			{
				this.objects["label"].text = "Just a few more times.";
			}
			if (_beater.isStable)
			{
				_beater.saveSoundCorrection();
				_beater.save();
				this.objects["label"].text = "Thanks, we are good to go!";
				_soundManager.switchMusic(null);
				this.phase = 3;
				this.screenTicks = 0;
			}
		}
		else if (this.phase == 3)
		{
			if (this.screenTicks == 60)
			{
				_game.switchScreen("menu");
				this.finished = true;
			}
		}
		
		this.objects["beatbar"].tick();
	}
}
