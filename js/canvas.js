window.canvas = (function() {

	function Canvas(root_id) {
		var root = document.getElementById(root_id);
		if (root == undefined) {
			console.error('Root element not found!');
			return;
		}
		
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var drawMode = false;
		canvas.width = 640;
		canvas.height = 480;
		ctx.lineCap = 'round';
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#F00';
		ctx.beginPath();
		canvas.onmousedown = function(e) {
			drawMode = true;
			ctx.moveTo(e.offsetX, e.offsetY);
		};
		canvas.onmouseup = function() {
			drawMode = false;
		};
		canvas.onmousemove = function(e) {
			if (drawMode) {
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.moveTo(e.offsetX, e.offsetY);
				ctx.stroke();
			}
		};

		var settingsPanel = document.createElement('div');
		settingsPanel.className = 'canvas-settings';
		var brushSizePanel = document.createElement('div');
		brushSizePanel.className = 'canvas-settings-element';
		brushSizePanel.innerHTML = '<label>Size:</label>';
		var input = document.createElement('input');
		input.type = 'range';
		input.min = 3;
		input.max = 10;
		input.value = ctx.lineWidth;
		input.addEventListener('input', function() {
			ctx.lineWidth = input.value;
		});
		var brushSizeDemo = document.createElement('div');
		brushSizePanel.appendChild(input);
		brushSizePanel.appendChild(brushSizeDemo);
		settingsPanel.appendChild(brushSizePanel);

		root.appendChild(settingsPanel);
		root.appendChild(canvas);
	}

	var context = {
		init: function(id) {
			return new Canvas(id);
		}
	}

	return context;
})();