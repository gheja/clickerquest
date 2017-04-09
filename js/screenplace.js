"use strict";

class ScreenPlace extends Screen2
{
	constructor()
	{
		super();
	}
	
	clickStartTurn()
	{
		_game.startTurn();
	}
	
	clickExplore()
	{
		_game.clearEnemyParty();
		_game.activePlace.explore();
	}
	
	clickFlee()
	{
	}
	
	clickRest()
	{
		let tmp, a;
		
		for (a of _game.heroParty)
		{
			if (!a.dead)
			{
				tmp = a.action;
				
				a.action = "rest";
				a.turnPrepare();
				a.turnAction();
				a.turnFinish();
				
				a.action = tmp;
			}
		}
	}
	
	clickInventory()
	{
	}
	
	clickMap()
	{
		_game.switchScreen("map");
	}
	
	enter()
	{
		this.hideHover();
		_game.addStoryText("You are now at " + _game.activePlace.displayName + ".");
		_game.updateGamePhase(true);
		this.updatePartyGfx();
	}
	
	clickMenu()
	{
		_game.switchScreen('menu');
	}
	
	updatePartyGfx()
	{
		let a, i;
		
		for (i=0; i<6; i++)
		{
			this.objects["character_hero" + i].characterObj = null;
			this.objects["character_hero" + i].hidden = true;
			this.objects["character_enemy" + i].characterObj = null;
			this.objects["character_enemy" + i].hidden = true;
		}
		
		i = 0;
		for (a of _game.heroParty)
		{
			if (a == null)
			{
				continue;
			}
			
			this.objects["character_hero" + i].characterObj = a;
			this.objects["character_hero" + i].hidden = false;
			
			i++;
		}
		
		i = 0;
		for (a of _game.enemyParty)
		{
			if (a == null)
			{
				continue;
			}
			
			this.objects["character_enemy" + i].characterObj = a;
			this.objects["character_enemy" + i].hidden = false;
			
			i++;
		}
	}
	
	updateGamePhase()
	{
		switch (_game.gamePhase)
		{
			case "normal":
				this.objects["button_run"].disabled = true;
				this.objects["button_explore"].disabled = false;
				this.objects["button_flee"].disabled = true;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = false;
				
				this.objects["button_flee"].hidden = true;
				this.objects["button_rest"].hidden = false;
				
				if (_game.activePlace)
				{
					_gfx.setBackgroundColor(_game.activePlace.background);
				}
			break;
			
			case "encounter":
				this.objects["button_run"].disabled = false;
				this.objects["button_explore"].disabled = true;
				this.objects["button_flee"].disabled = false;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = true;
				
				this.objects["button_flee"].hidden = false;
				this.objects["button_rest"].hidden = true;
				
				_gfx.setBackgroundColor("#bb7700");
			break;
			
			case "encounter-done":
				this.objects["button_run"].disabled = true;
				this.objects["button_explore"].disabled = false;
				this.objects["button_flee"].disabled = true;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = false;
				
				this.objects["button_flee"].hidden = true;
				this.objects["button_rest"].hidden = false;
				
				_gfx.setBackgroundColor("#aa5500");
			break;
		}
	}
	
	init()
	{
		let i;
		
		_game.addBeatObjects(this.objects);
		
		this.objects["cover"] = new GfxImage("cover_place1", 0, 32);
		
		this.objects["label_story"] = new GfxLabel(0, 150, "left", "Story text");
		
		this.objects["button_run"] = new GfxButton(0, 243, 60, "Start turn", this.clickStartTurn.bind(this));
		this.objects["button_explore"] = new GfxButton(62, 243, 40, "Explore", this.clickExplore.bind(this));
		this.objects["button_flee"] = new GfxButton(104, 243, 40, "Flee", this.clickFlee.bind(this));
		this.objects["button_rest"] = new GfxButton(104, 243, 40, "Rest", this.clickRest.bind(this));
		this.objects["button_inventory"] = new GfxButton(146, 243, 58, "Inventory", this.clickInventory.bind(this));
		this.objects["button_map"] = new GfxButton(206, 243, 40, "Map", this.clickMap.bind(this));
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Menu", this.clickMenu.bind(this));
		
		this.objects["map_progress"] = new GfxBar(0, 133, 288, 8, 100, 70, 3);
		
		this.hero1 = new ObjCharacter();
		this.enemy = new ObjCharacter();
		
		for (i=0; i<6; i++)
		{
			this.objects["character_hero" + i] = new GfxCharacter(i, null);
			this.objects["character_enemy" + i] = new GfxEnemy(i, null);
		}
	}
	
	tick()
	{
		if (_game.newClick)
		{
			this.objects["map_progress"].max = _game.activePlace.progressNeeded;
			this.objects["map_progress"].value = _game.activePlace.progressValue;
			this.objects["label_story"].text = _game.storyTexts[_game.storyTexts.length - 1];
		}
		
		this.objects["beatbar"].setBeatsFromBeater(_game.getTime());
	}
	
	clickDefault(x, y)
	{
	}
}
