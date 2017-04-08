"use strict";

/** @const */ var SPRITESHEET_URL = "./images/sprites.png";

const GRAPHICS = [
	// title, left, top, width, height
	[ "beatbar_empty", 115, 1, 12, 12 ],
	[ "beatbar_end", 128, 1, 12, 12 ],
	[ "beatbar_beat", 141, 1, 12, 12 ],
	[ "beatbar_beat_missed", 154, 1, 12, 12 ],
	[ "beatbar_beat_matched", 167, 1, 12, 12 ],
	[ "beatbar_beat2", 180, 1, 12, 12 ],
	
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
	
	[ "button_normal_left", 28, 19, 4, 13 ],
	[ "button_normal_middle", 33, 19, 4, 13 ],
	[ "button_normal_right", 38, 19, 4, 13 ],
	
	[ "button_hover_left", 43, 19, 4, 13 ],
	[ "button_hover_middle", 48, 19, 4, 13 ],
	[ "button_hover_right", 53, 19, 4, 13 ],
	
	[ "button_disabled_left", 58, 19, 4, 13 ],
	[ "button_disabled_middle", 63, 19, 4, 13 ],
	[ "button_disabled_right", 68, 19, 4, 13 ],
	
	[ "cover_splash", 1, 39, 288, 100 ],
	[ "cover_place1", 1, 140, 288, 100 ],
	[ "logo", 290, 171, 100, 40 ],
	
	[ "portrait_enemy1", 290, 140, 30, 30 ],
	[ "portrait_enemy2", 321, 140, 30, 30 ],
	[ "portrait_hero1", 352, 140, 30, 30 ],
	[ "portrait_hero_background", 383, 140, 30, 30 ],
	[ "portrait_hero_border", 414, 140, 30, 31 ],
	[ "portrait_hero_border_dead", 445, 140, 30, 31 ],
	[ "portrait_enemy_background", 290, 105, 97, 34 ],
	[ "portrait_enemy_border", 476, 140, 30, 30 ],
	[ "portrait_enemy_border_dead", 507, 140, 30, 30 ],
	[ "portrait_common_hit", 538, 140, 30, 30 ],
	
	[ "bar2_full", 75, 10, 4, 8 ],
	[ "bar2_full_tip", 80, 10, 1, 8 ],
	[ "bar2_empty", 82, 10, 4, 8 ],
	
	[ "bar3_left", 87, 10, 2, 8 ],
	[ "bar3_full", 90, 10, 9, 8 ],
	[ "bar3_full_tip", 100, 10, 1, 8 ],
	[ "bar3_empty", 102, 10, 9, 8 ],
	[ "bar3_right", 112, 10, 2, 8 ],
	
	[ "icon_health", 73, 19, 9, 9 ],
	[ "icon_attack", 83, 19, 9, 9 ],
	[ "icon_defense", 93, 19, 9, 9 ],
	[ "icon_spell", 103, 19, 9, 9 ],
	
	[ "action_attack", 113, 19, 30, 9 ],
	[ "action_defend", 144, 19, 30, 9 ],
	[ "action_rest", 175, 19, 30, 9 ],
	[ "action_heal", 206, 19, 30, 9 ],
	[ "action_invalid", 237, 19, 30, 9 ],
];

const SONGS = [
	"calibration_tone_4.mp3"
];
