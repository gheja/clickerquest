"use strict";

class Game
{
	constructor()
	{
		this._gfx = new Gfx();
		this.beater = new Beater();
		this._nextFrame = 0;
		this.screens = {};
		this.screen = null;
		this.nextScreenName = '';
		this.ticks = 0;
		this.soundManager = null;
		this.firstClick = true;
		this.startTime = 0;
	}
	
	resetTime()
	{
		this.startTime = Date.now();
	}
	
	getTime()
	{
		return Date.now() - this.startTime;
	}
	
	tick()
	{
		this.ticks++;
		this.screen.tick();
	}
	
	draw()
	{
		this.screen.draw();
	}
	
	startLevel()
	{
		this.switchScreen('place');
	}
	
	update()
	{
		_requestAnimationFrame(this.update.bind(this));
		
		// -- frame rate limit
		const a = Date.now();
		
		if (a + 5 < this._nextFrameTime)
		{
			return;
		}
		
		this._nextFrameTime = a + (1000 / FPS);
		// --
		
		_profiler.start();
		this.tick();
		_profiler.mark();
		this.draw();
		_profiler.mark();
		_profiler.draw();
	}
	
	start()
	{
		this.nextFrame = 0;
		this.update();
		this.soundManager.load(this.onSoundManagerLoaded.bind(this));
	}
	
	onSoundManagerLoaded()
	{
		this.screens['splash'].phase = 1;
	}
	
	switchScreen(name)
	{
		if (this.screen)
		{
			this.screen.leave();
		}
		
		this.screen = this.screens[name];
		
		this.screen.enter();
	}
	
	onClick(event)
	{
		if (this.firstClick)
		{
			this.firstClick = false;
			this.soundManager.start();
		}
		
		this.beater.userBeat();
		this.screen.click(Math.round((event.clientX - this._gfx.domLeft) / this._gfx.z), Math.round((event.clientY - this._gfx.domTop) / this._gfx.z));
	}
	
	onMouseMove(event)
	{
		this.screen.mouseMove(Math.round((event.clientX - this._gfx.domLeft) / this._gfx.z), Math.round((event.clientY - this._gfx.domTop) / this._gfx.z));
	}
	
	init()
	{
		let i;
		
		this.resetTime();
		this.beater.init();
		
		this._gfx.init();
		this._gfx.finalCanvas.addEventListener('mousedown', this.onClick.bind(this));
		this._gfx.finalCanvas.addEventListener('mousemove', this.onMouseMove.bind(this));
		
		this.soundManager = new SoundManager();
		
		this.screens['splash'] = new ScreenSplash(this._gfx);
		this.screens['splash'].beater = this.beater;
		this.screens['calibration'] = new ScreenCalibration(this._gfx);
		this.screens['calibration'].beater = this.beater;
		this.screens['menu'] = new ScreenMenu(this._gfx);
		this.screens['place'] = new ScreenPlace(this._gfx);
		
		for (i in this.screens)
		{
			this.screens[i].init();
		}
		
		// this.switchScreen('calibration');
		this.switchScreen('splash');
	}
}
