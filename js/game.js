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
		this.gamePhase = "none";
		this.newClick = false;
		this.storyTexts = [];
		this.heroParty = [];
		this.enemyParty = [];
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
		this.updateGamePhase();
		this.screen.tick();
	}
	
	draw()
	{
		this.screen.draw();
	}
	
	clearEnemyParty()
	{
		this.enemyParty.length = 0;
		this.updateParties();
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
		this.switchScreen('place');
	}
	
	updateGamePhase(forced)
	{
		let tmp, enemiesAlive;
		
		forced = nvl(forced, false);
		
		if (this.enemyParty.length > 0)
		{
			enemiesAlive = false;
			
			for (tmp of this.enemyParty)
			{
				if (!tmp.dead)
				{
					enemiesAlive = true;
					break;
				}
			}
			
			if (enemiesAlive)
			{
				this.setGamePhase("encounter", forced);
			}
			else
			{
				this.setGamePhase("encounter-done", forced);
			}
		}
		else
		{
			this.setGamePhase("normal", forced);
		}
	}
	
	startTurn()
	{
		let a;
		
		for (a of this.heroParty)
		{
			a.turnPrepare();
		}
		for (a of this.enemyParty)
		{
			a.turnPrepare();
		}
		
		for (a of this.heroParty)
		{
			a.turnAction();
		}
		for (a of this.enemyParty)
		{
			a.turnAction();
		}
		
		for (a of this.heroParty)
		{
			a.turnFinish();
		}
		for (a of this.enemyParty)
		{
			a.turnFinish();
		}
	}
	
	updateParties()
	{
		let tmp;
		
		for (tmp of this.heroParty)
		{
			tmp.clearMessage();
		}
		
		for (tmp of this.enemyParty)
		{
			tmp.clearMessage();
		}
		
		this.screens["place"].updatePartyGfx();
	}
	
	createCharacter(className, level, items)
	{
		let character, tmp;
		
		character = new className.constructor();
		character.points.experience = getExperiencePointsFromLevel(level);
		for (tmp of items)
		{
			character.items.push(new tmp.constructor());
		}
		
		character.equipBestItems();
		
		return character;
	}
	
	addEnemy(className, level, items)
	{
		let tmp;
		
		tmp = this.createCharacter(className, level, items);
		tmp.isEnemy = true;
		
		this.enemyParty.push(tmp);
		this.updateParties();
	}
	
	addStoryText(text)
	{
		this.storyTexts.push(text);
	}
	
	setGamePhase(phase, forced)
	{
		if (this.gamePhase == phase && !nvl(forced, false))
		{
			return;
		}
		
		this.gamePhase = phase;
		
		switch (this.gamePhase)
		{
			case "place":
			break;
			
			case "encounter":
			break;
		}
		
		this.screens['place'].updateGamePhase();
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
		
		a = new ObjPlace("home", "Home", "cover_home", 100, 32, 33);
		a.unlocked = true;
		
		a = new ObjPlace("forest", "Forest", "cover_forest", 500, 99, 28);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 1, [ new ObjItemFirstSword() ], 0.05));
		
		a = new ObjDoor("home", "forest", 0.5, true);
		a.unlockChance = 0.1;
		a.unlock();
		
		a = new ObjCharacter();
		a.items.push(new ObjItemFirstSword());
		a.items.push(new ObjItemFirstShield());
		a.equipBestItems();
		
		this.heroParty.push(a);
		
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
		this.screens['map'] = new ScreenMap();
		
		for (i in this.screens)
		{
			this.screens[i].init();
		}
		
		this.switchScreen('splash');
	}
}
