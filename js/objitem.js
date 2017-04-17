"use strict";

class ObjItem
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
		
		this.realDamageMin = 0;
		this.realDamageMax = 0;
		this.realDefenseMin = 0;
		this.realDefenseMax = 0;
		this.realHealMin = 0;
		this.realHealMax = 0;
	}
	
	applyEvent(user, target, userPaty, targetParty, event, value)
	{
		let obj;
		
		if (this.effectsUser && !user.dead && !user.fled)
		{
			user[event](value);
		}
		
		if (this.effectsTarget && target != null && !target.dead && !target.fled)
		{
			target[event](value);
		}
		
		if (this.effectsUserParty)
		{
			for (obj of userParty)
			{
				if (!obj.dead && !obj.fled)
				{
					obj[event](value);
				}
			}
		}
		
		if (this.effectsTargetParty)
		{
			for (obj of targetParty)
			{
				if (!obj.dead && !obj.fled)
				{
					obj[event](value);
				}
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
		
		value = randomInt(this.realDamageMin, this.realDamageMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyAttack', value);
	}
	
	onDefend(user, target, userPaty, targetParty)
	{
		let value;
		
		value = randomInt(this.realDefenseMin, this.realDefenseMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyDefend', value);
	}
	
	onRest(user, target, userPaty, targetParty)
	{
		let value;
		
		value = randomInt(this.realHealMin, this.realHealMax);
		
		this.applyEvent(user, target, userPaty, targetParty, 'applyRest', value);
	}
	
	update(user)
	{
		let arr, a, m;
		
		
		arr = [ 'DamageMin', 'DamageMax', 'DefenseMin', 'DefenseMax', 'HealMin', 'HealMax' ];
		
		// base values
		for (a of arr)
		{
			this["real" + a] = this["base" + a];
		}
		
		this.realDamageMin += this.realDamageMin * 0.5 * (getLevelFromExperiencePoints(user.points.attackSword) - 1);
		this.realDamageMax += this.realDamageMax * 0.5 * (getLevelFromExperiencePoints(user.points.attackSword) - 1);
		this.realDamageMin += this.realDamageMin * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		this.realDamageMax += this.realDamageMax * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		
		this.realDefenseMin += this.realDefenseMin * 0.5 * (getLevelFromExperiencePoints(user.points.defense) - 1);
		this.realDefenseMax += this.realDefenseMax * 0.5 * (getLevelFromExperiencePoints(user.points.defense) - 1);
		this.realDefenseMin += this.realDefenseMin * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		this.realDefenseMax += this.realDefenseMax * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		
		this.realHealMin += this.realHealMin * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		this.realHealMax += this.realHealMax * 0.5 * (getLevelFromExperiencePoints(user.points.experience) - 1);
		
		if (!user.isEnemy)
		{
			// multiplier and rounding
			m = _multiplier.getRealMultiplier();
			
			for (a of arr)
			{
				this["real" + a] *= m;
				
				this["real" + a] = Math.round(this["real" + a]);
			}
		}
	}
}

class ObjItemRest extends ObjItem
{
	constructor()
	{
		super();
		
		this.effectsUser = true;
		this.baseHealMin = 25;
		this.baseHealMax = 25;
	}
}

class ObjItemWeapon extends ObjItem
{
	constructor()
	{
		super();
		
		this.itemClass = ITEM_CLASS_WEAPON;
		this.effectsTarget = true;
	}
}

class ObjItemShield extends ObjItem
{
	constructor()
	{
		super();
		
		this.itemClass = ITEM_CLASS_SHIELD;
		this.effectsUser = true;
	}
}

class ObjItemFirstSword extends ObjItemWeapon
{
	constructor(n)
	{
		super();
		
		this.progressPoints = 3;
		
		this.weaponClass = WEAPON_CLASS_SWORD;
		this.baseDamageMin = nvl(n, 4); // TODO: clone does not apply parameters
		this.baseDamageMax = Math.round(this.baseDamageMin * 1.7);
	}
}

class ObjItemFirstShield extends ObjItemShield
{
	constructor(n)
	{
		super();
		
		this.progressPoints = 3;
		
		this.baseDefenseMin = n;
		this.baseDefenseMax = n;
	}
}
