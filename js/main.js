"use strict";

let _game = new Game();

var _profiler;
var _body;
var _nextFrameTime = 0;

function mainUpdate()
{
	var a;
	
	_requestAnimationFrame(mainUpdate);
	
	a = Date.now();
	
	if (a + 5 < _nextFrameTime)
	{
		return;
	}
	
	_nextFrameTime = a + (1000 / FPS);
	
	gameUpdate();
}

function spritesheetLoadedCallback()
{
	_spritesheet_loaded = true;
}

function init()
{
	_body = document.getElementsByTagName("body")[0];
	
	_game.init();
	
// DEBUG BEGIN
	_profiler = new Profiler();
	_profiler.init("canvas2", 200, 60, 8);
// DEBUG END
	
	_game.start();
}

window.onload = init;
