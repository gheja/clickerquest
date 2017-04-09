"use strict";

class ScreenMap extends Screen2
{
	constructor()
	{
		super();
	}
	
	enter()
	{
		_gfx.setBackgroundColor("#887733");
		_gfx.setForegroundColor("#ffffff");
		this.hideHover();
	}
	
	clickBack()
	{
		_game.switchScreen("place");
	}
	
	init()
	{
		_game.addBeatObjects(this.objects);
		
		this.objects["map"] = new GfxImage("map", 0, 32);
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Back", this.clickBack.bind(this));
	}
	
	tick()
	{
		this.objects["beatbar"].setBeatsFromBeater(_game.getTime());
	}
}
