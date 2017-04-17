"use strict";

function getExperiencePointsFromLevel(level)
{
	level = level - 1;
	
	if (level == 0)
	{
		return 0;
	}
	
	return 150 * Math.pow(2, level - 1);
}

function getLevelFromExperiencePoints(points)
{
	let i;
	
	i = 0;
	
	while (1)
	{
		if (150 * Math.pow(2, i) > points)
		{
			break;
		}
		
		i++;
	}
	
	return i + 1;
}

function getLevelValue(points)
{
	let level;
	
	level = getLevelFromExperiencePoints(points);
	
	return points - getExperiencePointsFromLevel(level);
}

function getLevelMax(points)
{
	let level;
	
	level = getLevelFromExperiencePoints(points);
	
	return getExperiencePointsFromLevel(level + 1);
}

function CharacterSkill()
{
	return { level: 0, points: 0 };
}

function CharacterGauge(a, b)
{
	return { value: a, max: b };
}

function CharacterMinMax(a, b)
{
	return { min: a, max: b };
}

class ObjCharacter
{
	constructor()
	{
		this.validActions = [ 'attack', 'defend', 'rest', 'flee' ];
		this.action = 'attack';
		this.actionSaved = 'invalid';
		this.dead = false;
		this.nameLine1 = "";
		this.nameLine2 = "";
		this.spriteName = "portrait_hero1";
		
		this.points = {
			experience: 0,
			attackSword: 0,
			attackOthers: 0,
			defense: 0,
			special: 0
		};
		// TODO: cache levels to prevent multiple use of getLevelFromExperiencePoints()?
		this.healthValue = 100;
		this.healthMax = 0;
		
		this.turnHitValue = 0;
		this.turnDefenseValue = 0;
		this.turnHealValue = 0;
		
		this.items = [];
		this.equipment = {
			rest: new ObjItemRest(),
			weapon: null,
			helmet: null,
			armor: null,
			shield: null,
			ring1: null,
			ring2: null,
			ring3: null
		};
		
		this.isEnemy = false;
		this.target = null;
		this.ownParty = [];
		this.targetParty = [];
		this.message = "";
		this.fled = false;
		this.experiencePointsForKill = 0;
		this.threat = 0;
		this.threatForTurn = 0;
		this.originPlace = null;
		
		this.shuffleNameAndPortrait();
		this.turnFinish();
	}
	
	shuffleNameAndPortrait()
	{
		this.spriteName = "portrait_guy" + randomInt(1, 8);
	}
	
	cycleAction()
	{
		let i;
		
		for (i=0; i<this.validActions.length; i++)
		{
			if (this.action == this.validActions[i])
			{
				this.action = this.validActions[(i + 1) % this.validActions.length];
				break;
			}
		}
	}
	
	equipBestItems()
	{
		let a;
		// TODO: now it equips the first
		
		for (a of this.items)
		{
			if (a.itemClass == ITEM_CLASS_WEAPON && !this.equipment["weapon"])
			{
				this.equipment["weapon"] = a;
			}
			else if (a.itemClass == ITEM_CLASS_SHIELD && !this.equipment["shield"])
			{
				this.equipment["shield"] = a;
			}
		}
	}
	
	findTarget()
	{
		let a, maxThreat;
		
		this.target = null;
		
		maxThreat = 0;
		
		// find the first available target
		for (a of this.targetParty)
		{
			if (!a.dead && !a.fled)
			{
				maxThreat = Math.max(maxThreat, a.threatForTurn);
			}
		}
		
		for (a of this.targetParty)
		{
			if (!a.dead && !a.fled && a.threatForTurn == maxThreat)
			{
				this.target = a;
				a.threatForTurn -= 10;
				break;
			}
		}
	}
	
	equipmentApplyEvent(event)
	{
		let i;
		
		for (i in this.equipment)
		{
			if (this.equipment[i])
			{
				this.equipment[i][event](this, this.target, this.ownParty, this.targetParty);
			}
		}
	}
	
