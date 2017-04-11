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
		_game.startGame();
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
		_game.setGamePhase("paused");
		_gfx.setBackgroundColor("#002255");
		_gfx.setForegroundColor("#ffffff");
		this.hideHover();
	}
	
	init()
	{
		_game.addHeaderObjects(this.objects);
		_game.addBeatObjects(this.objects);
		
		this.objects["button1"] = new GfxButton(100, 150, 100, "Start game", this.clickStartGame.bind(this));
		this.objects["button2"] = new GfxButton(100, 166, 100, "Calibration", this.clickCalibration.bind(this));
		this.objects["button3"] = new GfxButton(100, 182, 100, "Options", this.clickCredits.bind(this));
		this.objects["button4"] = new GfxButton(100, 198, 100, "Credits", this.clickCredits.bind(this));
		this.objects["button5"] = new GfxButton(100, 224, 100, "Reset progress", this.clickCredits.bind(this));
	}
	
	tick()
	{
		this.objects["beatbar"].tick();
		this.objects["logo"].y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
	}
}
