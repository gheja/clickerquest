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
		_game.activePlace.explore();
	}
	
	clickFlee()
	{
	}
	
	clickInventory()
	{
	}
	
	clickMap()
	{
	}
	
	enter()
	{
		this.hideHover();
	}
	
	clickMenu()
	{
		_game.switchScreen('menu');
	}
	
	updatePhase()
	{
		switch (_game.phase)
		{
			case "none":
			case "place":
				this.objects["button_run"].disabled = true;
				this.objects["button_explore"].disabled = false;
				this.objects["button_flee"].disabled = true;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = false;
			break;
			
			case "encounter":
				this.objects["button_run"].disabled = true;
				this.objects["button_explore"].disabled = false;
				this.objects["button_flee"].disabled = true;
				this.objects["button_inventory"].disabled = false;
				this.objects["button_map"].disabled = true;
			break;
		}
	}
	
	init()
	{
		let i;
		
		_game.addBeatObjects(this.objects);
		
		this.objects["cover"] = new GfxImage("cover_place1", 0, 32);
		
		this.objects["label_story"] = new GfxLabel(0, 150, "left", "The party has just found a Lorem Ipsum Dolor, nice!");
		
		this.objects["button_run"] = new GfxButton(0, 243, 60, "Start turn", this.clickStartTurn.bind(this));
		this.objects["button_explore"] = new GfxButton(62, 243, 40, "Explore", this.clickExplore.bind(this));
		this.objects["button_flee"] = new GfxButton(104, 243, 40, "Flee", this.clickFlee.bind(this));
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
		
		this.hero1.equipment.weapon = new ItemFirstSword();
		this.hero1.equipment.shield = new ItemFirstShield();
		this.hero1.target = this.enemy;
		this.hero1.ownParty = [ this.hero1 ];
		this.hero1.targetParty = [ this.enemy ];
		
		this.enemy.equipment.weapon = new ItemFirstSword();
		this.enemy.equipment.shield = new ItemFirstShield();
		this.enemy.target = this.hero1;
		this.enemy.ownParty = [ this.enemy ];
		this.enemy.targetParty = [ this.hero1 ];
	}
	
	tick()
	{
		if (_game.newClick)
		{
			this.objects["map_progress"].max = _game.activePlace.progressNeeded;
			this.objects["map_progress"].value = _game.activePlace.progressValue;
		}
		
		this.objects["beatbar"].setBeatsFromBeater(_game.getTime());
	}
	
	clickDefault(x, y)
	{
	}
}
