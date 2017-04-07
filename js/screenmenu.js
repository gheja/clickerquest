"use strict";

class ScreenMenu extends Screen2
{
	constructor()
	{
		super();
	}
	
	clickDefault()
	{
	}
	
	clickStartGame()
	{
		_game.startLevel();
	}
	
	clickCalibration()
	{
		_game.switchScreen('calibration');
	}
	
	clickCredits()
	{
	}
	
	enter()
	{
		_soundManager.switchMusic(0);
	}
	
	init()
	{
		_game.addHeaderObjects(this.objects);
		_game.addBeatObjects(this.objects);
		
		this.objects["button1"] = new GfxButton(100, 160, 100, "Start game", this.clickStartGame.bind(this));
		this.objects["button2"] = new GfxButton(100, 180, 100, "Calibration", this.clickCalibration.bind(this));
		this.objects["button3"] = new GfxButton(100, 200, 100, "Credits", this.clickCredits.bind(this));
		this.objects["button4"] = new GfxButton(100, 230, 100, "Reset progress", this.clickCredits.bind(this));
	}
	
	tick()
	{
		this.objects["beatbar"].setBeatsFromBeater(_game.getTime());
		this.objects["logo"].y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
	}
}
