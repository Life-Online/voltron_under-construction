/*
Copyright (c) 2015 by Captain Anonymous (http://codepen.io/anon/pen/MavGrq)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

A Pen created at CodePen.io. You can find this one at http://codepen.io/anon/pen/MavGrq.

a rainbowed-down version of [grayscale triangle snakes](http://codepen.io/MateiGCopot/pen/eNEpdY), couldn't resist making it ;D

Forked from [Matei Copot](http://codepen.io/towc/)'s Pen [rainbow triangle snakes](http://codepen.io/towc/pen/KpvdNY/).

Modified by Boom-Apps
*/

jQuery(function (t) {
  t.fn.createSnake = function (e, a) {
    var n = this,
      s = (t(n)[0].width = t(n).parent().width()),
      o = (t(n)[0].height = t(n).parent().height()),
      h = t(n)[0].getContext("2d"),
      r = {
        count: 50,
        variation: 0.3,
        baseLife: 50,
        addedLife: 20,
        animate: !0,
        repaintAlpha: 0.15,
        fps: 25,
        sizeGain: 0.5,
        saturation: "80%",
        lightness: "50%",
        fixedColor: !1,
        fixedColorHue: 150,
        positionHorizontal: "center",
        positionVertical: "center",
      },
      c = [],
      l = (360 * Math.random()) | 0,
      p = !0;
    function d() {
      "left" == r.positionHorizontal && (r.cx = 0),
        "center" == r.positionHorizontal && (r.cx = s / 2),
        "right" == r.positionHorizontal && (r.cx = s - 1),
        "top" == r.positionVertical && (r.cy = 0),
        "center" == r.positionVertical && (r.cy = o / 2),
        "bottom" == r.positionVertical && (r.cy = o - 1);
    }
    function u() {
      ++l,
        c.length < r.count && c.push(new y()),
        c.map(function (t) {
          t.update();
        });
    }
    function f() {
      (h.fillStyle =
        "rgba(" +
        r.bgR +
        "," +
        r.bgG +
        "," +
        r.bgB +
        "," +
        r.repaintAlpha +
        ")"),
        h.fillRect(0, 0, s, o),
        c.map(function (t) {
          t.render();
        });
    }
    function y() {
      this.reset();
    }
    (r = t.extend(!0, r, e)),
      d(),
      t(window).resize(function () {
        (s = t(n)[0].width = t(n).parent().width()),
          (o = t(n)[0].height = t(n).parent().height()),
          d(),
          setTimeout(function () {
            for (warmupIterations = 10, i = 0; i <= warmupIterations; i++)
              u(), f();
          }, 1);
      }),
      (y.prototype.reset = function () {
        (this.x1 = r.cx + Math.random()),
          (this.x2 = r.cx + Math.random()),
          (this.x3 = r.cx + Math.random()),
          (this.y1 = r.cy + Math.random()),
          (this.y2 = r.cy + Math.random()),
          (this.y3 = r.cy + Math.random()),
          (this.rad = Math.random() * Math.PI * 2),
          (this.direction = Math.random() < 0.5 ? 1 : -1),
          (this.size = 1),
          (this.life = r.baseLife + Math.random() * r.addedLife),
          r.fixedColor
            ? (this.color = "hsla(hue, saturation, lightness, alp)"
                .replace("hue", r.fixedColorHue + (this.rad / Math.PI / 2) * 50)
                .replace("saturation", r.saturation)
                .replace("lightness", r.lightness))
            : (this.color = "hsla(hue, saturation, lightness, alp)"
                .replace("hue", l + (this.rad / Math.PI / 2) * 50)
                .replace("saturation", r.saturation)
                .replace("lightness", r.lightness));
      }),
      (y.prototype.update = function () {
        --this.life,
          (this.size += 1 + (Math.random() * r.sizeGain) / 2),
          (this.direction *= -1),
          (this.rad +=
            Math.random() * r.variation * (Math.random() < 0.5 ? 1 : -1) +
            (Math.PI / 2) * this.direction);
        var t = this.x3 + Math.cos(this.rad) * this.size,
          i = this.y3 + Math.sin(this.rad) * this.size;
        (this.x1 = this.x2),
          (this.y1 = this.y2),
          (this.x2 = this.x3),
          (this.y2 = this.y3),
          (this.x3 = t),
          (this.y3 = i),
          (this.life <= 0 ||
            this.x1 > s ||
            this.x1 < 0 ||
            this.y1 > o ||
            this.y1 < 0) &&
            this.reset();
      }),
      (y.prototype.render = function () {
        (h.fillStyle = this.color.replace("alp", 0.25 + 0.5 * Math.random())),
          h.beginPath(),
          h.moveTo(this.x1, this.y1),
          h.lineTo(this.x2, this.y2),
          h.lineTo(this.x3, this.y3),
          h.fill();
      }),
      (function () {
        if (
          (t(this).css("opacity", 0), (c.length = 0), h.fillRect(0, 0, s, o), p)
        ) {
          for (
            r.animate ? (warmupIterations = 100) : (warmupIterations = 300),
              i = 0;
            i <= warmupIterations;
            i++
          )
            u(), f();
          t(this).css("opacity", 0),
            r.animate &&
              setInterval(function () {
                u(), f();
              }, 1e3 / r.fps),
            (p = !1);
        }
      })();
  };
});
