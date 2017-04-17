"use strict";

class Multiplier
{
	constructor()
	{
		this.points = 0;
		this.pointsPerLevel = 8;
		this.pointsPlus = 1;
		this.pointsMinus = this.pointsPerLevel / 2;
		
		this.levelMin = 0;
		this.levelMax = 30;
		this.levelValue = 0;
	}
	
	update()
	{
		this.levelValue = this.levelMin + Math.floor(this.points / this.pointsPerLevel);
		this.levelValue = clip(this.levelValue, this.levelMin, this.levelMax);
	}
	
	increase()
	{
		this.points += this.pointsPlus;
		this.update();
	}
	
	decrease()
	{
		let a, b;
		
		a = Math.floor(this.points / this.pointsPerLevel);
		b = this.points % this.pointsPerLevel;
		
		if (b == 0)
		{
			a = a - 1;
		}
		else
		{
			b = 0;
		}
		
		this.points = Math.max(a * this.pointsPerLevel + b, 0);
		this.update();
	}
	
	getRealMultiplier(x)
	{
		let a, b, c;
		
		a = Math.floor(this.levelValue / 10);
		b = this.levelValue % 10;
		
		return Math.pow(2, a) + (Math.pow(2, a) / 10) * b;
	}
	
	getPartialPoint()
	{
		return this.points % this.pointsPerLevel;
	}
}
