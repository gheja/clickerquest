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
		
		this.beatLookAheadTime = 3000; // milliseconds
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
			this.sounds[this.songIdToLoad].buffer = this.sounds[this.songIdToLoad].buffer.slice(0, 26460);
		}
		if (this.songIdToLoad == 1)
		{
			this.sounds[this.songIdToLoad].buffer = this.sounds[this.songIdToLoad].buffer.slice(0, 926100);
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
		this.asset = AV.Asset.fromURL("./sounds/" + SONGS[this.songIdToLoad]);
		this.asset.on('format', this.onAssetFormat.bind(this));
		this.asset.on('data', this.onAssetData.bind(this));
		this.asset.on('end', this.onAssetEnd.bind(this));
		this.asset.start(true);
	}
	
	fillAudioNodeBuffer(e)
	{
		let buffer, length, position, tmp, a, b, c;
		
		if (this.startTime == null)
		{
			this.startTime = _game.getTime();
			console.log(this.startTime);
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
			b = this.beatLookAheadSamplePosition;
			while (b < this.totalPositionSamples + this.beatLookAheadSamples)
			{
				c = b % this.currentSong.length;
				
				if (this.currentSong.beatsOnSamples.indexOf(c) !== -1)
				{
					_beater.addBeat(this.startTime + b / 44100 * 1000);
//					console.log([ this.startTime, b, b / 44100 * 1000 ]);
				}
				
				b++;
			}
			
			this.beatLookAheadSamplePosition = b;
			
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
		else if (songId != this.currentSong)
		{
			this.currentSong = this.sounds[songId];
			this.currentSong.position = 0;
		}
//		this.startTime = null;
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
		let i;
		
		// TODO: dynamic
		this.sounds[0].beatsOnSamples = [ 533 ];
		this.sounds[1].beatsOnSamples = [];
		for (i=533; i<926100; i+=26460)
		{
			this.sounds[1].beatsOnSamples.push(i);
		}
		
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.audioNode = this.audioCtx.createScriptProcessor(1024 * 8, 0, 1);
		this.audioNode.onaudioprocess = this.fillAudioNodeBuffer.bind(this);
		this.audioNode.connect(this.audioCtx.destination);
	}
}
