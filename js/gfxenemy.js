"use strict";

class GfxEnemy extends GfxBase
{
	constructor(n, characterObj)
	{
		super(0, 0, 96, 40);
		
		this.characterObj = characterObj;
		
		this.gfxObjects = {};
		this.gfxObjects["background"] = new GfxImage("portrait_enemy_background");
		this.gfxObjects["portrait"] = new GfxImage("portrait_hero1");
		this.gfxObjects["border"] = new GfxImage("portrait_enemy_border");
		this.gfxObjects["icon_health"] = new GfxImage("icon_health");
		this.gfxObjects["bar_health"] = new GfxBar(0, 0, 51, 3, 0, 0, 2);
		this.gfxObjects["label_health"] = new GfxLabel(0, 0, 'left', '1-2');
		this.gfxObjects["label_name_line1"] = new GfxLabel(0, 0, 'left', 'Enemy name');
		this.gfxObjects["label_name_line2"] = new GfxLabel(0, 0, 'left', 'goes here');
		this.gfxObjects["label_level"] = new GfxLabel(0, 0, 'left', 'Level 11');
		this.gfxObjects["label_threat"] = new GfxLabel(0, 0, 'right', 'T000');
		
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
		
		this.gfxObjects["background"].x = this.x - 65;
		this.gfxObjects["background"].y = this.y - 2;
		this.gfxObjects["portrait"].x = this.x;
		this.gfxObjects["portrait"].y = this.y;
		this.gfxObjects["border"].x = this.x;
		this.gfxObjects["border"].y = this.y;
		this.gfxObjects["label_name_line1"].x = this.x - 63;
		this.gfxObjects["label_name_line1"].y = this.y + 5;
		this.gfxObjects["label_name_line2"].x = this.x - 63;
		this.gfxObjects["label_name_line2"].y = this.y + 12;
		this.gfxObjects["label_level"].x = this.x - 63;
		this.gfxObjects["label_level"].y = this.y + 19;
		this.gfxObjects["label_threat"].x = this.x - 3;
		this.gfxObjects["label_threat"].y = this.y + 19;
		this.gfxObjects["icon_health"].x = this.x - 63;
		this.gfxObjects["icon_health"].y = this.y + 21;
		this.gfxObjects["bar_health"].x = this.x - 53;
		this.gfxObjects["bar_health"].y = this.y + 27;
		this.gfxObjects["label_health"].x = this.x - 53;
		this.gfxObjects["label_health"].y = this.y + 26;
		
		this.gfxObjects["border_overlay"].x = this.x;
		this.gfxObjects["border_overlay"].y = this.y;
		this.gfxObjects["label_overlay"].x = this.x + 15;
		this.gfxObjects["label_overlay"].y = this.y + 11;
	}
	
	moveToSlot(n)
	{
		let x, y;
		
		x = 255 - Math.floor(n / 3) * 97;
		y = 99 - (n % 3) * 34;
		
		this.move(x, y);
	}
	
	update()
	{
		let tmp;
		
		if (this.characterObj.dead)
		{
			this.gfxObjects["border"].name = "portrait_enemy_border_dead";
		}
		else
		{
			this.gfxObjects["border"].name = "portrait_enemy_border";
		}
		
		this.gfxObjects["portrait"].name = this.characterObj.spriteName;
		
		this.gfxObjects["label_name"].text = this.characterObj.name;
		this.gfxObjects["label_level"].text = "Level " + getLevelFromExperiencePoints(this.characterObj.points.experience);
		this.gfxObjects["label_threat"].text = "T" + this.characterObj.threat;
		
		this.gfxObjects["bar_health"].value = this.characterObj.healthValue;
		this.gfxObjects["bar_health"].max = this.characterObj.healthMax;
		
		// TODO: which is better?
		//   this.gfxObjects["label_health"].text = this.characterObj.healthValue + "/" + this.characterObj.healthMax;
		this.gfxObjects["label_health"].text = this.characterObj.healthValue;
		
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
		
		if (this.characterObj == null)
		{
			return;
		}
		
		if (_game.newClick)
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
