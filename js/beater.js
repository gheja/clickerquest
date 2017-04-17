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
		this.lastProcessedBeatNumber = 0;
		this.lastBeatStatus = "none";
		this.beatTolerance = 150;
		this.noEarlier = false;
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
// 		console.log("add," + t);
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
		var i, a, b, obj;
		
		a = 5000;
		
		obj = null;
		
		for (i=0; i<this.beats.length; i++)
		{
			b = t - this.beats[i];
			
			if (this.noEarlier)
			{
				if (b < 0)
				{
					continue;
				}
			}
			
			if (Math.abs(b) < Math.abs(a))
			{
				a = b;
				obj = { diff: b, time: this.beats[i], index: i };
			}
		}
		
		return obj;
	}
	
	getNearestBeatStatus()
	{
		let obj;
		
		obj = this.getNearestBeat(_game.getTime() - this.soundCorrection);
		
		if (obj == null)
		{
			return BEAT_STATUS_NONE;
		}
		
		if (this.lastProcessedBeatNumber >= obj.index)
		{
			return BEAT_STATUS_PROCESSED;
		}
		
		if (obj.diff < -this.beatTolerance)
		{
			return BEAT_STATUS_COMING;
		}
		
		if (obj.diff > this.beatTolerance)
		{
			return BEAT_STATUS_MISSED;
		}
		
		return BEAT_STATUS_ONGOING;
	}
	
	markNearestBeatProcessed()
	{
		let obj;
		
		obj = this.getNearestBeat(_game.getTime() - this.soundCorrection);
		
		if (obj == null)
		{
			return;
		}
		
		this.lastProcessedBeatNumber = obj.index;
	}
	
	userBeat()
	{
		let a, t;
		
		// t = _game.getTime() - this.soundCorrection;
		t = _game.getTime();
		
		// console.log("user," + t);
		
		a = this.getNearestBeat(t);
		
		if (a == null)
		{
			return;
		}
		
		// console.log("user beat: " + t + " (" + Math.round(Math.abs(a.diff)) + " ms " + (a.diff < 0 ? "earlier" : "later") + ")");
		
		if (Math.abs(a.diff) < 100)
		{
			this.beatStreak++;
		}
		else
		{
			this.beatStreak = 0;
		}
		
		if (a.diff == 5000)
		{
			return;
		}
		this.lastDifferences.push(a.diff);
		this.update();
	}
}
