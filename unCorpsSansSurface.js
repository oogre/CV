var UnCorpsSansSurface = function(elem){
	var _canvas = elem;
	var _goldenNumber = 1.618;
	var _Sketch = function(P){
		var diameter = _goldenNumber * 50;
		var nPoints = _goldenNumber * 500;
		var points = [];
		var Alpha = [], Delta = [], Sigma = [];
		var LIMIT = _goldenNumber*P.PI;
		var reset = 0;
		var incrementator = 0;
		P.resize = function(width, height){
			width |= window.innerWidth;
			height |= window.innerHeight;
			_canvas.style.width = width;
			_canvas.style.height = height;
			incrementator = height / 50000.0;
			return P.size(width,height);
		};
	
		P.setup = function() {
			P.noFill();
			P.strokeWeight(0.1);
			var angle = P.TWO_PI / nPoints;	
			for ( var c = 0 ; c < nPoints ; c ++ ) {  
				Alpha.push(c * angle);
				Sigma.push(1/100.0);
				Delta.push(LIMIT * P.random(1));
				points.push({ 
					x : 0, 
					y :0
				});
    		}
    		P.resize();
		};
		P.draw = function() {
			P.background(255);  
			P.beginShape();
			P.stroke(P.color(0, 0 , 0, 161));
    		var xoff = 0.0;
			for ( var c = 0 ; c < nPoints ; c ++ ) {  
				points[c].x = diameter * P.cos( Alpha[c]+Delta[c] );
				points[c].y = diameter * P.sin( Alpha[c]+Delta[c] );
				xoff = xoff + P.random(1);
				Delta[c] += Sigma[c] * P.noise( xoff );
				( LIMIT < P.abs(Delta[c])) && (Sigma[c]=-Sigma[c]);
				P.vertex( points[c].x + P.width - 100 , points[c].y + P.height/2 );
			}
			diameter += incrementator;
			P.endShape();  
		};
		return this;
	};
	var _processing = new Processing(elem, _Sketch);
	return {
		canvas : _canvas,
		processing : _processing,
		resize : function(){
			return _processing.resize();
		}
	}
}