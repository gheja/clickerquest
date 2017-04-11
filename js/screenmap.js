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
	
	clickMapMarker(placeName)
	{
		let a;
		
		for (a of _game.places)
		{
			if (a.name == placeName)
			{
				if (a.unlocked)
				{
					_game.setActivePlace(placeName);
					_game.switchScreen("place");
				}
				return;
			}
		}
	}
	
	init()
	{
		let a;
		
		_game.addBeatObjects(this.objects);
		
		this.objects["map"] = new GfxImage("map", 0, 32);
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Back", this.clickBack.bind(this));
		
		for (a of _game.places)
		{
			this.objects["marker_place_" + a.name] = new GfxImage("map_marker_locked", this.objects["map"].x + a.mapX - 9, this.objects["map"].y + a.mapY - 9);
			this.objects["marker_place_" + a.name].width = 18;
			this.objects["marker_place_" + a.name].height = 18;
			this.objects["marker_place_" + a.name].clickable = true;
			this.objects["marker_place_" + a.name].clickCallback = this.clickMapMarker.bind(this, a.name);
			this.objects["label_place_" + a.name] = new GfxLabel(this.objects["map"].x + a.mapX, this.objects["map"].y + a.mapY + 16, "center", a.displayName);
		}
	}
	
	update()
	{
		let a;
		
		for (a of _game.places)
		{
			if (!a.unlocked)
			{
				this.objects["marker_place_" + a.name].name = "map_marker_locked";
				this.objects["label_place_" + a.name].hidden = true;
			}
			else
			{
				this.objects["label_place_" + a.name].hidden = false;
				
				if (a != _game.activePlace)
				{
					this.objects["marker_place_" + a.name].name = "map_marker_unlocked";
				}
				else
				{
					this.objects["marker_place_" + a.name].name = "map_marker_current";
				}
			}
		}
	}
	
	tick()
	{
		if (_game.newClick)
		{
			this.update();
		}
		
		this.objects["beatbar"].tick();
	}
}
