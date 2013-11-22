NodeList.prototype.map = function(fnc){
	Array.prototype.slice.call(this).map(fnc);
}