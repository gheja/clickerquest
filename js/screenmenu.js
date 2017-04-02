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
	
	init()
	{
		this.objects["cover"] = new GfxCover(this._gfx, "splash", 0, 0);
		this.objects["button1"] = new GfxButton(this._gfx, 100, 140, 100, "Start game", _game.startLevel.bind(_game));
		this.objects["button2"] = new GfxButton(this._gfx, 100, 160, 100, "Calibration");
		this.objects["button3"] = new GfxButton(this._gfx, 100, 180, 100, "Credits");
//		this.objects["label"] = new GfxButton(this._gfx, 100, 180, "");
	}
	
	tick()
	{
	}
	
	draw()
	{
		let i;
		
		this._gfx.clear();
		
		for (i in this.objects)
		{
			this.objects[i].draw();
		}
	}
}
