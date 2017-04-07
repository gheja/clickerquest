"use strict";

class GfxCharacter extends GfxBase
{
	constructor(n, characterObj)
	{
		let x, y;
		
		x = (n % 3) * 96 + 2;
		y = Math.floor(n / 3) * 40 + 150;
		
		super(x, y, 96, 40);
		
		this.x = x;
		this.y = y;
		
		this.characterObj = characterObj;
		
		this.gfxObjects = {};
		this.gfxObjects["portrait"] = new GfxImage("portrait_hero1");
		this.gfxObjects["border"] = new GfxImage("portrait_border");
		this.gfxObjects["icon_health"] = new GfxImage("icon_health");
		this.gfxObjects["icon_attack"] = new GfxImage("icon_attack");
		this.gfxObjects["icon_defense"] = new GfxImage("icon_defense");
		this.gfxObjects["bar_health"] = new GfxBar(0, 0, 50, 3, 0, 0, 2);
		this.gfxObjects["bar_attack"] = new GfxBar(0, 0, 50, 3, 0, 0, 2);
		this.gfxObjects["bar_defense"] = new GfxBar(0, 0, 50, 3, 0, 0, 2);
		this.gfxObjects["bar_xp"] = new GfxBar(0, 0, 60, 2, 0, 0, 2);
		this.gfxObjects["action"] = new GfxButtonswitch(0, 0, this.onCycleAction.bind(this));
		this.gfxObjects["label_attack"] = new GfxLabel(0, 0, 'left', '1-2');
		this.gfxObjects["label_defense"] = new GfxLabel(0, 0, 'left', '1-2');
	}
	
	onCycleAction()
	{
		this.characterObj.cycleAction();
	}
	
	move(x, y)
	{
		this.x = x;
		this.y = y;
		
		this.gfxObjects["portrait"].x = this.x;
		this.gfxObjects["portrait"].y = this.y;
		this.gfxObjects["border"].x = this.x;
		this.gfxObjects["border"].y = this.y;
		this.gfxObjects["icon_health"].x = this.x + 32;
		this.gfxObjects["icon_health"].y = this.y + 0;
		this.gfxObjects["bar_health"].x = this.x + 42;
		this.gfxObjects["bar_health"].y = this.y + 1;
		this.gfxObjects["icon_attack"].x = this.x + 32;
		this.gfxObjects["icon_attack"].y = this.y + 11;
		this.gfxObjects["bar_attack"].x = this.x + 42;
		this.gfxObjects["bar_attack"].y = this.y + 17;
		this.gfxObjects["label_attack"].x = this.x + 42;
		this.gfxObjects["label_attack"].y = this.y + 16;
		this.gfxObjects["icon_defense"].x = this.x + 32;
		this.gfxObjects["icon_defense"].y = this.y + 22;
		this.gfxObjects["bar_defense"].x = this.x + 42;
		this.gfxObjects["bar_defense"].y = this.y + 28;
		this.gfxObjects["label_defense"].x = this.x + 42;
		this.gfxObjects["label_defense"].y = this.y + 27;
		this.gfxObjects["action"].x = this.x + 0;
		this.gfxObjects["action"].y = this.y + 32;
	}
	
	update()
	{
		this.gfxObjects["bar_health"].value = this.characterObj.healthValue;
		this.gfxObjects["bar_health"].max = this.characterObj.healthMax;
		this.gfxObjects["bar_attack"].value = getLevelValue(this.characterObj.points.attackOneHanded);
		this.gfxObjects["bar_attack"].max = getLevelMax(this.characterObj.points.attackOneHanded);
		if (this.characterObj.equipment.weapon)
		{
			this.gfxObjects["label_attack"].text = this.characterObj.equipment.weapon.baseDamageMin + "-" + this.characterObj.equipment.weapon.baseDamageMax;
		}
		else
		{
			this.gfxObjects["label_attack"].text = "-";
		}
		this.gfxObjects["bar_defense"].value = getLevelValue(this.characterObj.points.defense);
		this.gfxObjects["bar_defense"].max = getLevelMax(this.characterObj.points.defense);
		if (this.characterObj.equipment.shield)
		{
			this.gfxObjects["label_defense"].text = this.characterObj.equipment.shield.baseDefenseMin + "-" + this.characterObj.equipment.shield.baseDefenseMax;
		}
		else
		{
			this.gfxObjects["label_defense"].text = "-";
		}
		this.gfxObjects["action"].spriteName = "action_" + this.characterObj.action;
	}
	
	checkClick(x, y)
	{
		var i;
		
		for (i in this.gfxObjects)
		{
			if (this.gfxObjects[i].checkAndDoClick(x, y))
			{
				// hide hover
				this.gfxObjects[i].checkHover(-1, -1);
				return true;
			}
		}
	}
	
	tick()
	{
	}
	
	draw()
	{
		let i;
		
		this.move(this.x, this.y);
		this.update();
		
		for (i in this.gfxObjects)
		{
			this.gfxObjects[i].draw();
		}
	}
}
