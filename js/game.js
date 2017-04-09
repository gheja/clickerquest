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
		this.doors = [];
		this.places = [];
		this.activePlace = null;
		this.phase = "none";
		this.newClick = false;
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
	
	setActivePlace(name)
	{
		let a;
		
		for (a of this.places)
		{
			if (a.name == name)
			{
				this.activePlace = a;
				return;
			}
		}
		
		console.log("Could not find place \"" + name + "\".");
	}
	
	startGame()
	{
		this.setActivePlace("home");
		this.setGamePhase("place");
		this.switchScreen('place');
		_gfx.setBackgroundColor("#bb7700");
	}
	
	addEnemy(className, level)
	{
		let tmp;
		
		tmp = new window[className](); // eh :)
		tmp.points.experience = getExperiencePointsFromLevel(level);
		
		this.enemyParty.push(tmp)
	}
	
	setGamePhase(phase)
	{
		this.gamePhase = phase;
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
		
		this._nextFrameTime = a + FRAME_TIME_MS;
		// --
		
		_profiler.start();
		this.tick();
		_profiler.mark();
		this.draw();
		_profiler.mark();
		_profiler.draw();
		
		this.newClick = false;
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
		this.newClick = true;
		
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
		objects["beatbar"] = new GfxBeatbar(0, 2, 108);
		objects["bar"] = new GfxBar(108, 4, 180, 8, 100, 0);
		objects["multiplier"] = new GfxMultiplier(109, 14);
		objects["multiplier"].max = 5;
		objects["multiplier"].value = 1;
	}
	
	onClickHtmlBody(event)
	{
		this.onClick({ clientX: -1, clientY: -1 });
	}
	
	onMouseMove(event)
	{
		this.screen.mouseMove(Math.round((event.clientX - _gfx.domLeft) / _gfx.zoom), Math.round((event.clientY - _gfx.domTop) / _gfx.zoom));
	}
	
	initMap()
	{
		let a;
		
		a = new ObjPlace("home", "Home", "cover_home", 100);
		a = new ObjPlace("forest", "Forest", "cover_forest", 500);
		a.enemyGroups.push(new EnemyGroup("enemy1", 1, 0.5));
		
		a = new ObjDoor("home", "forest", 0.5, true);
		
		for (a of this.places)
		{
			a.init();
		}
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
		
		this.initMap();
		
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
