"use strict";

class ObjDoor
{
	constructor(place1Name, place2Name, unlockProgressMin, unlockGuaranteed)
	{
		this.place1Name = nvl(place1Name, "");
		this.place2Name = nvl(place2Name, "");
		this.unlockProgressMin = nvl(unlockProgressMin, 0);
		this.unlockGuaranteed = nvl(unlockGuaranteed, false);
		this.unlockChance = 0.01;
		this.unlocked = false;
		this.active = false;
		
		_game.doors.push(this);
	}
	
	unlock()
	{
		let i;
		
		this.unlocked = true;
		
		for (i in _game.places)
		{
			if (_game.places[i].name == this.place1Name || _game.places[i].name == this.place2Name)
			{
				_game.places[i].unlocked = true;
			}
		}
		
		_game.addStoryText("You have found a door that leads to an unvisited place.");
	}
}

class EnemyGroup
{
	constructor(className, level, chance)
	{
		this.className = nvl(className, "");
		this.level = nvl(level, 1);
		this.chance = nvl(chance, 1);
	}
	
	call()
	{
		_game.addEnemy(this.className, this.level);
		_game.startEncounter();
	}
	
	flee()
	{
		return true;
	}
}

class ObjPlace
{
	constructor(name, displayName, coverSpriteName, progressNeeded, mapX, mapY)
	{
		this.name = nvl(name, "");
		this.displayName = nvl(displayName, "Unnamed place");
		this.progressNeeded = nvl(progressNeeded, 0);
		this.coverSpriteName = nvl(coverSpriteName, "");
		this.progressValue = 0;
		this.doorUnlocks = [];
		this.enemyGroups = [];
		this.mapX = nvl(mapX, 0);
		this.mapY = nvl(mapY, 0);
		this.unlocked = false;
		this.active = false;
		this.background = "#006622";
		
		_game.places.push(this);
	}
	
	assignOwnDoors(doors)
	{
		let a;
		
		for (a of _game.doors)
		{
			if (a.place1Name == this.name || a.place2Name == this.name)
			{
				this.doorUnlocks.push(a);
			}
		}
	}
	
	explore()
	{
		let x, a;
		
		// encounter
		for (a of this.enemyGroups)
		{
			if (chance(a.chance))
			{
				a.call();
				
				// no more encounters or door unlocks should be done
				return;
			}
		}
		
		this.progressValue += 1;
		
		x = this.progressValue / this.progressNeeded;
		
		// check for guaranteed doors
		if (x >= 1)
		{
			for (a of this.doorUnlocks)
			{
				if (!a.unlocked && a.unlockGuaranteed)
				{
					a.unlock();
				}
			}
		}
		
		// check for door unlocks
		for (a of this.doorUnlocks)
		{
			if (!a.unlocked)
			{
				if (x >= a.unlockProgressMin)
				{
					if (chance(a.unlockChance))
					{
						a.unlock();
					}
				}
			}
		}
	}
	
	init()
	{
		this.assignOwnDoors();
	}
}
