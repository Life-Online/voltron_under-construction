$(function () {
  function i() {
    $(".bg").height($(window).height()),
      $(".startmessage ").css(
        "padding-top",
        $(window).height() / 2 - 200 + "px"
      );
  }
  $(window).resize(i),
    i(),
    $("#canvas3").createSnake({
      count: 150,
      variation: 1.3,
      baseLife: 1500,
      addedLife: 100,
      bgR: 0,
      bgG: 0,
      bgB: 0,
      repaintAlpha: 0.4,
      fps: 25,
      sizeGain: 5,
      saturation: "80%",
      lightness: "50%",
      positionHorizontal: "right",
      positionVertical: "bottom",
      fixedColor: !0,
      fixedColorHue: 150,
    });
});
