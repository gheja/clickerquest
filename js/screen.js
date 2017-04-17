"use strict";

class Screen2
{
	constructor()
	{
		this.objects = {};
		this.drawBeats = false;
		this.drawLogo = false;
	}
	
	enter()
	{
		this.hideHover();
	}
	
	leave()
	{
	}
	
	clickDefault(x, y)
	{
	}
	
	hideHover()
	{
		var i;
		
		for (i in this.objects)
		{
			this.objects[i].checkHover(-1, -1);
		}
	}
	
	mouseMove(x, y)
	{
		var i;
		
		for (i in this.objects)
		{
			this.objects[i].checkHover(x, y);
		}
	}
	
	click(x, y)
	{
		var i;
		
		for (i in this.objects)
		{
			if (this.objects[i].checkAndDoClick(x, y))
			{
				return true;
			}
		}
		
		this.clickDefault(x, y);
		
		return false;
	}
	
	tickCommonObjects()
	{
		let i;
		
		for (i in _game.commonObjects)
		{
			_game.commonObjects[i].tick();
		}
		
		for (i in _game.commonObjectsLogo)
		{
			_game.commonObjectsLogo[i].tick();
		}
		
		for (i in _game.commonObjectsBeat)
		{
			_game.commonObjectsBeat[i].tick();
		}
		
		_game.commonObjectsLogo['logo'].y = Math.floor(30 + Math.pow(Math.cos(_game.ticks * 0.03), 4) * 5);
		_game.commonObjectsBeat["label_multiplier"].text = "x" + roundAndString(_multiplier.getRealMultiplier());
	}
	
	drawCommonObjects()
	{
		let i;
		
		for (i in _game.commonObjects)
		{
			if (_game.commonObjects[i].hidden == false)
			{
				_game.commonObjects[i].draw();
			}
		}
		
		if (this.drawLogo)
		{
			for (i in _game.commonObjectsLogo)
			{
				if (_game.commonObjectsLogo[i].hidden == false)
				{
					_game.commonObjectsLogo[i].draw();
				}
			}
		}
		
		if (this.drawBeats)
		{
			for (i in _game.commonObjectsBeat)
			{
				if (_game.commonObjectsBeat[i].hidden == false)
				{
					_game.commonObjectsBeat[i].draw();
				}
			}
		}
	}
	
	draw()
	{
		let i;
		
		_gfx.clear();
		
		for (i in this.objects)
		{
			if (this.objects[i].hidden == false)
			{
				this.objects[i].draw();
			}
		}
		
		this.drawCommonObjects();
	}
	
	tick()
	{
		this.tickCommonObjects();
	}
}