	equipmentUpdate()
	{
		let i;
		
		for (i in this.equipment)
		{
			if (this.equipment[i] != null)
			{
				this.equipment[i].update(this);
			}
		}
	}
	
	doAttack()
	{
		this.equipmentApplyEvent('onAttack');
	}
	
	doDefend()
	{
		this.equipmentApplyEvent('onDefend');
	}
	
	doRest()
	{
		this.equipmentApplyEvent('onRest');
	}
	
	doFlee()
	{
		this.fled = true;
		this.action = "invalid";
	}
	
	doHeal()
	{
	}
	
	applyAttack(value)
	{
		this.turnHitValue += value;
	}
	
	applyDefend(value)
	{
		this.turnDefenseValue += value;
	}
	
	applyRest(value)
	{
		this.turnHealValue += value;
	}
	
	clearMessage()
	{
		this.message = "";
	}
	
	applyTurnStuffs()
	{
		let tmp;
		
		this.level = getLevelFromExperiencePoints(this.points.experience);
		
		tmp = this.healthValue;
		
		this.healthMax = this.level * 100;
		this.healthValue = clip(this.healthValue + this.turnHealValue - Math.max(this.turnHitValue - this.turnDefenseValue, 0), 0, this.healthMax);
		
		tmp = this.healthValue - tmp;
		if (tmp != 0)
		{
			this.message = (tmp > 0 ? "+" : "-") + Math.abs(tmp);
		}
		
		if (this.equipment.weapon && this.action == 'attack')
		{
			if (this.equipment.weapon.weaponClass == WEAPON_CLASS_SWORD)
			{
				this.points.attackSword += this.equipment.weapon.progressPoints;
			}
			else
			{
				this.points.attackOthers += this.equipment.weapon.progressPoints;
			}
		}
		
		if (this.equipment.shield && this.action == 'defend')
		{
			this.points.defense += this.equipment.shield.progressPoints;
		}
		
		if (this.healthValue == 0)
		{
			if (this.isEnemy)
			{
				this.experiencePointsForKill = Math.floor(this.threat * 2) * _multiplier.getRealMultiplier();
				_game.gainExperiencePoints(this.experiencePointsForKill);
			}
			this.dead = true;
			this.action = 'invalid';
			this.message = "";
		}
	}
	
	turnPrepare()
	{
		this.message = "";
		
		this.turnHitValue = 0;
		this.turnDefenseValue = 0;
		this.turnHealValue = 0;
		
		if (this.isEnemy)
		{
			this.ownParty = _game.enemyParty;
			this.targetParty = _game.heroParty;
		}
		else
		{
			this.ownParty = _game.heroParty;
			this.targetParty = _game.enemyParty;
		}
		
		this.findTarget();
	}
	
	turnAction()
	{
		if (this.action == 'attack')
		{
			this.doAttack();
		}
		else if (this.action == 'defend')
		{
			this.doDefend();
		}
		else if (this.action == 'rest')
		{
			this.doRest();
		}
		else if (this.action == 'flee')
		{
			this.doFlee();
		}
		else if (this.action == 'heal')
		{
			this.doHeal();
		}
	}
	
	update()
	{
		let a, b;
		
		this.equipmentUpdate();
		
		this.threat = 0;
		
		this.threat += Math.floor(this.healthMax / 10);
		
		if (this.equipment['weapon'])
		{
			this.threat += Math.floor(this.equipment['weapon'].baseDamageMax / 5);
		}
		this.threat += Math.floor(getLevelFromExperiencePoints(this.points.attackSword));
		
		this.threatForTurn = this.threat;
	}
	
	saveAction()
	{
		this.actionSaved = this.action;
	}
	
	restoreAction()
	{
		this.action = this.actionSaved;
	}
	
	reinitStuffs()
	{
		this.turnPrepare();
		this.applyTurnStuffs();
		this.healthValue = this.healthMax;
		this.clearMessage();
	}
	
	turnFinish()
	{
		this.applyTurnStuffs();
		this.update();
		
		// level up?
		// this.points. ... += ...
		// this.level = getLevelFromExperiencePoints(this.experiencePoints);
		// console.log(this);
	}
}
