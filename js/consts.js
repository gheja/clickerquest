"use strict";

/** @const @type {number} */ var FINAL_WIDTH = 288;
/** @const @type {number} */ var FINAL_HEIGHT = 256;

/** @const @type {number} */ var FPS = 30;
/** @const @type {number} */ var FRAME_TIME_MS = 1000 / FPS;

var LOCAL_STORAGE_PREFIX = "a";
var FONT_NAME = "dunerevengmedium";
var CHARACTER_LEVELS = [
	0,
	150 * Math.pow(2, 0),
	150 * Math.pow(2, 1),
	150 * Math.pow(2, 2),
	150 * Math.pow(2, 3),
	150 * Math.pow(2, 4),
	150 * Math.pow(2, 5),
	150 * Math.pow(2, 6),
	150 * Math.pow(2, 7),
	150 * Math.pow(2, 8)
];

var WEAPON_CLASS_ONE_HANDED = 1;
var WEAPON_CLASS_TWO_HANDED = 2;
var PLACES = [
	{
		"name": "",
		"title": "",
		"background": ""
	}
];
