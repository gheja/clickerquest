"use strict";

class ScreenSplash extends Screen2
{
	constructor()
	{
		super();
		
		this.drawLogo = true;
		
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
		this.objects['label'] = new GfxLabel(144, 240, "center", "Loading...");
/*
		this.objects['label2'] = new GfxLabel(144, 160, "center", "WARNING\n" +
			"\n" +
			"By default this game contains flashing images that might\n" +
			"trigger seizures for people with photosensitive epilepsy.\n" +
			"\n" +
			"The effects can be turned off in the Options menu.");
*/
		this.objects['label2'] = new GfxLabel(144, 160, "center", "Be warned\n" +
			"\n" +
			"This is a work-in-progress demo, with a lot of\n" +
			"placeholder graphics (yes, including the logo) and\n" +
			"enemies. Updates will come soon-ish :)");
	}
	
	tick()
	{
		this.tickCommonObjects();
		
		if (this.phase == 1)
		{
			if (_game.ticks % 30 == 1)
			{
				this.objects['label'].text = "Click to continue";
			}
			else if (_game.ticks % 30 == 16)
			{
				this.objects['label'].text = "";
			}
		}
	}
}
