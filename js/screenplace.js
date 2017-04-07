"use strict";

class ScreenPlace extends Screen2
{
	constructor()
	{
		super();
		this.a = 0;
	}
	
	clickStartTurn()
	{
		this.hero1.turnPrepare();
		this.enemy.turnPrepare();
		
		this.hero1.turnAction();
		this.enemy.turnAction();
		
		this.hero1.turnFinish();
		this.enemy.turnFinish();
	}
	
	enter()
	{
		this.hideHover();
	}
	
	clickMenu()
	{
		_game.switchScreen('menu');
	}
	
	init()
	{
		_game.addBeatObjects(this.objects);
		
		this.objects["cover"] = new GfxImage("cover_place1", 0, 32);
		
		this.objects["button_run"] = new GfxButton(0, 240, 60, "Start turn", this.clickStartTurn.bind(this));
		this.objects["button_explore"] = new GfxButton(62, 240, 40, "Explore", this.clickStartTurn.bind(this));
		this.objects["button_flee"] = new GfxButton(104, 240, 40, "Flee", this.clickStartTurn.bind(this));
		this.objects["button_inventory"] = new GfxButton(146, 240, 58, "Inventory", this.clickStartTurn.bind(this));
		this.objects["button_map"] = new GfxButton(206, 240, 40, "Map", this.clickStartTurn.bind(this));
		this.objects["button_back"] = new GfxButton(248, 240, 40, "Menu", this.clickMenu.bind(this));
		
		this.objects["button_explore"].disabled = true;
		this.objects["button_flee"].disabled = true;
		this.objects["button_inventory"].disabled = true;
		this.objects["button_map"].disabled = true;
		
		
		this.hero1 = new ObjCharacter();
		this.enemy = new ObjCharacter();
		
		this.objects["character_hero1"] = new GfxCharacter(0, this.hero1);
		this.objects["character_enemy"] = new GfxCharacter(2, this.enemy);
		
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
		this.a++;
		
		this.objects["bar"].value += 1;
		this.objects["beatbar"].setBeatsFromBeater(_game.getTime());
		this.objects["beatbar"].status = "matched";
	}
	
	clickDefault(x, y)
	{
	}
}
