"use strict";

class Game
{
	constructor()
	{
		this._gfx = new Gfx();
	}
	
	tick()
	{
		_requestAnimationFrame(this.tick.bind(this));
		
		this.screen.draw();
	}
	
	start()
	{
		this.tick();
	}
	
	init()
	{
		this._gfx.init();
		
		this.screen = new ScreenPlace(this._gfx);
		this.screen.init();
	}
}

var _spritesheet;
var _spritesheet_loaded = false;
var _canvas;
var _ctx;
var _final_canvas;
var _final_ctx;
var _pixel_ratio;
var _zoom;
var _gfx_force_refresh = false;

var _view_update_needed = false;
var _frames_processed = 0;
var _frames_processed_last = 0;

var _touch_available = false;

// DEBUG BEGIN
var _profiler;
// DEBUG END

function viewUpdate()
{
}

function gameTick()
{
}

function gameDrawAll()
{
	if (!_spritesheet_loaded)
	{
		return;
	}
	
// DEBUG BEGIN
	_profiler.mark();
// DEBUG END
}

function gameRestart()
{
}

function controlUpdate()
{
/*
	if (inputIsKeyActive())
	{
	}
*/
}

function gameFirstTouch()
{
/*
	var i;
	
	_synth = new Synth();
	_synth.addSamples(SOUND_SAMPLES);
	for (i=0; i<8; i++)
	{
		_synth.addSamples([[0,0.09,0.01,,0.64,0.3 + i * 0.05,,,,,,,,,,,,,1,,,,,0.5]]);
	}
	_synth.setSongs(SONGS);
	_synth.playSong(0);
*/
}

function gameUpdate()
{
// DEBUG BEGIN
	_profiler.start();
// DEBUG END
	
	drawTiles();
	
// DEBUG BEGIN
	_profiler.draw();
// DEBUG END
	
	_frames_processed++;
}

function gameInit()
{
/*
	uiInit();
	inputInit();
	touchInit();
	loadPalettes();
*/
	
	if (!_touch_available)
	{
		gameFirstTouch();
	}
	
	gameRestart();
}
