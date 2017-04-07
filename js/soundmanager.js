"use strict";

var SoundObject = function()
{
	return {
		buffer: new Float32Array(),
		length: 0,
		position: 0,
		beatsOnSamples: [],
	};
};

class SoundManager
{
	constructor()
	{
		this.sounds = [];
		this.beats = [];
		this.songIdToLoad = 0;
		this.asset = null;
		this.finishedCallback = null;
		this.renderedSamples = 0;
		this.currentSong = null;
		this.startTime = null;
		
		this.totalPositionSamples = 0;
		
		this.beatLookAheadTime = 2000; // milliseconds
		this.beatLookAheadSamples = Math.floor(this.beatLookAheadTime / 1000 * 44100);
		this.beatLookAheadSamplePosition = 0;
	}
	
	onAssetFormat(a)
	{
		console.log('SoundManager.onAssetFormat: ' + a);
	}
	
	onAssetData(data)
	{
		console.log('SoundManager.onAssetData');
		
		this.sounds[this.songIdToLoad].buffer = float32concat(this.sounds[this.songIdToLoad].buffer, data);
	}
	
	onAssetEnd()
	{
		console.log('SoundManager.onAssetEnd');
		
		// TODO: free the asset properly?
		this.asset = null;
		
		if (this.songIdToLoad == 0)
		{
			this.sounds[this.songIdToLoad].buffer = this.sounds[this.songIdToLoad].buffer.slice(0, 44100);
		}
		this.sounds[this.songIdToLoad].length = this.sounds[this.songIdToLoad].buffer.length;
		
		this.songIdToLoad++;
		
		if (this.songIdToLoad == SONGS.length)
		{
			console.log('SoundManager.onAssetEnd: load finished');
			this.finishedCallback.call();
			return;
		}
		
		this.loadNextAsset();
	}
	
	loadNextAsset()
	{
		console.log('SoundManager.loadNextAsset');
		this.sounds[this.songIdToLoad] = new SoundObject();
		// this.sounds[this.songIdToLoad] = [];
		this.asset = AV.Asset.fromURL("./sounds/" + SONGS[this.songIdToLoad]);
		this.asset.on('format', this.onAssetFormat.bind(this));
		this.asset.on('data', this.onAssetData.bind(this));
		this.asset.on('end', this.onAssetEnd.bind(this));
		this.asset.start(true);
	}
	
	fillAudioNodeBuffer(e)
	{
		let buffer, length, position, tmp, a, b, c;
		
		function findBeatBetween(_this, pos1, pos2)
		{
			let a, b, i;
			
			pos1 = pos1 % _this.currentSong.length;
			pos2 = pos2 % _this.currentSong.length;
			
			if (pos1 < pos2)
			{
				for (a of _this.currentSong.beatsOnSamples)
				{
					if (a >= pos1 && a < pos2)
					{
						return a - pos1;
					}
				}
			}
			else
			{
				// for overlaps
				for (a of _this.currentSong.beatsOnSamples)
				{
					if (a >= pos1 && a < _this.currentSong.length)
					{
						return a - pos1;
					}
					else if (a >= 0 && a < pos2)
					{
						return _this.currentSong.length - pos1 + a;
					}
				}
			}
			
			return null;
		}
		
		if (this.startTime == null)
		{
			this.startTime = _game.getTime();
		}
		
		buffer = e.outputBuffer.getChannelData(0);
		length = buffer.length;
		
		buffer.fill(0);
		
		if (this.currentSong !== null)
		{
			// sound generation
			position = 0;
			while (position < length)
			{
				tmp = Math.min(this.currentSong.length - this.currentSong.position, length - position);
				buffer.set(this.currentSong.buffer.slice(this.currentSong.position, this.currentSong.position + tmp), position);
				this.currentSong.position = (this.currentSong.position + tmp) % this.currentSong.length;
				
				position += tmp;
			}
			
			// beat look-ahead
			b = this.currentSong.position;
			while (this.beatLookAheadSamplePosition < this.totalPositionSamples + this.beatLookAheadSamples)
			{
				tmp = 1000;
				
				a = findBeatBetween(this, b, b + tmp);
				if (a !== null)
				{
					c = this.startTime + (this.beatLookAheadSamplePosition + a) / 44100 * 1000;
					_beater.addBeat(c);
//					console.log("beat: " + c);
				}
				
				this.beatLookAheadSamplePosition += tmp;
				b += tmp;
			}
		}
		
		this.totalPositionSamples += length;
//		console.log("total sound rendered: " + (this.totalPositionSamples / 44100 * 1000));
	}
	
	switchMusic(songId)
	{
		if (songId === null)
		{
			this.currentSong = null;
		}
		else
		{
			this.currentSong = this.sounds[songId];
			this.currentSong.position = 0;
		}
	}
	
	init()
	{
	}
	
	load(callback)
	{
		this.finishedCallback = callback;
		this.songIdToLoad = 0;
		this.loadNextAsset();
	}
	
	start()
	{
		// TODO: dynamic
		this.sounds[0].beatsOnSamples = [ 2200 ];
		
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.audioNode = this.audioCtx.createScriptProcessor(1024 * 8, 0, 1);
		this.audioNode.onaudioprocess = this.fillAudioNodeBuffer.bind(this);
		this.audioNode.connect(this.audioCtx.destination);
	}
}
