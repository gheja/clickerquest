"use strict";

let _game = new Game();
let _profiler;
let _body;
let _gfx;
let _soundManager;
let _beater;

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
