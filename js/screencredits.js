"use strict";

class ScreenCredits extends Screen2
{
	constructor()
	{
		super();
		
		this.drawLogo = true;
		this.drawBeats = true;
	}
	
	clickBack()
	{
		_game.switchScreen("menu");
	}
	
	init()
	{
		this.objects['label'] = new GfxLabel(144, 134, "center",
			"A work-in-progress beat-matcher clicker RPG game.\n" +
			"\n" +
			"Code and the placeholder graphics:\n" +
			"Gabor Heja (@gheja_)\n" +
			"http://gabor.heja.hu/\n" +
			"\n" +
			"Music:\n" +
			"Zsolt Heja\n" +
			"http://zsolt.heja.hu/\n"+
			"\n" +
			"Additional thanks:\n" +
			"DuffsDevice for the TinyUnicode font\n" +
			"Audiocogs for the Aurora.js audio framework\n" +
			"\n" +
			"GitHub page:\n" +
			"http://github.com/gheja/"
		);
		
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Back", this.clickBack.bind(this));
	}
}
