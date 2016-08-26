$(function() {
    function application() {

        this.$canvas = $('<canvas/>', { id: 'canvas' });
        // this.$canvas.appendTo($('body'));
        this.canvas = this.$canvas.get(0);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = $(window).innerWidth();
        this.canvas.height = $(window).innerHeight();
        this.config = {
            clickDiameter: 10,
            decValue: 125,
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var self = this;

        $(window).on('mousemove', function(e) {
            var mouseX = e.clientX,
                mouseY = e.clientY;

            var imgd = self.ctx.getImageData(mouseX, mouseY, 1, 1);
            var pix = markHover(imgd.data, 0);
            // var prevColor = this.ctx.getImageDate
            self.ctx.putImageData(imgd, mouseX, mouseY);
        });
        this.c

        $(window).on('click', function(e) {
            var mouseX = e.clientX,
                mouseY = e.clientY;

            var cD = self.config.clickDiameter;
            var topLeftX = mouseX - (cD / 2),
                topLeftY = mouseY - (cD / 2);

            var imgd = self.ctx.getImageData(topLeftX, topLeftY, cD, cD);
            var pix = decreaseColorChannel(imgd.data, 1);
            // var prevColor = this.ctx.getImageDate
            self.ctx.putImageData(imgd, topLeftX, topLeftY);
        });

        // pix = area of pixels
        function markHover(pix, channel) {
            for (var i = 0; i < pix.length; i += 4) {
                for (var j = 0; j < 3; j++) {
                    if (channel == j) continue;
                    decreaseColorChannel(pix, j);
                }
            }
        }

        function decreaseColorChannel(pix, channel) {
            for (var i = 0; i < pix.length; i += 4) {
                pix[i + channel] = Math.max(0, pix[i + channel] - this.config.decValue);
            }
            return pix;
        }

        function init() {
            flashCanvas({
                r: 255,
                g: 255,
                b: 255,
                a: 255
            });
        }

        function flashCanvas(col) {
            var imgd = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var pix = imgd.data;

            for (var i = 0; i < pix.length; i++) {
                pix[i    ] = col.r;
                pix[i + 1] = col.g;
                pix[i + 2] = col.b;
                pix[i + 3] = col.a;
            }

            this.ctx.putImageData(imgd, 0, 0);
        }

        return {
            heatmap: function() {
                alert('heatmap')
            },
            init: init,
        };

    }

    var app = application();
    app.init();

});
