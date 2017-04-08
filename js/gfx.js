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
		this._spritesheetOriginal = null;
		this._spritesheetLoaded = false;
		this._spritesheetCanvas = null;
		this._spritesheetCtx = null;
		this._spriteStore = {};
		this.foreground = "#eeeeee";
		this.background = "#002255";
		this.colorsChanged = false;
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
		
		this._spritesheetCanvas.width = this._spritesheetOriginal.width;
		this._spritesheetCanvas.height = this._spritesheetOriginal.height;
		
		this.updateSpriteColors();
		
		this._spritesheetLoaded = true;
	}
	
	/** @private */
	_loadSpritesheet()
	{
		console.log("Loading sprites...");
		this._spritesheetOriginal = new Image();
		this._spritesheetOriginal.addEventListener("load", this.onSpritesheetLoadedCallback.bind(this));
		this._spritesheetOriginal.src = SPRITESHEET_URL;
	}
	
	setBackgroundColor(c)
	{
		this.background = c;
		this.colorsChanged = true;
	}
	
	setForegroundColor(c)
	{
		this.foreground = c;
		this.colorsChanged = true;
	}
	
	updateSpriteColors()
	{
		let data1, d, a, i, j, k, x, y, w, h, foreground, background;
		
		function getColorArray(a)
		{
			function f(x, y)
			{
				return parseInt(x, 16) * 16 + parseInt(y, 16);
			}
			
			return [ f(a[1], a[2]), f(a[3], a[4]), f(a[5], a[6]), f(a[7], a[8]) ];
		}
		
		foreground = getColorArray(this.foreground);
		background = getColorArray(this.background);
		
		this._spritesheetCtx.drawImage(this._spritesheetOriginal, 0, 0);
		data1 = this._spritesheetCtx.getImageData(0, 0, this._spritesheetOriginal.width, this._spritesheetOriginal.height);
		d = data1.data;
		
		for (a of GRAPHICS)
		{
			x = a[1];
			y = a[2];
			w = a[3];
			h = a[4];
			
			for (i=0; i<w; i++)
			{
				for (j=0; j<h; j++)
				{
					k = ((y + j) * this._spritesheetOriginal.width + (x + i)) * 4;
					
					if (d[k + 3] != 0)
					{
						// black
						if (d[k] == 0 && d[k + 1] == 0 && d[k + 2] == 0)
						{
							d[k    ] = background[0];
							d[k + 1] = background[1];
							d[k + 2] = background[2];
						}
						else
						{
							d[k    ] = foreground[0];
							d[k + 1] = foreground[1];
							d[k + 2] = foreground[2];
						}
					}
				}
			}
		}
/*
		for (i=0; i<d.length; i++)
		{
			j = i * 4;
			
			// ignore fully transparent pixels
			if (d[j + 3] != 0)
			{
				// black
				if (d[j] == 0 && d[j + 1] == 0 && d[j + 2] == 0)
				{
					d[j    ] = background[0];
					d[j + 1] = background[1];
					d[j + 2] = background[2];
				}
				else
				{
					d[j    ] = foreground[0];
					d[j + 1] = foreground[1];
					d[j + 2] = foreground[2];
				}
			}
		}
*/
		
		this._spritesheetCtx.putImageData(data1, 0, 0);
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
		
		this.finalCtx.drawImage(this._spritesheetCanvas, a.x, a.y, a.width, a.height, x * this.z, y * this.z, a.width * this.z, a.height * this.z);
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
				
				this.finalCtx.drawImage(this._spritesheetCanvas, a.x, a.y, k, l, (x + i * a.width) * this.z, (y + j * a.height) * this.z, k * this.z, l * this.z);
			}
		}
		
	}
	
	clear()
	{
		if (!this._spritesheetLoaded)
		{
			this.finalCtx.fillStyle = this.background;
			this.finalCtx.fillRect(0, 0, FINAL_WIDTH * this.z, FINAL_HEIGHT * this.z);
			return;
		}
		
		if (this.colorsChanged)
		{
			this.colorsChanged = false;
			
			_body.style.background = this.background;
			
			this.updateSpriteColors();
		}
		
		this.finalCtx.fillStyle = this.background;
		this.finalCtx.fillRect(0, 0, FINAL_WIDTH * this.z, FINAL_HEIGHT * this.z);
	}
	
	init()
	{
		this._spritesheetCanvas = newCanvas();
		this._spritesheetCtx = this._spritesheetCanvas.getContext("2d");
		
		this.finalCanvas = newCanvas();
		this.finalCtx = this.finalCanvas.getContext("2d");
		
		this.colorsChanged = true;
		
		appendCanvas(this.finalCanvas);
		
		window.addEventListener("resize", this.onWindowResizeCallback.bind(this));
		this._resizeCanvas();
		this._loadSpritesheet();
	}
}
