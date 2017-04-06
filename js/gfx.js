"use strict";

class Gfx
{
	constructor()
	{
		this.finalCtx = null;
		this.finalCanvas = null;
		this.zoom = 1;
		this.pixelRatio = 1;
		this.z = 1;
		this._spritesheet = null;
		this._spritesheetLoaded = false;
		this._spriteStore = {};
		this.foreground = "#fff";
		this.background = "#000";
		this.domLeft = 0;
		this.domTop = 0;
		this.domWidth = 0;
		this.domHeight = 0;
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
		
		this.domWidth = FINAL_WIDTH * zoom;
		this.domHeight = FINAL_HEIGHT * zoom;
		this.domLeft = Math.floor((window.innerWidth - this.domWidth) / 2);
		this.domTop = Math.floor((window.innerHeight - this.domHeight) / 2);
		
		this.finalCanvas.width = this.domWidth * pixel_ratio;
		this.finalCanvas.height = this.domHeight * pixel_ratio;
		
		this.finalCanvas.style.width = this.domWidth;
		this.finalCanvas.style.height = this.domHeight;
		this.finalCanvas.style.left = this.domLeft;
		this.finalCanvas.style.top = this.domTop;
		
		// smoothing is reset on canvas resize
		fixCanvasContextSmoothing(this.finalCtx);
		
		this.zoom = zoom;
		this.pixelRatio = pixel_ratio;
		this.z = zoom * pixel_ratio;
	}
	
	onWindowResizeCallback()
	{
		this._resizeCanvas();
	}
	
	onSpritesheetLoadedCallback()
	{
		let a;
		
		console.log("Sprites loaded.");
		
		for (a of GRAPHICS)
		{
			this.createSprite(...a);
		}
		
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
		
		if (a === null)
		{
			console.log("Gfx.drawSprite: ERROR: could not find sprite \"" + name + "\"");
			return;
		}
		
		this.finalCtx.drawImage(this._spritesheet, a.x, a.y, a.width, a.height, x * this.z, y * this.z, a.width * this.z, a.height * this.z);
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
				
				this.finalCtx.drawImage(this._spritesheet, a.x, a.y, k, l, (x + i * a.width) * this.z, (y + j * a.height) * this.z, k * this.z, l * this.z);
			}
		}
		
	}
	
	clear()
	{
		if (this._spritesheetLoaded)
		{
			// this.finalCtx.fillStyle = "#042";
			this.finalCtx.fillStyle = "#000";
		}
		else
		{
			this.finalCtx.fillStyle = "#300";
		}
		
		this.finalCtx.fillRect(0, 0, FINAL_WIDTH * this.z, FINAL_HEIGHT * this.z);
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
