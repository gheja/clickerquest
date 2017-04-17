"use strict";

class ScreenPlace extends Screen2
{
	constructor()
	{
		super();
		
		this.drawBeats = true;
	}
	
	clickStartTurn()
	{
		_game.executeTurn();
	}
	
	clickExplore()
	{
		_game.cleanupAfterEncounter();
		_game.activePlace.explore();
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
		_game.switchScreen("inventory");
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
	
	clickGuyButton()
	{
		_game.addGuyFromPlace();
	}
	
	updatePartyGfx()
	{
		let a, i;
		
		for (i=0; i<6; i++)
		{
			this.objects["character_hero" + i + "_placeholder"].hidden = false;
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
			this.objects["character_hero" + i + "_placeholder"].hidden = true;
			
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
				this.objects["button_rest"].disabled = false;
				this.objects["button_explore"].disabled = false;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = false;
				
				if (_game.activePlace)
				{
					_gfx.setBackgroundColor(_game.activePlace.background);
				}
			break;
			
			case "encounter":
				this.objects["button_run"].disabled = false;
				this.objects["button_rest"].disabled = true;
				this.objects["button_explore"].disabled = true;
				this.objects["button_inventory"].disabled = true;
				this.objects["button_map"].disabled = true;
				
				_gfx.setBackgroundColor("#bb7700");
			break;
			
			case "encounter-fled":
				this.objects["button_run"].disabled = true;
				this.objects["button_rest"].disabled = false;
				this.objects["button_explore"].disabled = false;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = true;
				
				_gfx.setBackgroundColor("#bb7700");
			break;
			
			case "encounter-done":
				this.objects["button_run"].disabled = true;
				this.objects["button_rest"].disabled = false;
				this.objects["button_explore"].disabled = false;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = false;
				
				_gfx.setBackgroundColor("#aa5500");
			break;
			
			case "dead":
				this.objects["button_run"].disabled = true;
				this.objects["button_explore"].disabled = true;
				this.objects["button_rest"].disabled = true;
				this.objects["button_inventory"].disabled = true;
				this.objects["button_map"].disabled = true;
				
				_gfx.setBackgroundColor("#aa5500");
			break;
		}
	}
	
	showStoryHistory()
	{
		let a, b, c;
		
		a = Math.max(_game.storyTexts.length - 15, 0);
		b = Math.min(a + 15, _game.storyTexts.length - 1);
		c = _game.storyTexts.slice(a, b + 1);
		
		while (c.length < 15)
		{
			c.unshift("");
		}
		// c.reverse();
		
		this.objects["label_story_history"].text = c.join("\n");
		this.objects["cover"].hidden = true;
		this.objects["map_progress"].hidden = true;
		this.objects["label_story_history"].hidden = false;
	}
	
	hideStoryHistory()
	{
		this.objects["cover"].hidden = false;
		this.objects["map_progress"].hidden = false;
		this.objects["label_story_history"].hidden = true;
	}
	
	init()
	{
		let i;
		
		this.objects["cover"] = new GfxImage("cover_place1", 0, 32);
		
		this.objects["label_story"] = new GfxLabel(0, 147, "left", "Story text");
		this.objects["label_story_history"] = new GfxLabel(0, 35, "left", "Story text history");
		this.objects["label_story_history"].hidden = true;
		
		this.objects["button_run"] = new GfxButton(0, 243, 60, "Start turn", this.clickStartTurn.bind(this));
		this.objects["button_explore"] = new GfxButton(62, 243, 40, "Explore", this.clickExplore.bind(this));
		this.objects["button_rest"] = new GfxButton(104, 243, 40, "Rest", this.clickRest.bind(this));
		this.objects["button_inventory"] = new GfxButton(146, 243, 58, "Inventory", this.clickInventory.bind(this));
		this.objects["button_map"] = new GfxButton(206, 243, 40, "Map", this.clickMap.bind(this));
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Menu", this.clickMenu.bind(this));
		
		this.objects["map_progress"] = new GfxBar(0, 133, 288, 8, 100, 70, 3);
		
		for (i=0; i<6; i++)
		{
			this.objects["character_hero" + i + "_placeholder"] = new GfxImage("character_placeholder", 0, 0);
			this.objects["character_hero" + i] = new GfxCharacter(i, null);
			this.objects["character_enemy" + i] = new GfxEnemy(i, null);
			
			// erm...
			this.objects["character_hero" + i + "_placeholder"].x = this.objects["character_hero" + i].x;
			this.objects["character_hero" + i + "_placeholder"].y = this.objects["character_hero" + i].y;
		}
		
		this.objects["label1_guy"] = new GfxLabel(3, 116, "left", "Some wants to join your party.");
		this.objects["label2_guy"] = new GfxLabel(2, 114, "left", "Some wants to join your party.");
		this.objects["button_guy"] = new GfxButton(2, 117, 40, "Okay!", this.clickGuyButton.bind(this));
		this.objects["label1_guy"].inverted = true;
	}
	
	tick()
	{
		let tmp, found;
		
		this.tickCommonObjects();
		
		if ((this.objects["label_story"].hidden == false && this.objects["label_story"].isMouseOver) || (this.objects["label_story_history"].hidden == false && this.objects["label_story_history"].isMouseOver))
		{
			this.showStoryHistory();
		}
		else
		{
			this.hideStoryHistory();
		}
		if (_game.newClick)
		{
			this.objects["map_progress"].max = _game.activePlace.progressNeeded;
			this.objects["map_progress"].value = _game.activePlace.progressValue;
			this.objects["label_story"].text = _game.storyTexts[_game.storyTexts.length - 1];
		}
		
		this.objects["label1_guy"].hidden = true;
		this.objects["label2_guy"].hidden = true;
		this.objects["button_guy"].hidden = true;
		
		if (_game.gamePhase == "normal")
		{
			if (_game.activePlace.progressValue >= _game.activePlace.progressNeeded)
			{
				if (_game.activePlace.guyAtEndOfPlace)
				{
					found = false;
					for (tmp of _game.heroParty)
					{
						if (tmp.originPlace == _game.activePlace.name)
						{
							found = true;
							break;
						}
					}
					
					if (!found)
					{
						this.objects["label1_guy"].hidden = false;
						this.objects["label2_guy"].hidden = false;
						this.objects["button_guy"].hidden = false;
					}
				}
			}
		}
	}
	
	clickDefault(x, y)
	{
	}
}
