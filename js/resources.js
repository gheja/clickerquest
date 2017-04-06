"use strict";

/** @const */ var SPRITESHEET_URL = "./images/sprites.png";

const GRAPHICS = [
	// title, left, top, width, height
	[ "beatbar_empty", 1, 1, 8, 8 ],
	[ "beatbar_end", 10, 1, 8, 8 ],
	[ "beatbar_beat", 19, 1, 8, 8 ],
	[ "beatbar_beat_missed", 28, 1, 8, 8 ],
	[ "beatbar_beat_matched", 37, 1, 8, 8 ],
	
	[ "bar_left", 1, 10, 2, 8 ],
	[ "bar_full", 4, 10, 9, 8 ],
	[ "bar_full_tip", 14, 10, 1, 8 ],
	[ "bar_empty", 16, 10, 9, 8 ],
	[ "bar_right", 26, 10, 2, 8 ],
	
	[ "multiplier_fixed", 1, 19, 8, 8 ],
	[ "multiplier_current", 10, 19, 8, 8 ],
	[ "multiplier_unlocked", 19, 19, 8, 8 ],
	
	[ "switch_off", 29, 10, 22, 8 ],
	[ "switch_on", 52, 10, 22, 8 ],
	
	[ "button_normal_left", 28, 19, 4, 16 ],
	[ "button_normal_middle", 33, 19, 4, 16 ],
	[ "button_normal_right", 38, 19, 4, 16 ],
	
	[ "button_hover_left", 43, 19, 4, 16 ],
	[ "button_hover_middle", 48, 19, 4, 16 ],
	[ "button_hover_right", 53, 19, 4, 16 ],
	
	[ "button_disabled_left", 58, 19, 4, 16 ],
	[ "button_disabled_middle", 63, 19, 4, 16 ],
	[ "button_disabled_right", 68, 19, 4, 16 ],
	
	[ "cover_splash", 1, 39, 288, 100 ],
];

const SONGS = [
	"calibration_tone_4.mp3"
];
