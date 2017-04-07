"use strict";

class ScreenPlace extends Screen2
{
	constructor(a)
	{
		super(a);
		
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
	
	clickMenu()
	{
		_game.switchScreen('menu');
	}
	
	init()
	{
		this.objects["cover"] = new GfxImage(this._gfx, "cover_place1", 0, 32);
		
		this.objects["beatbar"] = new GfxBeatbar(this._gfx, 8, 8);
		this.objects["bar"] = new GfxBar(this._gfx, 108, 8, 172);
		this.objects["multiplier"] = new GfxMultiplier(this._gfx, 108, 20);
		this.objects["multiplier"].max = 4;
		
		this.objects["button_run"] = new GfxButton(this._gfx, 0, 240, 60, "Start turn", this.clickStartTurn.bind(this));
		this.objects["button_explore"] = new GfxButton(this._gfx, 62, 240, 40, "Explore", this.clickStartTurn.bind(this));
		this.objects["button_flee"] = new GfxButton(this._gfx, 104, 240, 40, "Flee", this.clickStartTurn.bind(this));
		this.objects["button_inventory"] = new GfxButton(this._gfx, 146, 240, 58, "Inventory", this.clickStartTurn.bind(this));
		this.objects["button_map"] = new GfxButton(this._gfx, 206, 240, 40, "Map", this.clickStartTurn.bind(this));
		this.objects["button_back"] = new GfxButton(this._gfx, 248, 240, 40, "Menu", this.clickMenu.bind(this));
		
		this.objects["button_explore"].disabled = true;
		this.objects["button_flee"].disabled = true;
		this.objects["button_inventory"].disabled = true;
		this.objects["button_map"].disabled = true;
		
		
		this.hero1 = new ObjCharacter();
		this.enemy = new ObjCharacter();
		
		this.objects["character_hero1"] = new GfxCharacter(this._gfx, 0, this.hero1);
		this.objects["character_enemy"] = new GfxCharacter(this._gfx, 2, this.enemy);
		
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
		this.objects["beatbar"].setBeatsFrom(_game.beater, _game.getTime());
		this.objects["beatbar"].status = "matched";
	}
	
	clickDefault(x, y)
	{
	}
}
