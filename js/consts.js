"use strict";

/** @const @type {number} */ var FINAL_WIDTH = 288;
/** @const @type {number} */ var FINAL_HEIGHT = 256;

/** @const @type {number} */ var FPS = 30;
/** @const @type {number} */ var FRAME_TIME_MS = 1000 / FPS;

var LOCAL_STORAGE_PREFIX = "a";
var FONT_NAME = "tinyunicodemedium";
var WEAPON_CLASS_SWORD = 1;
var WEAPON_CLASS_OTHERS = 2;
var ITEM_CLASS_WEAPON = 1;
var ITEM_CLASS_SHIELD = 2;
var PLACES = [
	{
		"name": "",
		"title": "",
		"background": ""
	}
];

var BEAT_STATUS_NONE = 1;
var BEAT_STATUS_COMING = 2;
var BEAT_STATUS_ONGOING = 3;
var BEAT_STATUS_MISSED = 4;
var BEAT_STATUS_PROCESSED = 5;
