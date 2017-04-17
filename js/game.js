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
		this.gameTime = 0;
		this.doors = [];
		this.places = [];
		this.activePlace = null;
		this.gamePhase = "none";
		this.newClick = false;
		this.storyTexts = [];
		this.heroParty = [];
		this.enemyParty = [];
		this.isPaused = false;
		this.isNewGame = true;
		
		this.commonObjects = [];
		this.commonObjectsBeat = [];
		this.commonObjectsLogo = [];
	}
	
	resetTime()
	{
		this.startTime = Date.now();
	}
	
	updateTime()
	{
		this.gameTime = Date.now() - this.startTime;
	}
	
	getTime()
	{
		return this.gameTime;
	}
	
	pause()
	{
		this.isPaused = true;
		this.updateGamePhase();
	}
	
	unpause()
	{
		this.isPaused = false;
		this.updateGamePhase();
	}
	
	tickCharacters()
	{
		let tmp;
		
		for (tmp of this.heroParty)
		{
			tmp.update();
		}
		
		for (tmp of this.enemyParty)
		{
			tmp.update();
		}
	}
	
	tick()
	{
		let a, b;
		
		this.updateTime();
		
		this.ticks++;
		this.updateGamePhase();
		this.tickCharacters();
		this.screen.tick();
		
		if (_beater.getNearestBeatStatus() == BEAT_STATUS_MISSED)
		{
			_multiplier.decrease();
			_beater.markNearestBeatProcessed();
		}
		
		if (this.newClick)
		{
			if (_beater.getNearestBeatStatus() == BEAT_STATUS_ONGOING)
			{
				_multiplier.increase();
				this.commonObjectsBeat["beatbar"].setStatus("matched");
			}
			else
			{
				_multiplier.decrease();
				this.commonObjectsBeat["beatbar"].setStatus("missed");
			}
			_beater.markNearestBeatProcessed();
		}
	}
	
	draw()
	{
		this.screen.draw();
	}
	
	cleanupAfterEncounter()
	{
		let tmp, i;
		
		// clear enemies
		this.enemyParty.length = 0;
		
		// clear flee markers
		for (tmp of this.heroParty)
		{
			tmp.fled = false;
			tmp.action = "attack";
		}
		
		// clear dead heroes
		for (i=this.heroParty.length - 1; i>=0; i--)
		{
			if (this.heroParty[i].dead)
			{
				this.heroParty.splice(i, 1);
			}
		}
		
		this.updateParties();
	}
	
	clearFleeStatuses()
	{
		for (tmp of this.heroParty)
		{
			countHeroes++;
			
			if (!tmp.dead)
			{
				countHeroesAlive++;
			}
			
			if (!tmp.fled)
			{
				countHeroesFighting++;
			}
		}
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
	
	resetGame()
	{
		this.isNewGame = true;
	}
	
	clearGame()
	{
		this.isNewGame = false;
		this.activePlace = null;
		this.heroParty.length = 0;
		this.enemyParty.length = 0;
		this.places.length = 0;
		this.doors.length = 0;
		this.storyTexts.length = 0;
		this.initMap();
		
		this.setActivePlace("home");
	}
	
	startGame()
	{
		if (this.isNewGame)
		{
			this.clearGame();
		}
		
		this.switchScreen("place");
	}
	
	updateGamePhase(forced)
	{
		let tmp, countHeroes, countHeroesAlive, countHeroesFighting, countEnemies, countEnemiesAlive, countEnemiesFighting;
		
		forced = nvl(forced, false);
		
		if (this.isPaused)
		{
			this.setGamePhase("paused", forced);
			return;
		}
		
		countHeroes = 0;
		countHeroesAlive = 0;
		countHeroesFighting = 0;
		countEnemies = 0;
		countEnemiesAlive = 0;
		countEnemiesFighting = 0;
		
		if (this.heroParty.length > 0)
		{
			for (tmp of this.heroParty)
			{
				countHeroes++;
				
				if (!tmp.dead)
				{
					countHeroesAlive++;
				}
				
				if (!tmp.fled)
				{
					countHeroesFighting++;
				}
			}
		}
		
		if (this.enemyParty.length > 0)
		{
			for (tmp of this.enemyParty)
			{
				countEnemies++;
				
				if (!tmp.dead)
				{
					countEnemiesAlive++;
				}
				
				if (!tmp.fled)
				{
					countEnemiesFighting++;
				}
			}
		}
		
		if (countHeroesAlive == 0)
		{
			this.setGamePhase("dead", forced);
			return;
		}
		else
		{
			if (countEnemies > 0)
			{
				if (countEnemiesAlive == 0)
				{
					this.setGamePhase("encounter-done", forced);
					return;
				}
				else
				{
					if (countHeroesFighting == 0)
					{
						this.setGamePhase("encounter-fled", forced);
						return;
					}
					else
					{
						this.setGamePhase("encounter", forced);
						return;
					}
				}
			}
		}
		
		this.setGamePhase("normal", forced);
	}
	
	executeTurn()
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
	
	gainExperiencePoints(count)
	{
		let tmp, a, x;
		
		a = 0;
		for (tmp of this.heroParty)
		{
			if (!tmp.dead && !tmp.fled)
			{
				a++;
			}
		}
		
		if (a == 0)
		{
			return;
		}
		
		x = Math.floor(count / a);
		
		for (tmp of this.heroParty)
		{
			if (!tmp.dead && !tmp.fled)
			{
				tmp.points.experience += x;
			}
		}
	}
	
	createCharacter(className, level, items)
	{
		let character, tmp;
		
		character = new className.constructor();
		character.points.experience = getExperiencePointsFromLevel(level);
		for (tmp of items)
		{
			// TODO: constructor parameters?!
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
		tmp.reinitStuffs();
		
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
		
		console.log(phase);
		
		this.gamePhase = phase;
		
		if (this.isPaused)
		{
			// _gfx.setForegroundColor("#dddddd");
			_gfx.setBackgroundColor("#002255");
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
	
	onClickHtmlBody(event)
	{
		this.onClick({ clientX: -1, clientY: -1 });
	}
	
	onMouseMove(event)
	{
		this.screen.mouseMove(Math.round((event.clientX - _gfx.domLeft) / _gfx.zoom), Math.round((event.clientY - _gfx.domTop) / _gfx.zoom));
	}
	
	addHero(level, sword, shield)
	{
		let a;
		
		a = new ObjCharacter();
		a.points.experience = getExperiencePointsFromLevel(level);
		a.items.push(new ObjItemFirstSword(sword));
		a.items.push(new ObjItemFirstShield(shield));
		a.equipBestItems();
		a.reinitStuffs();
		
		this.heroParty.push(a);
		
		return a;
	}
	
	addGuyFromPlace()
	{
		let a;
		
		a = this.addHero(...this.activePlace.guyAtEndOfPlace);
		a.originPlace = this.activePlace.name;
		this.updateParties();
	}
	
	initMap()
	{
		let a;
		
		a = new ObjPlace("home", "Home", "cover_home", 100, 32, 33);
		a.unlocked = true;
		
		a = new ObjPlace("road", "Road", "cover_road", 300, 99, 28);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 1, [ new ObjItemFirstSword(4) ], 0.03));
		a.guyAtEndOfPlace = [ 1, 4, 3 ];
		
		a = new ObjPlace("foresta", "Forest A", "cover_forest", 500, 170, 29);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 3, [ new ObjItemFirstSword(4) ], 0.05));
		
		a = new ObjPlace("forestb", "Forest B", "cover_forest", 300, 92, 76);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 7, [ new ObjItemFirstSword(4) ], 0.09));
		a.guyAtEndOfPlace = [ 8, 6, 3 ];
		
		a = new ObjPlace("road2", "Road", "cover_road2", 500, 230, 18);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 5, [ new ObjItemFirstSword(4) ], 0.03));
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 3, [ new ObjItemFirstSword(4) ], 0.05));
		a.guyAtEndOfPlace = [ 3, 4, 2 ];
		
		a = new ObjPlace("forestc", "Forest C", "cover_road2", 1000, 230, 62);
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 7, [ new ObjItemFirstSword(4) ], 0.03));
		a.enemyGroups.push(new EnemyGroup(new ObjEnemyFirst(), 5, [ new ObjItemFirstSword(4) ], 0.05));
		
		a = new ObjDoor("home", "road", 0.5, true);
		a.unlockChance = 0.1;
		
		a = new ObjDoor("road", "foresta", 0.5, true);
		a.unlockChance = 0.1;
		
		a = new ObjDoor("road", "forestb", 0.7, true);
		a.unlockChance = 0.1;
		
		a = new ObjDoor("foresta", "road2", 0.7, true);
		a.unlockChance = 0.1;
		
		a = new ObjDoor("road2", "forestc", 0.7, true);
		a.unlockChance = 0.1;
		
		this.addHero(1, 4, 2);
		
		for (a of this.places)
		{
			a.init();
		}
	}
	
	initCommonObjects()
	{
//		this.commonObjects["tooltip"] = new GfxTooltip();
		
		this.commonObjectsLogo["cover"] = new GfxImage("cover_splash", 0, 32);
		this.commonObjectsLogo["logo"] = new GfxImage("logo", 94, 32);
		
		this.commonObjectsBeat["beatbar"] = new GfxBeatbar(0, 2, 108);
		this.commonObjectsBeat["multiplier"] = new GfxMultiplier(109, 4);
		this.commonObjectsBeat["label_multiplier"] = new GfxLabel(288, 16, "right", "x1.0");
		this.commonObjectsBeat["label_multiplier"].scale = 2;
	}
	
	init()
	{
		let i;
		
		this.resetTime();
		this.initCommonObjects();
		
		_multiplier = new Multiplier();
		
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
		this.screens['reset'] = new ScreenReset();
		this.screens['inventory'] = new ScreenInventory();
		this.screens['credits'] = new ScreenCredits();
		
		for (i in this.screens)
		{
			this.screens[i].init();
		}
		
		this.switchScreen('splash');
	}
}
