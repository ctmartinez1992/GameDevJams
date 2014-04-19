function Volume() { }

var mute = false;

/**
* @parameter {x} - Integer - x position on the screen
* @parameter {y} - Integer - y position on the screen
*/
Volume.init = function(x, y) {
	this.iconVolume = game.add.sprite(x, y, 'icon_volume');
	this.iconVolume.scale.divide(2, 2);
	this.iconVolume.inputEnabled = true;
	this.iconVolume.events.onInputDown.add(Volume.clickVolume, this);

	this.iconVolumeHover = game.add.sprite(x, y, 'icon_volume_hover');
	this.iconVolumeHover.inputEnabled = true;
	this.iconVolumeHover.scale.divide(2, 2);
	this.iconVolumeHover.events.onInputDown.add(Volume.clickVolume, this);
	this.iconVolumeHover.visible = false;
};

Volume.clickVolume = function() {
    mute = !mute;
	game.sound.mute = mute;
	this.iconVolumeHover.visible = mute;
	this.iconVolume.visible = !this.iconVolumeHover.visible
};