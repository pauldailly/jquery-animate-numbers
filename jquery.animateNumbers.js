/***********
 Animates element's number to new number with number formatting
 Parameters:
 stop (number): number to stop on
 formatNumber (boolean): turn number formatting on/off (default is true)
 duration (number): how long in ms (default is 1000)
 ease (string): type of easing (default is "swing", others are avaiable from jQuery's easing plugin
 Examples:
 $("#div").animateNumbers(1234, false, 500, "linear"); // half second linear without number formatting
 $("#div").animateNumbers(1234, true, 2000); // two second swing with number formatting
 $("#div").animateNumbers(4321); // one second swing with number formatting
 This fully expects an element containing an integer
 If the number is within copy then separate it with a span and target the span
 Inserts and accounts for number formatting during animation by default
 ***********/

(function ($) {
  $.fn.animateNumbers = function (stop, formatNumber, duration, ease) {
    return this.each(function () {
      var $this = $(this);
      var start = parseInt($this.text().replace(/,/g, ""));
      formatNumber = (formatNumber === undefined) ? true : formatNumber;
      $({value: start}).animate({value: stop}, {
        duration: duration == undefined ? 1000 : duration,
        easing: ease == undefined ? "swing" : ease,
        step: function () {
          var stepVal = Math.floor(this.value);
          $this.text(formatNumber ? stepVal.toLocaleString() : stepVal);
        },
        complete: function () {
          if (parseInt($this.text()) !== stop) {
            $this.text(formatNumber ? stop.toLocaleString() : stop);
          }
        }
      });
    });
  };
})(jQuery);