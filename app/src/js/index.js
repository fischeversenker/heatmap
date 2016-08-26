$(function() {

    function application() {

        this.canvas = $('<canvas />');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = $(window).innerWidth();
        this.canvas.height = $(window).innerHeight();
        this.config = {
            clickDiameter: 10,
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

        $(window).on('click', function(e) {

            var mouseX = e.clientX,
                mouseY = e.clientY;

            var cD = self.config.clickDiameter;
            var topLeftX = mouseX - (cD / 2);
            var topLeftY = mouseY - (cD / 2);

            var imgd = self.ctx.getImageData(topLeftX, topLeftY, cD, cD);
            var pix = decreasePixel(imgd.data, 1);
            // var prevColor = this.ctx.getImageDate
            self.ctx.putImageData(imgd, topLeftX, topLeftY);
        });

        function markHover(pix, channel) {
            if (channel == 0) {
                decreasePixel(pix, 1);
                decreasePixel(pix, 2);
            } else if (channel == 1) {
                decreasePixel(pix, 0);
                decreasePixel(pix, 2);
            } else if (channel == 2) {
                decreasePixel(pix, 0);
                decreasePixel(pix, 1);
            }
        }

        function decreasePixel(pix, channel) {
            var decValue = 125;
            for (var i = 0; i < pix.length; i += 4) {
                pix[i + channel] = Math.max(0, pix[i + channel] - decValue);
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
            console.log("flashing");
            var imgd = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var pix = imgd.data;

            for (var i = 0; i < pix.length; i++) {
                pix[i  ] = col.r;
                pix[i+1] = col.g;
                pix[i+2] = col.b;
                pix[i+3] = col.a;
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
