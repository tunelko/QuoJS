// Generated by CoffeeScript 1.3.1

/*
  QuoJS 2.0
  (c) 2011, 2012 Javi Jiménez Villar (@soyjavi)
  http://quojs.tapquo.com
*/


(function() {

  (function($$) {
    var GESTURES, HOLD_DELAY, TOUCH, TOUCH_TIMEOUT, _captureTouch, _cleanGesture, _countFingers, _hold, _isSwipe, _listenTouches, _onTouchEnd, _onTouchMove, _onTouchStart, _parentIfText, _swipeDirection, _trigger;
    TOUCH = {};
    TOUCH_TIMEOUT = void 0;
    HOLD_DELAY = 650;
    GESTURES = ["doubleTap", "hold", "swipe", "swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "drag"];
    GESTURES.forEach(function(event) {
      $$.fn[event] = function(callback) {
        return this.on(event, callback);
      };
    });
    $$(document).ready(function() {
      return _listenTouches();
    });
    _listenTouches = function() {
      var environment;
      environment = $$(document.body);
      environment.bind("touchstart", _onTouchStart);
      environment.bind("touchmove", _onTouchMove);
      environment.bind("touchend", _onTouchEnd);
      return environment.bind("touchcancel", _cleanGesture);
    };
    _onTouchStart = function(event) {
      var delta, now, touch_event;
      now = Date.now();
      delta = now - (TOUCH.last || now);
      touch_event = _captureTouch(event);
      TOUCH_TIMEOUT && clearTimeout(TOUCH_TIMEOUT);
      TOUCH = {
        el: $$(_parentIfText(touch_event.target)),
        x1: touch_event.pageX,
        y1: touch_event.pageY,
        isDoubleTap: (delta > 0 && delta <= 250 ? true : false),
        last: now,
        fingers: _countFingers(event)
      };
      return setTimeout(_hold, HOLD_DELAY);
    };
    _onTouchMove = function(event) {
      var touch_event;
      touch_event = _captureTouch(event);
      TOUCH.x2 = touch_event.pageX;
      TOUCH.y2 = touch_event.pageY;
      if (_isSwipe(event)) {
        return TOUCH.el.trigger("swiping", TOUCH);
      }
    };
    _onTouchEnd = function(event) {
      var swipe_direction;
      if (TOUCH.isDoubleTap) {
        return _trigger("doubleTap", true);
      } else if (TOUCH.x2 > 0 || TOUCH.y2 > 0) {
        if (_isSwipe(event)) {
          if (TOUCH.fingers === 1) {
            _trigger("swipe", false);
            swipe_direction = _swipeDirection(TOUCH.x1, TOUCH.x2, TOUCH.y1, TOUCH.y2);
            _trigger(swipe_direction, false);
          } else {
            _trigger("drag", false);
          }
        }
        return _cleanGesture();
      } else {
        if (TOUCH.el) {
          _trigger("tap");
        }
        return TOUCH_TIMEOUT = setTimeout(_cleanGesture, 250);
      }
    };
    _trigger = function(type, clean) {
      TOUCH.el.trigger(type, TOUCH);
      return clean && _cleanGesture();
    };
    _cleanGesture = function(event) {
      TOUCH = {};
      return clearTimeout(TOUCH_TIMEOUT);
    };
    _isSwipe = function(event) {
      return TOUCH.el && (Math.abs(TOUCH.x1 - TOUCH.x2) > 30 || Math.abs(TOUCH.y1 - TOUCH.y2) > 30);
    };
    _captureTouch = function(event) {
      if ($$.isMobile()) {
        return event.touches[0];
      } else {
        return event;
      }
    };
    _parentIfText = function(node) {
      if ("tagName" in node) {
        return node;
      } else {
        return node.parentNode;
      }
    };
    _swipeDirection = function(x1, x2, y1, y2) {
      var xDelta, yDelta;
      xDelta = Math.abs(x1 - x2);
      yDelta = Math.abs(y1 - y2);
      if (xDelta >= yDelta) {
        if (x1 - x2 > 0) {
          return "swipeLeft";
        } else {
          return "swipeRight";
        }
      } else {
        if (y1 - y2 > 0) {
          return "swipeUp";
        } else {
          return "swipeDown";
        }
      }
    };
    _hold = function() {
      if (TOUCH.last && (Date.now() - TOUCH.last >= HOLD_DELAY)) {
        _trigger("hold");
        _cleanGesture();
      }
    };
    _countFingers = function(event) {
      if (event.touches) {
        return event.touches.length;
      } else {
        return 1;
      }
    };
  })(Quo);

}).call(this);
