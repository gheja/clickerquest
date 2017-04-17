"use strict";

class ScreenMenu extends Screen2
{
	constructor()
	{
		super();
		
		this.drawBeats = true;
		this.drawLogo = true;
	}
	
	clickDefault()
	{
	}
	
	clickStartGame()
	{
		_game.startGame();
		_game.unpause();
	}
	
	clickCalibration()
	{
		_game.switchScreen('calibration');
	}
	
	clickCredits()
	{
		_game.switchScreen("credits");
	}
	
	clickReset()
	{
		_game.switchScreen("reset");
	}
	
	enter()
	{
		if (_game.isNewGame)
		{
			this.objects["button1"].text = "Start game";
			this.objects["button5"].hidden = true;
		}
		else
		{
			this.objects["button1"].text = "Continue game";
			this.objects["button5"].hidden = false;
		}
		
		_soundManager.switchMusic(1);
		_game.pause();
		this.hideHover();
	}
	
	init()
	{
		this.objects["button1"] = new GfxButton(100, 150, 100, "Start game", this.clickStartGame.bind(this));
		this.objects["button2"] = new GfxButton(100, 166, 100, "Calibration", this.clickCalibration.bind(this));
		this.objects["button3"] = new GfxButton(100, 182, 100, "Credits", this.clickCredits.bind(this));
		this.objects["button5"] = new GfxButton(100, 206, 100, "Reset progress", this.clickReset.bind(this));
	}
}
