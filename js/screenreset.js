"use strict";

class ScreenReset extends Screen2
{
	constructor()
	{
		super();
		
		this.drawLogo = true;
		this.drawBeats = true;
	}
	
	clickYes()
	{
		_game.resetGame();
		_game.switchScreen("menu");
	}
	
	clickNo()
	{
		_game.switchScreen("menu");
	}
	
	init()
	{
		this.objects['label'] = new GfxLabel(144, 160, "center", "Are you sure you want to reset your progress?");
		this.objects["button_yes"] = new GfxButton(94, 180, 40, "Yes", this.clickYes.bind(this));
		this.objects["button_no"] = new GfxButton(154, 180, 40, "No", this.clickNo.bind(this));
	}
}
