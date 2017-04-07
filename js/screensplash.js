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
		this.cover = new GfxImage("cover_splash", 0, 32);
		this.logo = new GfxImage("logo", 94, 32);
		this.label = new GfxLabel(144, 180, "center", "Loading...");
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
				this.label.text = "Click to continue"
			}
			else if (this.ticks % 30 == 16)
			{
				this.label.text = "";
			}
		}
		
		this.logo.y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
	}
	
	draw()
	{
		_gfx.clear();
		
		this.cover.draw();
		this.logo.draw();
		this.label.draw();
	}
}
