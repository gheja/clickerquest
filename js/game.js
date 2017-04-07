"use strict";

class Game
{
	constructor()
	{
		this._nextFrame = 0;
		this.screens = {};
		this.screen = null;
		this.nextScreenName = '';
		this.ticks = 0;
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
		_soundManager.load(this.onSoundManagerLoaded.bind(this));
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
			_soundManager.start();
		}
		
		_beater.userBeat();
		this.screen.click(Math.round((event.clientX - _gfx.domLeft) / _gfx.zoom), Math.round((event.clientY - _gfx.domTop) / _gfx.zoom));
		
		if (event.preventDefault)
		{
			event.preventDefault();
		}
		
		if (event.stopPropagation)
		{
			event.stopPropagation();
		}
	}
	
	addHeaderObjects(objects)
	{
		objects["cover"] = new GfxImage("cover_splash", 0, 32);
		objects["logo"] = new GfxImage("logo", 94, 32);
	}
	
	addBeatObjects(objects)
	{
		objects["beatbar"] = new GfxBeatbar(8, 8);
		objects["bar"] = new GfxBar(108, 8, 172);
		objects["multiplier"] = new GfxMultiplier(108, 20);
		objects["multiplier"].max = 4;
	}
	
	onClickHtmlBody(event)
	{
		this.onClick({ clientX: -1, clientY: -1 });
	}
	
	onMouseMove(event)
	{
		this.screen.mouseMove(Math.round((event.clientX - _gfx.domLeft) / _gfx.zoom), Math.round((event.clientY - _gfx.domTop) / _gfx.zoom));
	}
	
	init()
	{
		let i;
		
		this.resetTime();
		
		_gfx = new Gfx();
		_gfx.init();
		_gfx.finalCanvas.addEventListener('mousedown', this.onClick.bind(this));
		_gfx.finalCanvas.addEventListener('mousemove', this.onMouseMove.bind(this));
		
		_body.addEventListener('mousedown', this.onClickHtmlBody.bind(this));
		
		_beater = new Beater();
		_beater.init();
		
		_soundManager = new SoundManager();
		
		this.screens['splash'] = new ScreenSplash();
		this.screens['calibration'] = new ScreenCalibration();
		this.screens['menu'] = new ScreenMenu();
		this.screens['place'] = new ScreenPlace();
		
		for (i in this.screens)
		{
			this.screens[i].init();
		}
		
		this.switchScreen('splash');
	}
}
