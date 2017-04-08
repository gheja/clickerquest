"use strict";

class GfxCharacter extends GfxBase
{
	constructor(n, characterObj)
	{
		let x, y;
		
		x = (n % 3) * 97;
		y = Math.floor(n / 3) * 44 + 155;
		
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
		this.gfxObjects["bar_health"] = new GfxBar(0, 0, 51, 3, 0, 0, 2);
		this.gfxObjects["bar_attack"] = new GfxBar(0, 0, 51, 3, 0, 0, 2);
		this.gfxObjects["bar_defense"] = new GfxBar(0, 0, 51, 3, 0, 0, 2);
		this.gfxObjects["bar_xp"] = new GfxBar(0, 0, 61, 2, 0, 0, 2);
		this.gfxObjects["action"] = new GfxButtonswitch(0, 0, this.onCycleAction.bind(this));
		this.gfxObjects["label_health"] = new GfxLabel(0, 0, 'left', '1-2');
		this.gfxObjects["label_attack"] = new GfxLabel(0, 0, 'left', '1-2');
		this.gfxObjects["label_defense"] = new GfxLabel(0, 0, 'left', '1-2');
		this.gfxObjects["label_xp"] = new GfxLabel(0, 0, 'left', 'Level 17');
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
		this.gfxObjects["label_xp"].x = this.x + 32;
		this.gfxObjects["label_xp"].y = this.y + 5;
		this.gfxObjects["bar_xp"].x = this.x + 32;
		this.gfxObjects["bar_xp"].y = this.y + 6;
		this.gfxObjects["icon_health"].x = this.x + 32;
		this.gfxObjects["icon_health"].y = this.y + 10;
		this.gfxObjects["label_health"].x = this.x + 42;
		this.gfxObjects["label_health"].y = this.y + 15;
		this.gfxObjects["bar_health"].x = this.x + 42;
		this.gfxObjects["bar_health"].y = this.y + 16;
		this.gfxObjects["icon_attack"].x = this.x + 32;
		this.gfxObjects["icon_attack"].y = this.y + 21;
		this.gfxObjects["label_attack"].x = this.x + 42;
		this.gfxObjects["label_attack"].y = this.y + 26;
		this.gfxObjects["bar_attack"].x = this.x + 42;
		this.gfxObjects["bar_attack"].y = this.y + 27;
		this.gfxObjects["icon_defense"].x = this.x + 32;
		this.gfxObjects["icon_defense"].y = this.y + 32;
		this.gfxObjects["label_defense"].x = this.x + 42;
		this.gfxObjects["label_defense"].y = this.y + 37;
		this.gfxObjects["bar_defense"].x = this.x + 42;
		this.gfxObjects["bar_defense"].y = this.y + 38;
		this.gfxObjects["action"].x = this.x + 0;
		this.gfxObjects["action"].y = this.y + 32;
	}
	
	update()
	{
		let tmp;
		
		if (this.characterObj.dead)
		{
			this.gfxObjects["border"].name = "portrait_border_dead";
		}
		else
		{
			this.gfxObjects["border"].name = "portrait_border";
		}
		
		this.gfxObjects["bar_health"].value = this.characterObj.healthValue;
		this.gfxObjects["bar_health"].max = this.characterObj.healthMax;
		this.gfxObjects["bar_attack"].value = getLevelValue(this.characterObj.points.attackOneHanded);
		this.gfxObjects["bar_attack"].max = getLevelMax(this.characterObj.points.attackOneHanded);
		
		this.gfxObjects["label_health"].text = this.characterObj.healthValue + "/" + this.characterObj.healthMax;
		if (this.characterObj.equipment.weapon)
		{
			if (this.characterObj.equipment.weapon.weaponClass == WEAPON_CLASS_ONE_HANDED)
			{
				tmp = this.characterObj.points.attackOneHanded;
			}
			else
			{
				tmp = this.characterObj.points.attackOneHanded;
			}
			
			this.gfxObjects["label_attack"].text = "L" + getLevelFromExperiencePoints(tmp) + " " + this.characterObj.equipment.weapon.baseDamageMin + "-" + this.characterObj.equipment.weapon.baseDamageMax;
		}
		else
		{
			this.gfxObjects["label_attack"].text = "-";
		}
		this.gfxObjects["bar_defense"].value = getLevelValue(this.characterObj.points.defense);
		this.gfxObjects["bar_defense"].max = getLevelMax(this.characterObj.points.defense);
		if (this.characterObj.equipment.shield)
		{
			this.gfxObjects["label_defense"].text = "L" + getLevelFromExperiencePoints(this.characterObj.points.defense) + " " + this.characterObj.equipment.shield.baseDefenseMin + "-" + this.characterObj.equipment.shield.baseDefenseMax;
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
