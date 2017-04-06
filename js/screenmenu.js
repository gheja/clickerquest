"use strict";

class ScreenMenu extends Screen2
{
	constructor(a)
	{
		super(a);
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
		_game.soundManager.switchMusic(0);
	}
	
	init()
	{
		this.objects["cover"] = new GfxImage(this._gfx, "cover_splash", 0, 32);
		this.objects["logo"] = new GfxImage(this._gfx, "logo", 94, 32);
		this.objects["beatbar"] = new GfxBeatbar(this._gfx, 8, 8);
		this.objects["bar"] = new GfxBar(this._gfx, 108, 8, 172);
		this.objects["button1"] = new GfxButton(this._gfx, 100, 160, 100, "Start game", this.clickStartGame.bind(this));
		this.objects["button2"] = new GfxButton(this._gfx, 100, 180, 100, "Calibration", this.clickCalibration.bind(this));
		this.objects["button3"] = new GfxButton(this._gfx, 100, 200, 100, "Credits", this.clickCredits.bind(this));
		this.objects["button4"] = new GfxButton(this._gfx, 100, 230, 100, "Reset progress", this.clickCredits.bind(this));
	}
	
	tick()
	{
		this.objects["beatbar"].setBeatsFrom(_game.beater, _game.getTime());
		this.objects["logo"].y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
	}
}
