JQ-DS-Infinite-Ticker
=====================

Jquery plugin to create an optionally page wide ticker with images.

Usage:
var images = [
  [
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
	[
		'/images/some_image_122_81_bor13_f3f3f3.jpg',
		'<div class="custom_hover_effect"><p><span class="name"><a href="#">Some Title</a></span><br><a href="#">Some Subtext</a></p></div>'
	],
];
		
$('#infinite_ticker').infiniteTicker({
	images:images, 
	fullWidth:true, 
	height:110
});

@Todo
Minified version
Examples
Better Docs
