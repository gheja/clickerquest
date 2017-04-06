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
		this.beatStreak = 0;
		this.lastBeatStatus = "none";
	}
	
	reset()
	{
		this.beats.length = 0;
		this.lastDifferences.length = 0;
		this.differenceAverage = 1000;
		this.differenceDeviation = 1000;
		this.isStable = false;
		this.beatStreak = 0;
		this.lastBeatStatus = "none";
	}
	
	resetCorrections()
	{
		this.soundCorrection = 0;
		this.gfxCorrection = 0;
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
		
//		console.log("Last difference: " + this.lastDifferences[this.lastDifferences.length - 1] + ", average: " + this.differenceAverage + ", deviation: " + this.differenceDeviation + ", stable: " + (this.isStable ? "yes" : "no"));
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
		this.soundCorrection = Number.parseFloat(storageGet('beater.soundCorrection', 0));
		this.gfxCorrection = Number.parseFloat(storageGet('beater.gfxCorrection', 0));
		this.isCalibrated = storageGet('beater.isCalibrated', "false") == "true";
	}
	
	init()
	{
		this.load();
	}
	
	addBeat(t)
	{
//		console.log("add beat: " + t);
		this.beats.push(t);
	}
	
	celanup()
	{
		// TODO: test
		
		let i, t;
		
		t = _game.getTime() - 1000;
		
		for (i=this.beats.length - 1; i>= 0; i--)
		{
			if (this.beats[i] < t)
			{
				delete(this.beats[i]);
			}
		}
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
		let a, t;
		
		t = _game.getTime() - this.soundCorrection;
		
		a = this.getNearestBeat(t);
		console.log("user beat: " + t + " (" + Math.abs(a) + " " + (a < 0 ? "earlier" : "later") + ")");
		
		if (Math.abs(a) < 100)
		{
			this.beatStreak++;
			this.lastBeatStatus = "matched";
			console.log("* match *");
		}
		else
		{
			this.beatStreak = 0;
			this.lastBeatStatus = "matched";
		}
		
		if (a == 5000)
		{
			return;
		}
		this.lastDifferences.push(a);
		this.update();
	}
}
