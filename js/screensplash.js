"use strict";

class ScreenSplash extends Screen2
{
	constructor()
	{
		super();
		this.ticks = 0;
		this.phase = 0;
	}
	
	clickDefault()
	{
		if (this.phase == 1)
		{
			if (_beater.isCalibrated)
			{
				_game.switchScreen('menu');
			}
			else
			{
				_game.switchScreen('calibration');
			}
		}
	}
	
	init()
	{
		this.objects['cover'] = new GfxImage("cover_splash", 0, 32);
		this.objects['logo'] = new GfxImage("logo", 94, 32);
		this.objects['label'] = new GfxLabel(144, 240, "center", "Loading...");
		this.objects['label2'] = new GfxLabel(144, 160, "center", "WARNING");
		this.objects['label3'] = new GfxLabel(144, 172, "center", "By default this game contains flashing images that might");
		this.objects['label4'] = new GfxLabel(144, 180, "center", "trigger seizures for people with photosensitive epilepsy.");
		this.objects['label5'] = new GfxLabel(144, 192, "center", "The effects can be turned off in the Options menu.");
	}
	
	tick()
	{
		this.ticks++;
		
		if (this.phase == 0)
		{
		}
		else if (this.phase == 1)
		{
			if (this.ticks % 30 == 1)
			{
				this.objects['label'].text = "Click to continue"
			}
			else if (this.ticks % 30 == 16)
			{
				this.objects['label'].text = "";
			}
		}
		
		this.objects['logo'].y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
	}
}
