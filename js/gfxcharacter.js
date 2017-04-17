"use strict";

class GfxCharacter extends GfxBase
{
	constructor(n, characterObj)
	{
		super(0, 0, 96, 40);
		
		this.characterObj = characterObj;
		
		this.gfxObjects = {};
		this.gfxObjects["portrait"] = new GfxImage("portrait_hero1");
		this.gfxObjects["border"] = new GfxImage("portrait_hero_border");
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
		this.gfxObjects["label_name"] = new GfxLabel(0, 0, 'left', 'Level 17');
		this.gfxObjects["label_level_threat"] = new GfxLabel(0, 0, 'right', 'T000');
		
		this.gfxObjects["border_overlay"] = new GfxImage("portrait_common_hit");
		this.gfxObjects["label_overlay"] = new GfxLabel(0, 0, 'center', '+100');
		this.gfxObjects["label_overlay"].inverted = true;
		
		this.moveToSlot(n);
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
		this.gfxObjects["label_name"].x = this.x + 32;
		this.gfxObjects["label_name"].y = this.y + 5;
		this.gfxObjects["label_level_threat"].x = this.x + 94;
		this.gfxObjects["label_level_threat"].y = this.y + 5;
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
		
		this.gfxObjects["border_overlay"].x = this.x;
		this.gfxObjects["border_overlay"].y = this.y;
		this.gfxObjects["label_overlay"].x = this.x + 15;
		this.gfxObjects["label_overlay"].y = this.y + 11;
	}
	
	moveToSlot(n)
	{
		let x, y;
		
		x = (n % 3) * 97;
		y = Math.floor(n / 3) * 45 + 153;
		
		this.move(x, y);
	}
	
	update()
	{
		let tmp;
		
		if (this.characterObj.dead)
		{
			this.gfxObjects["border"].name = "portrait_hero_border_dead";
		}
		else if (this.characterObj.fled)
		{
			this.gfxObjects["border"].name = "portrait_hero_border_fled";
		}
		else
		{
			this.gfxObjects["border"].name = "portrait_hero_border";
		}
		
		this.gfxObjects["portrait"].name = this.characterObj.spriteName;
		
		this.gfxObjects["label_name"].text = this.characterObj.name;
		this.gfxObjects["label_level_threat"].text = "L" + getLevelFromExperiencePoints(this.characterObj.points.experience) + ",T" + this.characterObj.threat;
		
		this.gfxObjects["bar_xp"].value = getLevelValue(this.characterObj.points.experience);
		this.gfxObjects["bar_xp"].max = getLevelMax(this.characterObj.points.experience);
		this.gfxObjects["bar_health"].value = this.characterObj.healthValue;
		this.gfxObjects["bar_health"].max = this.characterObj.healthMax;
		this.gfxObjects["bar_attack"].value = getLevelValue(this.characterObj.points.attackSword);
		this.gfxObjects["bar_attack"].max = getLevelMax(this.characterObj.points.attackSword);
		
		this.gfxObjects["label_health"].text = this.characterObj.healthValue + "/" + this.characterObj.healthMax;
		if (this.characterObj.equipment.weapon)
		{
			if (this.characterObj.equipment.weapon.weaponClass == WEAPON_CLASS_SWORD)
			{
				tmp = this.characterObj.points.attackSword;
			}
			else
			{
				tmp = this.characterObj.points.attackOthers;
			}
			
			this.gfxObjects["label_attack"].text = "L" + getLevelFromExperiencePoints(tmp) + " " + this.characterObj.equipment.weapon.realDamageMin + "-" + this.characterObj.equipment.weapon.realDamageMax;
		}
		else
		{
			this.gfxObjects["label_attack"].text = "-";
		}
		this.gfxObjects["bar_defense"].value = getLevelValue(this.characterObj.points.defense);
		this.gfxObjects["bar_defense"].max = getLevelMax(this.characterObj.points.defense);
		if (this.characterObj.equipment.shield)
		{
			if (this.characterObj.equipment.shield.realDefenseMin == this.characterObj.equipment.shield.realDefenseMax)
			{
				this.gfxObjects["label_defense"].text = "L" + getLevelFromExperiencePoints(this.characterObj.points.defense) + " " + this.characterObj.equipment.shield.realDefenseMin;
			}
			else
			{
				this.gfxObjects["label_defense"].text = "L" + getLevelFromExperiencePoints(this.characterObj.points.defense) + " " + this.characterObj.equipment.shield.realDefenseMin + "-" + this.characterObj.equipment.shield.realDefenseMax;
			}
		}
		else
		{
			this.gfxObjects["label_defense"].text = "-";
		}
		this.gfxObjects["action"].spriteName = "action_" + this.characterObj.action;
		
		if (this.characterObj.message != "")
		{
			this.gfxObjects["border_overlay"].hidden = false;
			this.gfxObjects["label_overlay"].hidden = false;
			this.gfxObjects["border_overlay"].name = "portrait_common_hit";
			this.gfxObjects["label_overlay"].text = this.characterObj.message;
		}
		else
		{
			this.gfxObjects["border_overlay"].hidden = true;
			this.gfxObjects["label_overlay"].hidden = true;
		}
	}
	
	checkClick(x, y)
	{
		let i;
		
		if (this.characterObj == null)
		{
			return;
		}
		
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
		
		if (this.characterObj == null)
		{
			return;
		}
		
//		if (_game.newClick)
		{
			this.update();
		}
		
		for (i in this.gfxObjects)
		{
			if (!this.gfxObjects[i].hidden)
			{
				this.gfxObjects[i].draw();
			}
		}
	}
}
