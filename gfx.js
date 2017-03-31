"use strict";

class Gfx
{
	constructor()
	{
		this.finalCtx = null;
		this.finalCanvas = null;
		this.zoom = 1;
		this._spritesheet = null;
		this._spritesheetLoaded = false;
		this._spriteStore = {};
	}
	
	/** @private */
	_resizeCanvas()
	{
		let dpr, bsr, pixel_ratio, zoom, w, h;
		
		dpr = window.devicePixelRatio || 1;
		
		bsr = this.finalCtx.webkitBackingStorePixelRatio ||
			this.finalCtx.mozBackingStorePixelRatio ||
			this.finalCtx.msBackingStorePixelRatio ||
			this.finalCtx.oBackingStorePixelRatio ||
			this.finalCtx.backingStorePixelRatio || 1;
		
		pixel_ratio = dpr / bsr;
		
		zoom = Math.min(Math.floor(window.innerWidth / FINAL_WIDTH), Math.floor(window.innerHeight / FINAL_HEIGHT));
		
		if (zoom * pixel_ratio < 1)
		{
			// warn the user about viewport clipping?
			zoom = 1;
		}
		
		// if (zoom < 2 && window.innerWidth < window.innerHeight)
		// {
		// 	// suggest the use of landscape mode
		// }
		
		w = FINAL_WIDTH * zoom;
		h = FINAL_HEIGHT * zoom;
		
		this.finalCanvas.width = w * pixel_ratio;
		this.finalCanvas.height = h * pixel_ratio;
		
		this.finalCanvas.style.width = w;
		this.finalCanvas.style.height = h;
		
		this.finalCanvas.style.left = (window.innerWidth - w) / 2;
		this.finalCanvas.style.top = (window.innerHeight - h) / 2;
		
		// smoothing is reset on canvas resize
		fixCanvasContextSmoothing(this.finalCtx);
		
		this.zoom = zoom;
	}
	
	get zoomLevel()
	{
		return this.zoom;
	}
	
	set zoomLevel(x)
	{
		this.zoom = x;
	}
	
	onWindowResizeCallback()
	{
		this._resizeCanvas();
	}
	
	onSpritesheetLoadedCallback()
	{
		console.log("Sprites loaded.");
		
		this.createSprite("beatbar_empty", 1, 1, 8, 8);
		this.createSprite("beatbar_end", 10, 1, 8, 8);
		this.createSprite("beatbar_beat", 19, 1, 8, 8);
		this.createSprite("beatbar_beat_missed", 28, 1, 8, 8);
		this.createSprite("beatbar_beat_matched", 37, 1, 8, 8);
		
		this.createSprite("bar_left", 1, 10, 2, 8);
		this.createSprite("bar_full", 4, 10, 9, 8);
		this.createSprite("bar_full_tip", 14, 10, 1, 8);
		this.createSprite("bar_empty", 16, 10, 9, 8);
		this.createSprite("bar_right", 26, 10, 2, 8);
		
		this.createSprite("multiplier_fixed", 1, 19, 8, 8);
		this.createSprite("multiplier_current", 10, 19, 8, 8);
		this.createSprite("multiplier_unlocked", 19, 19, 8, 8);
		
		this.createSprite("switch_off", 29, 10, 22, 8);
		this.createSprite("switch_on", 52, 10, 22, 8);
		
		this._spritesheetLoaded = true;
	}
	
	/** @private */
	_loadSpritesheet()
	{
		console.log("Loading sprites...");
		this._spritesheet = new Image();
		this._spritesheet.addEventListener("load", this.onSpritesheetLoadedCallback.bind(this));
		this._spritesheet.src = SPRITESHEET_URL;
	}
	
	createSprite(name, x, y, width, height)
	{
		this._spriteStore[name] = { x: x, y: y, width: width, height: height };
	}
	
	drawSprite(name, x, y)
	{
		if (!this._spritesheetLoaded)
		{
			return;
		}
		
		const a = this._spriteStore[name];
		this.finalCtx.drawImage(this._spritesheet, a.x, a.y, a.width, a.height, x * this.zoom, y * this.zoom, a.width * this.zoom, a.height * this.zoom);
	}
	
	drawSpriteElastic(name, x, y, width, height)
	{
		if (!this._spritesheetLoaded)
		{
			return;
		}
		
		let i, j, i_max, j_max, k, l;
		const a = this._spriteStore[name];
		
		i_max = Math.ceil(width / a.width);
		j_max = Math.ceil(height / a.height);
		
		for (i=0; i<i_max; i++)
		{
			for (j=0; j<j_max; j++)
			{
				k = Math.min(a.width, width - i * a.width);
				l = Math.min(a.height, height - j * a.height);
				
				this.finalCtx.drawImage(this._spritesheet, a.x, a.y, k, l, (x + i * a.width) * this.zoom, (y + j * a.height) * this.zoom, k * this.zoom, l * this.zoom);
			}
		}
		
	}
	
	clear()
	{
		if (this._spritesheetLoaded)
		{
			this.finalCtx.fillStyle = "#042";
		}
		else
		{
			this.finalCtx.fillStyle = "#300";
		}
		
		this.finalCtx.fillRect(0, 0, FINAL_WIDTH * this.zoom, FINAL_HEIGHT * this.zoom);
	}
	
	init()
	{
		this.finalCanvas = newCanvas();
		this.finalCtx = this.finalCanvas.getContext("2d");
		
		appendCanvas(this.finalCanvas);
		
		window.addEventListener("resize", this.onWindowResizeCallback.bind(this));
		this._resizeCanvas();
		this._loadSpritesheet();
	}
}
