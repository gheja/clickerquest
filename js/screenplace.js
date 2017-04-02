"use strict";

class ScreenPlace extends Screen2
{
	constructor(a)
	{
		super(a);
		
		this.a = 0;
	}
	
	init()
	{
		this.beatbar = new GfxBeatbar(this._gfx, 8, 8);
		this.bar = new GfxBar(this._gfx, 108, 8, 172);
		this.multiplier = new GfxMultiplier(this._gfx, 108, 20);
		
		this.multiplier.max = 68;
		
		this.bar2 = new GfxBar(this._gfx, 8, 20);
		this.switch1 = new GfxSwitch(this._gfx, 8, 112);
		this.switch2 = new GfxSwitch(this._gfx, 8, 124, true);
		this.switch3 = new GfxSwitch(this._gfx, 8, 136, true);
	}
	
	draw()
	{
		this.a++;
		
		_profiler.start();
		
		this._gfx.clear();
		
		this.bar.value += 1;
		
		this.beatbar.setBeats([ 8 - this.a % 8, 16 - this.a % 8, 24 - this.a % 8 ]);
		
		this.beatbar.status = "matched";
		
		this.beatbar.draw();
		this.bar.draw();
		this.bar2.draw();
		this.switch1.draw();
		this.switch2.draw();
		this.switch3.draw();
		this.multiplier.draw();
		
		_profiler.mark();
		
		_profiler.draw();
	}
}
