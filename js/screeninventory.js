"use strict";

class ScreenInventory extends Screen2
{
	constructor()
	{
		super();
		
		this.drawBeats = true;
		this.currentCharacterIndex = -1;
		this.currentCharacter = null;
	}
	
	clickPrev()
	{
		let i;
		
		i = this.currentCharacterIndex;
		
		while (1)
		{
			i--;
			
			i = (i + 6) % 6;
			
			if (_game.heroParty[i] != null)
			{
				break;
			}
		}
		
		this.currentCharacterIndex = i;
		this.currentCharacter = _game.heroParty[this.currentCharacterIndex];
	}
	
	clickNext()
	{
		let i;
		
		i = this.currentCharacterIndex;
		
		while (1)
		{
			i++;
			
			i = (i + 6) % 6;
			
			if (_game.heroParty[i] != null)
			{
				break;
			}
		}
		
		this.currentCharacterIndex = i;
		this.currentCharacter = _game.heroParty[this.currentCharacterIndex];
	}
	
	clickBack()
	{
		_game.switchScreen("place");
	}
	
	enter()
	{
		this.currentCharacterIndex = -1;
		this.clickNext();
	}
	
	init()
	{
		this.objects["button_prev"] = new GfxButton(208, 243, 16, "<", this.clickPrev.bind(this));
		this.objects["button_next"] = new GfxButton(228, 243, 16, ">", this.clickNext.bind(this));
		this.objects["button_back"] = new GfxButton(248, 243, 40, "Back", this.clickBack.bind(this));
		
		this.objects["portrait"] = new GfxImage("portrait_hero1", 0, 41);
		this.objects["border"] = new GfxImage("portrait_hero_border", 0, 41);
		this.objects["label_level"] = new GfxLabel(45, 48, 'left', 'Level 1');
		this.objects["label_threat"] = new GfxLabel(146, 48, 'right', 'Threat 0000');
		this.objects["label_threat"].tooltip = "How severe threat this character is to enemies.\nThey will always attack the character with highest threat level first.";
		
		this.objects["icon_xp"] = new GfxImage("icon_xp", 34, 63);
		this.objects["label_xp"] = new GfxLabel(45, 58, 'left', 'Experience points');
		this.objects["label2_xp"] = new GfxLabel(45, 66, 'left', '0 / 150');
		this.objects["bar_xp"] = new GfxBar(45, 68, 101, 4, 50, 3, 2);
		
		this.objects["icon_attack1"] = new GfxImage("icon_attack", 34, 63 + 24);
		this.objects["label_attack1"] = new GfxLabel(45, 58 + 24, 'left', 'Skill: sword (level 1)');
		this.objects["label2_attack1"] = new GfxLabel(45, 66 + 24, 'left', '0 / 150');
		this.objects["bar_attack1"] = new GfxBar(45, 68 + 24, 101, 4, 50, 0, 2);
		
		this.objects["icon_attack2"] = new GfxImage("icon_attack2", 34, 63 + 24 * 2);
		this.objects["label_attack2"] = new GfxLabel(45, 58 + 24 * 2, 'left', 'Skill: axe (level 1)');
		this.objects["label2_attack2"] = new GfxLabel(45, 66 + 24 * 2, 'left', '0 / 150');
		this.objects["bar_attack2"] = new GfxBar(45, 68 + 24 * 2, 101, 4, 50, 0, 2);
		
		this.objects["icon_defense"] = new GfxImage("icon_defense", 34, 63 + 24 * 3);
		this.objects["label_defense"] = new GfxLabel(45, 58 + 24 * 3, 'left', 'Skill: defense (level 1)');
		this.objects["label2_defense"] = new GfxLabel(45, 66 + 24 * 3, 'left', '0 / 150');
		this.objects["bar_defense"] = new GfxBar(45, 68 + 24 * 3, 101, 4, 50, 27, 2);
		
		this.objects["icon_special"] = new GfxImage("icon_xp", 34, 63 + 24 * 4);
		this.objects["label_special"] = new GfxLabel(45, 58 + 24 * 4, 'left', 'Special: n/a');
		this.objects["label2_special"] = new GfxLabel(45, 66 + 24 * 4, 'left', 'n/a');
		this.objects["bar_special"] = new GfxBar(45, 68 + 24 * 4, 101, 4, 50, 0, 2);
		
		this.objects["label_attack"] = new GfxLabel(160, 58, "left", "Weapon...");
		this.objects["label_shield"] = new GfxLabel(160, 114, "left", "Defense...");
//		this.objects["label_shield"] = new GfxLabel(150, 156, "left", "Defense...");
	}
	
