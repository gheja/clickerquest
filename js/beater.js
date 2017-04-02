"use strict";

class Beater
{
	constructor()
	{
		this.beats = [];
		
		this.lastDifferences = [];
		this.stableCount = 4;
		this.differenceAverage = 1000;
		this.differenceDeviation = 1000;
		this.soundCorrection = 0;
		this.gfxCorrection = 0;
		this.isStable = false;
		this.isCalibrated = false;
	}
	
	reset()
	{
		this.beats.length = 0;
		this.lastDifferences.length = 0;
		this.differenceAverage = 1000;
		this.differenceDeviation = 1000;
		this.isStable = false;
	}
	
	update()
	{
		let i, a, b, min, max;
		
		if (this.lastDifferences.length < this.stableCount)
		{
			return;
		}
		
		min = this.lastDifferences.length - this.stableCount;
		max = this.lastDifferences.length;;
		
		a = 0;
		
		for (i=min; i<max; i++)
		{
			a += this.lastDifferences[i];
		}
		
		a = a / this.stableCount;
		
		this.differenceAverage = a;
		
		b = 0;
		
		for (i=min; i<max; i++)
		{
			b = Math.max(b, Math.abs(this.lastDifferences[i] - a));
		}
		
		this.differenceDeviation = b;
		
		if (this.differenceDeviation < 100)
		{
			this.isStable = true;
		}
		else
		{
			this.isStable = false;
		}
		
		console.log("Last difference: " + this.lastDifferences[this.lastDifferences.length - 1] + ", average: " + this.differenceAverage + ", deviation: " + this.differenceDeviation + ", stable: " + (this.isStable ? "yes" : "no"));
	}
	
	saveSoundCorrection()
	{
		this.soundCorrection = this.differenceAverage;
	}
	
	saveGfxCorrection()
	{
		this.gfxCorrection = this.differenceAverage;
	}
	
	save()
	{
		storageSet('beater.soundCorrection', this.soundCorrection);
		storageSet('beater.gfxCorrection', this.gfxCorrection);
		storageSet('beater.isCalibrated', true);
	}
	
	load()
	{
		this.soundCorrection = storageGet('beater.soundCorrection', 0);
		this.gfxCorrection = storageGet('beater.gfxCorrection', 0);
		this.isCalibrated = storageGet('beater.isCalibrated', false);
	}
	
	init()
	{
		this.load();
	}
	
	addBeat(t)
	{
		this.beats.push(t);
	}
	
	getNearestBeat(t)
	{
		var i, a, b;
		
		a = 5000;
		
		for (i=0; i<this.beats.length; i++)
		{
			b = t - this.beats[i];
			
			if (Math.abs(b) < Math.abs(a))
			{
				a = b;
			}
		}
		
		return a;
	}
	
	userBeat()
	{
		let a;
		
		a = this.getNearestBeat(Date.now());
		console.log(a);
		if (a == 5000)
		{
			return;
		}
		this.lastDifferences.push(a);
		this.update();
	}
}
