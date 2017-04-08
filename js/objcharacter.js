"use strict";

function getExperiencePointsFromLevel(level)
{
	return CHARACTER_LEVELS[level - 1];
}

function getLevelFromExperiencePoints(points)
{
	let i;
	
	for (i=0; i<CHARACTER_LEVELS.length; i++)
	{
		if (CHARACTER_LEVELS[i] > points)
		{
			break;
		}
	}
	
	return i;
}

function getLevelValue(points)
{
	let level;
	
	level = getLevelFromExperiencePoints(points)
	
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
		this.validActions = [ 'attack', 'defend', 'rest' ];
		this.action = 'attack';
		this.dead = false;
		
		this.points = {
			experience: 0,
			attackOneHanded: 0,
			attackTwoHanded: 0,
			defense: 0
		};
		this.healthValue = 100;
		this.healthMax = 0;
		
		this.turnHitValue = 0;
		this.turnDefenseValue = 0;
		this.turnHealValue = 0;
		
		this.equipment = {
			rest: new ItemRest(),
			weapon: null,
			helmet: null,
			armor: null,
			shield: null,
			ring1: null,
			ring2: null,
			ring3: null
		};
		
		this.target = null;
		this.ownParty = [];
		this.targetParty = [];
		this.message = "";
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
	
	turnPrepare()
	{
		this.message = "";
		
		this.turnHitValue = 0;
		this.turnDefenseValue = 0;
		this.turnHealValue = 0;
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
	}
	
	turnFinish()
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
			if (this.equipment.weapon.weaponClass == WEAPON_CLASS_ONE_HANDED)
			{
				this.points.attackOneHanded += this.equipment.weapon.progressPoints;
			}
			else
			{
				this.points.attackTwoHanded += this.equipment.weapon.progressPoints;
			}
		}
		
		if (this.equipment.shield && this.action == 'defend')
		{
			this.points.defense += this.equipment.shield.progressPoints;
		}
		
		if (this.healthValue == 0)
		{
			this.dead = true;
			this.action = 'invalid';
			this.message = "";
		}
		
		
		// level up?
		// this.points. ... += ...
		// this.level = getLevelFromExperiencePoints(this.experiencePoints);
		console.log(this);
	}
}