	tick()
	{
		this.tickCommonObjects();
		
		if (_game.newClick)
		{
			this.objects["portrait"].name = this.currentCharacter.spriteName;
			
			this.objects["label_level"].text = "Level " + getLevelFromExperiencePoints(this.currentCharacter.points.experience);
			this.objects["label_threat"].text = "Threat " + this.currentCharacter.threat;
			this.objects["label2_xp"].text = this.currentCharacter.points.experience + " / " + getLevelMax(this.currentCharacter.points.experience);
			this.objects["bar_xp"].value = getLevelValue(this.currentCharacter.points.experience);
			this.objects["bar_xp"].max = getLevelMax(this.currentCharacter.points.experience);
			
			this.objects["label_attack1"].text = "Skill: sword (level " + getLevelFromExperiencePoints(this.currentCharacter.points.attackSword) + ")";
			this.objects["label2_attack1"].text = this.currentCharacter.points.attackSword + " / " + getLevelMax(this.currentCharacter.points.attackSword);
			this.objects["bar_attack1"].value = getLevelValue(this.currentCharacter.points.attackSword);
			this.objects["bar_attack1"].max = getLevelMax(this.currentCharacter.points.attackSword);
			
			this.objects["label_defense"].text = "Skill: defense (level " + getLevelFromExperiencePoints(this.currentCharacter.points.defense) + ")";
			this.objects["label2_defense"].text = this.currentCharacter.points.defense + " / " + getLevelMax(this.currentCharacter.points.defense);
			this.objects["bar_defense"].value = getLevelValue(this.currentCharacter.points.defense);
			this.objects["bar_defense"].max = getLevelMax(this.currentCharacter.points.defense);
			
			if (this.currentCharacter.equipment.weapon)
			{
				this.objects["label_attack"].text =
					"Weapon: sword\n" +
					"  total damage: " + this.currentCharacter.equipment.weapon.realDamageMin + " - "+ this.currentCharacter.equipment.weapon.realDamageMax + "\n" +
					"    base: " + this.currentCharacter.equipment.weapon.baseDamageMin + " - "+ this.currentCharacter.equipment.weapon.baseDamageMax + "\n" +
					"    level bonus: " + ((getLevelFromExperiencePoints(this.currentCharacter.points.experience) - 1) * 50) + "%\n" +
					"    skill bonus: " + ((getLevelFromExperiencePoints(this.currentCharacter.points.attackSword) - 1) * 50) + "%\n" +
					"    multiplier: x" + roundAndString(_multiplier.getRealMultiplier()) + "\n";
			}
			else
			{
				this.objects["label_attack"].text = "Weapon: none";
			}
			
			if (this.currentCharacter.equipment.shield)
			{
				this.objects["label_shield"].text =
					"Armor: none\n" +
					"\n"+
					"Helmet: none\n" +
					"\n"+
					"Shield: normal shield\n" +
					"  total defense: " + this.currentCharacter.equipment.shield.realDefenseMin + " - "+ this.currentCharacter.equipment.shield.realDefenseMax + "\n" +
					"    base: " + this.currentCharacter.equipment.shield.baseDefenseMin + " - "+ this.currentCharacter.equipment.shield.baseDefenseMax + "\n" +
					"    level bonus: " + ((getLevelFromExperiencePoints(this.currentCharacter.points.experience) - 1) * 50) + "%\n" +
					"    skill bonus: " + ((getLevelFromExperiencePoints(this.currentCharacter.points.defense) - 1) * 50) + "%\n" +
					"    multiplier: x" + roundAndString(_multiplier.getRealMultiplier()) + "\n";
			}
			else
			{
				this.objects["label_shield"].text = "Shield: none";
			}
		}
	}
}
