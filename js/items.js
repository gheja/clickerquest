"use strict";

class Item
{
	constructor()
	{
		this.effectsUser = false;
		this.effectsTarget = false;
		this.effectsUserParty = false;
		this.effectsTargetParty = false;
		
		this.progressPoints = 0;
		
		this.baseDamageMin = 0;
		this.baseDamageMax = 0;
		this.baseDefenseMin = 0;
		this.baseDefenseMax = 0;
		this.baseHealMin = 0;
		this.baseHealMax = 0;
		
/*
		this.realDamageMin = 0;
		this.realDamageMax = 0;
		this.realDefenseMin = 0;
		this.realDefenseMax = 0;
		this.realHealMin = 0;
		this.realHealMax = 0;
*/
	}
	
	applyEvent(user, target, userPaty, targetParty, event, value)
	{
		let obj;
		
		if (this.effectsUser)
		{
			user[event](value);
		}
		
		if (this.effectsTarget)
		{
			target[event](value);
		}
		
		if (this.effectsUserParty)
		{
			for (obj of userParty)
			{
				obj[event](value);
			}
		}
		
		if (this.effectsTargetParty)
		{
			for (obj of targetParty)
			{
				obj[event](value);
			}
		}
	}
	
	reset()
	{
	}
	
	onEffect(item)
	{
	}
	
	onAttack(user, target, userPaty, targetParty)
	{
		let value;
		
		value = randomInt(this.baseDamageMin, this.baseDamageMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyAttack', value);
	}
	
	onDefend(user, target, userPaty, targetParty)
	{
		let value;
		
		value = randomInt(this.baseDefenseMin, this.baseDefenseMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyDefend', value);
	}
	
	onRest(user, target, userPaty, targetParty)
	{
		let value;
		
		value = randomInt(this.baseHealMin, this.baseHealMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyRest', value);
	}
}

class ItemRest extends Item
{
	constructor()
	{
		super();
		
		this.effectsUser = true;
		this.baseHealMin = 25;
		this.baseHealMax = 25;
	}
}

class ItemFirstSword extends Item
{
	constructor()
	{
		super();
		
		this.progressPoints = 3;
		
		this.weaponClass = WEAPON_CLASS_ONE_HANDED;
		this.effectsTarget = true;
		this.baseDamageMin = 3;
		this.baseDamageMax = 7;
	}
}

class ItemFirstShield extends Item
{
	constructor()
	{
		super();
		
		this.progressPoints = 3;
		
		this.effectsUser = true;
		this.baseDefenseMin = 3;
		this.baseDefenseMax = 7;
	}
}