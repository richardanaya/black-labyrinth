(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  var Main = require('./components/main.jsx'); // Our custom react component
  var Map = require('./components/map.jsx');
  var Dice = require('./components/dice.jsx');

  var routes = React.createElement(
    ReactRouter.Route,
    { handler: Main },
    React.createElement(ReactRouter.Route, { path: '/', handler: Map }),
    React.createElement(ReactRouter.Route, { path: '/dice', handler: Dice })
  );

  ReactRouter.run(routes, ReactRouter.HashLocation, function (Root) {
    React.render(React.createElement(Root, null), document.body);
  });
})();

},{"./components/dice.jsx":4,"./components/main.jsx":6,"./components/map.jsx":7}],2:[function(require,module,exports){
"use strict";

exports.rollDice = Action.create();

},{}],3:[function(require,module,exports){
"use strict";

var DiceStore = require("../stores/dicestore");
var DiceActions = require("../actions/diceactions");

var DiceDialogComponent = (function (_React$Component) {
    babelHelpers.inherits(DiceDialogComponent, _React$Component);

    function DiceDialogComponent(props, context) {
        babelHelpers.classCallCheck(this, DiceDialogComponent);

        babelHelpers.get(Object.getPrototypeOf(DiceDialogComponent.prototype), "constructor", this).call(this, props);
        this.state = {};
        this.context = context;
    }

    babelHelpers.createClass(DiceDialogComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            DiceStore.instance.subscribe(this.onDiceUpdate.bind(this));
        }
    }, {
        key: "onDiceUpdate",
        value: function onDiceUpdate(value) {}
    }, {
        key: "show",
        value: function show() {
            $(this.refs.dialog.getDOMNode()).openModal();
        }
    }, {
        key: "render",
        value: function render() {
            var standardActions = [{ text: "Cancel" }, { text: "Roll", onTouchTap: this.onRoll.bind(this), ref: "submit" }];

            return React.createElement(
                "div",
                { ref: "dialog", className: "modal bottom-sheet" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "h4",
                        null,
                        "Modal Header"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "A bunch of text"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal-footer" },
                    React.createElement(
                        "a",
                        { onClick: this.onRoll.bind(this), className: " modal-action modal-close waves-effect waves-green btn-flat" },
                        "Roll"
                    )
                )
            );
        }
    }, {
        key: "onRoll",
        value: function onRoll() {
            this.context.router.transitionTo("/dice");
            DiceActions.rollDice(Immutable.fromJS({
                total: 23,
                totalDice: [3, 20],
                roll: [{
                    dice: [{
                        numRolls: 1,
                        modifier: 2,
                        numSides: 4
                    }, {
                        numRolls: 1,
                        modifier: 0,
                        numSides: 20
                    }]
                }]
            }));
            $(this.refs.dialog.getDOMNode()).closeModal();
        }
    }]);
    return DiceDialogComponent;
})(React.Component);

DiceDialogComponent.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = DiceDialogComponent;

},{"../actions/diceactions":2,"../stores/dicestore":8}],4:[function(require,module,exports){
"use strict";

var DiceStore = require("../stores/dicestore");
var DiceItem = require("./diceitem.jsx");
var newid = require("../util/newid");

var DiceComponent = (function (_React$Component) {
    babelHelpers.inherits(DiceComponent, _React$Component);

    function DiceComponent(props) {
        babelHelpers.classCallCheck(this, DiceComponent);

        babelHelpers.get(Object.getPrototypeOf(DiceComponent.prototype), "constructor", this).call(this, props);
    }

    babelHelpers.createClass(DiceComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            DiceStore.instance.subscribe(this.onDiceUpdate.bind(this));
        }
    }, {
        key: "onDiceUpdate",
        value: function onDiceUpdate(value) {
            this.setState(function (_ref) {
                var data = _ref.data;
                return { data: value };
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state) {
                return React.createElement("div", null);
            }

            var containerStyle = {
                padding: 15,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "center"

            };

            var rolls = this.state.data.map(function (m) {
                return React.createElement(DiceItem, { key: newid(), roll: m });
            });
            return React.createElement(
                "div",
                { style: containerStyle },
                rolls
            );
        }
    }]);
    return DiceComponent;
})(React.Component);

module.exports = DiceComponent;

},{"../stores/dicestore":8,"../util/newid":9,"./diceitem.jsx":5}],5:[function(require,module,exports){
"use strict";

var DiceStore = require("../stores/dicestore");

var DiceItem = (function (_React$Component) {
    babelHelpers.inherits(DiceItem, _React$Component);

    function DiceItem(props) {
        babelHelpers.classCallCheck(this, DiceItem);

        babelHelpers.get(Object.getPrototypeOf(DiceItem.prototype), "constructor", this).call(this, props);
        this.state = {
            roll: props.roll
        };
    }

    babelHelpers.createClass(DiceItem, [{
        key: "render",
        value: function render() {
            var diceRollStyle = {
                width: "95%",
                margin: 7,
                padding: 10,
                fontSize: 24,
                position: "relative"
            };

            var nameStyle = {
                position: "absolute",
                fontSize: 16,
                margin: "-10px -10px",
                padding: "3px 10px",
                backgroundColor: "black"
            };

            var rerollStyle = {
                position: "absolute",
                fontSize: 16,
                right: 0,
                marginTop: -10,
                marginRight: 0,
                padding: "3px 10px",
                width: 42
            };

            var labelStyle = {
                width: 42
            };

            var hidden = {
                display: "none"
            };

            var rollJs = this.state.roll.toJS();

            var allRolls = rollJs.roll.map(function (r) {
                var allDice = r.dice.map(function (d) {
                    var dRet = d.numRolls + "d" + d.numSides + (d.modifier != 0 ? " + " + d.modifier : "");
                    if (r.dice.length == 1) {
                        return dRet;
                    }
                    if (!(d.numRolls == 1 && d.modifier == 0)) {
                        dRet = "( " + dRet + " )";
                    }
                    return dRet;
                });
                allDice = allDice.join(" + ");
                return allDice;
            });
            var finalString = allRolls.join(" + ");
            var diceString = rollJs.totalDice.join(" + ") + " = " + rollJs.total;
            return React.createElement(
                "div",
                { className: "z-depth-1", style: diceRollStyle },
                React.createElement(
                    "a",
                    { className: "waves-effect waves-light btn", style: rerollStyle },
                    React.createElement("i", { className: "fa fa-refresh" })
                ),
                allRolls,
                React.createElement("br", null),
                diceString
            );
        }
    }]);
    return DiceItem;
})(React.Component);

module.exports = DiceItem;

},{"../stores/dicestore":8}],6:[function(require,module,exports){
"use strict";

var DiceDialog = require("./DiceDialog.jsx");

var Main = (function (_React$Component) {
  babelHelpers.inherits(Main, _React$Component);

  function Main() {
    babelHelpers.classCallCheck(this, Main);
    babelHelpers.get(Object.getPrototypeOf(Main.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.createClass(Main, [{
    key: "render",
    value: function render() {

      var containerStyle = {
        padding: 0,
        margin: 0
      };

      return React.createElement(
        "div",
        { style: containerStyle },
        React.createElement(
          "nav",
          null,
          React.createElement(
            "div",
            { className: "nav-wrapper" },
            React.createElement(
              "a",
              { ref: "menuButton", "data-activates": "slide-out", className: "brand-logo" },
              " ",
              React.createElement("span", { className: "fa fa-bars" }),
              " Black Labyrinth"
            ),
            React.createElement(
              "ul",
              { className: "right hide-on-med-and-down" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { onClick: this.onRoll.bind(this) },
                  "Roll"
                )
              )
            ),
            React.createElement(
              "ul",
              { id: "slide-out", className: "side-nav" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { onClick: this.goToLink.bind(this, "/") },
                  "Map"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { onClick: this.goToLink.bind(this, "/dice") },
                  "Dice"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { onClick: this.onRoll.bind(this) },
                  "Roll"
                )
              )
            )
          )
        ),
        React.createElement(ReactRouter.RouteHandler, null),
        React.createElement(DiceDialog, { ref: "diceDialog" })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      $(this.refs.menuButton.getDOMNode()).sideNav();
    }
  }, {
    key: "goToLink",
    value: function goToLink(route) {
      this.context.router.transitionTo(route);
      $(this.refs.menuButton.getDOMNode()).sideNav("hide");
    }
  }, {
    key: "onRoll",
    value: function onRoll() {
      this.refs.diceDialog.show();
      $(this.refs.menuButton.getDOMNode()).sideNav("hide");
    }
  }], [{
    key: "childContextTypes",
    value: {
      router: React.PropTypes.object
    },
    enumerable: true
  }, {
    key: "contextTypes",
    value: {
      router: React.PropTypes.func
    },
    enumerable: true
  }]);
  return Main;
})(React.Component);

module.exports = Main;

},{"./DiceDialog.jsx":3}],7:[function(require,module,exports){
'use strict';

var MapComponent = (function (_React$Component) {
    babelHelpers.inherits(MapComponent, _React$Component);

    function MapComponent(props) {
        babelHelpers.classCallCheck(this, MapComponent);

        babelHelpers.get(Object.getPrototypeOf(MapComponent.prototype), 'constructor', this).call(this, props);
        this._updateDimensions = this.updateDimensions.bind(this);
        this.animating = true;
    }

    babelHelpers.createClass(MapComponent, [{
        key: 'updateDimensions',
        value: function updateDimensions() {
            this.setState({ width: $(window).width(), height: $(window).height() });
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            if (this.refs.mapCanvas) {
                var canvas = this.refs.mapCanvas.getDOMNode();
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, 100, 100);
            }
        }
    }, {
        key: 'animate',
        value: function animate() {
            var _this = this;

            var draw = function draw() {
                _this.drawMap();
                if (_this.animating) {
                    window.requestAnimationFrame(_draw);
                }
            };
            var _draw = draw.bind(this);
            window.requestAnimationFrame(_draw);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.updateDimensions();
            this.animate();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('resize', this._updateDimensions);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this._updateDimensions);
            this.animating = false;
        }
    }, {
        key: 'render',
        value: function render() {
            var containerStyle = {
                textAlign: 'center',
                padding: 15
            };

            var canvasStyle = {
                display: 'inline-block'
            };

            var holderStyle = {
                width: this.state.width - 40,
                height: this.state.height - 64 - 40
            };

            return React.createElement(
                'div',
                { style: containerStyle },
                React.createElement(
                    'div',
                    { className: 'z-depth-3', style: holderStyle },
                    React.createElement('canvas', { ref: 'mapCanvas', style: canvasStyle, width: this.state.width - 40, height: this.state.height - 64 - 40 })
                )
            );
        }
    }]);
    return MapComponent;
})(React.Component);

module.exports = MapComponent;

},{}],8:[function(require,module,exports){
'use strict';

var DiceActions = require('../actions/diceactions');

var DiceStore = (function (_Store) {
    babelHelpers.inherits(DiceStore, _Store);

    function DiceStore() {
        babelHelpers.classCallCheck(this, _DiceStore);

        babelHelpers.get(Object.getPrototypeOf(_DiceStore.prototype), 'constructor', this).call(this, Immutable.fromJS([{
            total: 23,
            totalDice: [3, 20],
            roll: [{
                dice: [{
                    numRolls: 1,
                    modifier: 2,
                    numSides: 4
                }, {
                    numRolls: 1,
                    modifier: 0,
                    numSides: 20
                }]
            }]
        }, {
            total: 15,
            totalDice: [4, 5, 6],
            roll: [{
                dice: [{
                    numRolls: 3,
                    modifier: 0,
                    numSides: 6
                }]
            }]
        }]));
        DiceActions.rollDice.subscribe(this.handleRollDice.bind(this));
    }

    babelHelpers.createClass(DiceStore, [{
        key: 'handleRollDice',
        value: function handleRollDice(roll) {
            this.updateState(this.state.push(roll));
        }
    }]);
    var _DiceStore = DiceStore;
    DiceStore = Singleton(DiceStore) || DiceStore;
    return DiceStore;
})(Store);

;

module.exports = DiceStore;

},{"../actions/diceactions":2}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var lastId = 0;

exports['default'] = function () {
    var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'id' : arguments[0];

    lastId++;
    return '' + prefix + lastId;
};

module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvYXBwLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2FjdGlvbnMvZGljZWFjdGlvbnMuanMiLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9ibGFjay1sYWJ5cmludGgvc3JjL2FwcC9jb21wb25lbnRzL0RpY2VEaWFsb2cuanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvY29tcG9uZW50cy9kaWNlLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2NvbXBvbmVudHMvZGljZWl0ZW0uanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvY29tcG9uZW50cy9tYWluLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2NvbXBvbmVudHMvbWFwLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL3N0b3Jlcy9kaWNlc3RvcmUuanMiLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9ibGFjay1sYWJ5cmludGgvc3JjL2FwcC91dGlsL25ld2lkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLFlBQVk7QUFDWCxNQUFJLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM1QyxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMxQyxNQUFJLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMs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QUNYLDRCQUFRLEVBQUUsQ0FBQztBQUNYLDRCQUFRLEVBQUUsQ0FBQztpQkFDZCxFQUNEO0FBQ0ksNEJBQVEsRUFBRSxDQUFDO0FBQ1gsNEJBQVEsRUFBRSxDQUFDO0FBQ1gsNEJBQVEsRUFBRSxFQUFFO2lCQUNmLENBQ0o7YUFDSixDQUNKO1NBQ0osRUFDRDtBQUNJLGlCQUFLLEVBQUUsRUFBRTtBQUNULHFCQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUNsQixnQkFBSSxFQUFFLENBQ0Y7QUFDSSxvQkFBSSxFQUFFLENBQ0Y7QUFDSSw0QkFBUSxFQUFFLENBQUM7QUFDWCw0QkFBUSxFQUFFLENBQUM7QUFDWCw0QkFBUSxFQUFFLENBQUM7aUJBQ2QsQ0FDSjthQUNKLENBQ0o7U0FDSixDQUNKLENBQ0osRUFBRTtBQUNILG1CQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQ2pFOzs2QkExQ0MsU0FBUzs7ZUE0Q0csd0JBQUMsSUFBSSxFQUFFO0FBQ2pCLGdCQUFJLENBQUMsV0FBVyxDQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN4QixDQUFBO1NBQ0o7O3FCQWhEQyxTQUFTO0FBQVQsYUFBUyxHQURkLFNBQVMsQ0FDSixTQUFTLEtBQVQsU0FBUztXQUFULFNBQVM7R0FBUyxLQUFLOztBQWlENUIsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7QUN0RDNCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7cUJBRUEsWUFBc0I7UUFBYixNQUFNLHlEQUFDLElBQUk7O0FBQy9CLFVBQU0sRUFBRSxDQUFDO0FBQ1QsZ0JBQVUsTUFBTSxHQUFHLE1BQU0sQ0FBRztDQUMvQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKCkge1xyXG4gIGxldCBNYWluID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21haW4uanN4Jyk7IC8vIE91ciBjdXN0b20gcmVhY3QgY29tcG9uZW50XHJcbiAgbGV0IE1hcCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYXAuanN4Jyk7XHJcbiAgbGV0IERpY2UgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZGljZS5qc3gnKTtcclxuXHJcbiAgdmFyIHJvdXRlcyA9XHJcbiAgICA8UmVhY3RSb3V0ZXIuUm91dGUgaGFuZGxlcj17TWFpbn0+XHJcbiAgICAgIDxSZWFjdFJvdXRlci5Sb3V0ZSBwYXRoPVwiL1wiIGhhbmRsZXI9e01hcH0vPlxyXG4gICAgICA8UmVhY3RSb3V0ZXIuUm91dGUgcGF0aD1cIi9kaWNlXCIgaGFuZGxlcj17RGljZX0vPlxyXG4gICAgPC9SZWFjdFJvdXRlci5Sb3V0ZT5cclxuXHJcbiAgUmVhY3RSb3V0ZXIucnVuKHJvdXRlcywgUmVhY3RSb3V0ZXIuSGFzaExvY2F0aW9uLCAoUm9vdCkgPT4ge1xyXG4gICAgUmVhY3QucmVuZGVyKDxSb290IC8+LCBkb2N1bWVudC5ib2R5KTtcclxuICB9KTtcclxufSkoKTtcclxuIiwiZXhwb3J0cy5yb2xsRGljZSA9IEFjdGlvbi5jcmVhdGUoKTsiLCJsZXQgRGljZVN0b3JlID0gcmVxdWlyZShcIi4uL3N0b3Jlcy9kaWNlc3RvcmVcIik7XHJcbmxldCBEaWNlQWN0aW9ucyA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL2RpY2VhY3Rpb25zXCIpO1xyXG5cclxuY2xhc3MgRGljZURpYWxvZ0NvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyxjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIERpY2VTdG9yZS5pbnN0YW5jZS5zdWJzY3JpYmUodGhpcy5vbkRpY2VVcGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaWNlVXBkYXRlKHZhbHVlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpe1xyXG4gICAgICAgICQodGhpcy5yZWZzLmRpYWxvZy5nZXRET01Ob2RlKCkpLm9wZW5Nb2RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc3RhbmRhcmRBY3Rpb25zID0gW1xyXG4gICAgICAgICAgICB7IHRleHQ6ICdDYW5jZWwnIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogJ1JvbGwnLCBvblRvdWNoVGFwOiB0aGlzLm9uUm9sbC5iaW5kKHRoaXMpLCByZWY6ICdzdWJtaXQnIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgcmVmPVwiZGlhbG9nXCIgY2xhc3NOYW1lPVwibW9kYWwgYm90dG9tLXNoZWV0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGg0Pk1vZGFsIEhlYWRlcjwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8cD5BIGJ1bmNoIG9mIHRleHQ8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGEgb25DbGljaz17dGhpcy5vblJvbGwuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiIG1vZGFsLWFjdGlvbiBtb2RhbC1jbG9zZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtZ3JlZW4gYnRuLWZsYXRcIj5Sb2xsPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUm9sbCgpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiL2RpY2VcIik7XHJcbiAgICAgICAgRGljZUFjdGlvbnMucm9sbERpY2UoSW1tdXRhYmxlLmZyb21KUyh7XHJcbiAgICAgICAgICAgIHRvdGFsOiAyMyxcclxuICAgICAgICAgICAgdG90YWxEaWNlOiBbMywyMF0sXHJcbiAgICAgICAgICAgIHJvbGw6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWNlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJvbGxzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1TaWRlczogNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Sb2xsczogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtU2lkZXM6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgJCh0aGlzLnJlZnMuZGlhbG9nLmdldERPTU5vZGUoKSkuY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5EaWNlRGlhbG9nQ29tcG9uZW50LmNvbnRleHRUeXBlcyA9IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWNlRGlhbG9nQ29tcG9uZW50OyIsImxldCBEaWNlU3RvcmUgPSByZXF1aXJlKFwiLi4vc3RvcmVzL2RpY2VzdG9yZVwiKVxyXG5sZXQgRGljZUl0ZW0gPSByZXF1aXJlKFwiLi9kaWNlaXRlbS5qc3hcIilcclxubGV0IG5ld2lkID0gcmVxdWlyZSgnLi4vdXRpbC9uZXdpZCcpO1xyXG5cclxuY2xhc3MgRGljZUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBEaWNlU3RvcmUuaW5zdGFuY2Uuc3Vic2NyaWJlKHRoaXMub25EaWNlVXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGljZVVwZGF0ZSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoe2RhdGF9KSA9PiAoXHJcbiAgICAgICAgICAgIHtkYXRhOiB2YWx1ZX1cclxuICAgICAgICApKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUpe3JldHVybiAoPGRpdj48L2Rpdj4pO31cclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lclN0eWxlID0ge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxNSxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcclxuICAgICAgICAgICAgZmxleFdyYXA6IFwibm93cmFwXCIsXHJcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCJcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHJvbGxzID0gdGhpcy5zdGF0ZS5kYXRhLm1hcCgobSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPERpY2VJdGVtIGtleT17bmV3aWQoKX0gcm9sbD17bX0vPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtjb250YWluZXJTdHlsZX0+XHJcbiAgICAgICAgICAgIHtyb2xsc31cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWNlQ29tcG9uZW50OyIsImxldCBEaWNlU3RvcmUgPSByZXF1aXJlKFwiLi4vc3RvcmVzL2RpY2VzdG9yZVwiKVxyXG5cclxuY2xhc3MgRGljZUl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcm9sbDogcHJvcHMucm9sbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGRpY2VSb2xsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjk1JVwiLFxyXG4gICAgICAgICAgICBtYXJnaW46IDcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogMjQsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICBtYXJnaW46IFwiLTEwcHggLTEwcHhcIixcclxuICAgICAgICAgICAgcGFkZGluZzogXCIzcHggMTBweFwiLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlcm9sbFN0eWxlID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjpcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAxNixcclxuICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogLTEwLFxyXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogMCxcclxuICAgICAgICAgICAgcGFkZGluZzogXCIzcHggMTBweFwiLFxyXG4gICAgICAgICAgICB3aWR0aDogNDJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYWJlbFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogNDJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoaWRkZW4gPSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcm9sbEpzID0gdGhpcy5zdGF0ZS5yb2xsLnRvSlMoKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFJvbGxzID0gcm9sbEpzLnJvbGwubWFwKGZ1bmN0aW9uKHIpe1xyXG4gICAgICAgICAgICB2YXIgYWxsRGljZSA9IHIuZGljZS5tYXAoZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZFJldCA9IGQubnVtUm9sbHMrXCJkXCIrZC5udW1TaWRlcyArKGQubW9kaWZpZXIhPTA/XCIgKyBcIitkLm1vZGlmaWVyOlwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoci5kaWNlLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZFJldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCEoZC5udW1Sb2xscyA9PSAxICYmIGQubW9kaWZpZXIgPT0gMCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRSZXQgPSBcIiggXCIrZFJldCtcIiApXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZFJldDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFsbERpY2UgPSBhbGxEaWNlLmpvaW4oXCIgKyBcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEaWNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdmFyIGZpbmFsU3RyaW5nID0gYWxsUm9sbHMuam9pbihcIiArIFwiKTtcclxuICAgICAgICB2YXIgZGljZVN0cmluZyA9IHJvbGxKcy50b3RhbERpY2Uuam9pbihcIiArIFwiKStcIiA9IFwiK3JvbGxKcy50b3RhbDtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ6LWRlcHRoLTFcIiBzdHlsZT17ZGljZVJvbGxTdHlsZX0+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBzdHlsZT17cmVyb2xsU3R5bGV9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXJlZnJlc2hcIj48L2k+PC9hPlxyXG4gICAgICAgICAgICB7YWxsUm9sbHN9PGJyLz5cclxuICAgICAgICAgICAge2RpY2VTdHJpbmd9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGljZUl0ZW07IiwibGV0IERpY2VEaWFsb2cgPSByZXF1aXJlKCcuL0RpY2VEaWFsb2cuanN4Jyk7XHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7XHJcbiAgICByb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XHJcbiAgICByb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lclN0eWxlID0ge1xyXG4gICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICBtYXJnaW46IDBcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17Y29udGFpbmVyU3R5bGV9PlxyXG4gICAgICAgIDxuYXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgIDxhIHJlZj1cIm1lbnVCdXR0b25cIiBkYXRhLWFjdGl2YXRlcz1cInNsaWRlLW91dFwiIGNsYXNzTmFtZT1cImJyYW5kLWxvZ29cIj4mbmJzcDs8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1iYXJzXCI+PC9zcGFuPiBCbGFjayBMYWJ5cmludGg8L2E+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxyXG4gICAgICAgICAgICAgIDxsaT48YSBvbkNsaWNrPXt0aGlzLm9uUm9sbC5iaW5kKHRoaXMpfT5Sb2xsPC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDx1bCBpZD1cInNsaWRlLW91dFwiIGNsYXNzTmFtZT1cInNpZGUtbmF2XCI+XHJcbiAgICAgICAgICAgICAgPGxpPjxhIG9uQ2xpY2s9e3RoaXMuZ29Ub0xpbmsuYmluZCh0aGlzLFwiL1wiKX0+TWFwPC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgPGxpPjxhIG9uQ2xpY2s9e3RoaXMuZ29Ub0xpbmsuYmluZCh0aGlzLFwiL2RpY2VcIil9PkRpY2U8L2E+PC9saT5cclxuICAgICAgICAgICAgICA8bGk+PGEgb25DbGljaz17dGhpcy5vblJvbGwuYmluZCh0aGlzKX0+Um9sbDwvYT48L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgPFJlYWN0Um91dGVyLlJvdXRlSGFuZGxlci8+XHJcbiAgICAgICAgPERpY2VEaWFsb2cgcmVmPVwiZGljZURpYWxvZ1wiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgJCh0aGlzLnJlZnMubWVudUJ1dHRvbi5nZXRET01Ob2RlKCkpLnNpZGVOYXYoKTtcclxuICB9XHJcblxyXG4gIGdvVG9MaW5rKHJvdXRlKXtcclxuICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKHJvdXRlKTtcclxuICAgICQodGhpcy5yZWZzLm1lbnVCdXR0b24uZ2V0RE9NTm9kZSgpKS5zaWRlTmF2KFwiaGlkZVwiKTtcclxuICB9XHJcblxyXG4gIG9uUm9sbCgpe1xyXG4gICAgdGhpcy5yZWZzLmRpY2VEaWFsb2cuc2hvdygpO1xyXG4gICAgJCh0aGlzLnJlZnMubWVudUJ1dHRvbi5nZXRET01Ob2RlKCkpLnNpZGVOYXYoXCJoaWRlXCIpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xyXG4iLCJjbGFzcyBNYXBDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRGltZW5zaW9ucyA9IHRoaXMudXBkYXRlRGltZW5zaW9ucy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEaW1lbnNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3dpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCl9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TWFwKCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVmcy5tYXBDYW52YXMpe1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5yZWZzLm1hcENhbnZhcy5nZXRET01Ob2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLDAsMTAwLDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCl7XHJcbiAgICAgICAgdmFyIGRyYXcgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmFuaW1hdGluZyl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9kcmF3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX2RyYXcgPSBkcmF3LmJpbmQodGhpcyk7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfZHJhdyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3VwZGF0ZURpbWVuc2lvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3VwZGF0ZURpbWVuc2lvbnMpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjb250YWluZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAxNVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhbnZhc1N0eWxlID0ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaG9sZGVyU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN0YXRlLndpZHRoLTQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaGVpZ2h0LTY0LTQwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e2NvbnRhaW5lclN0eWxlfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LWRlcHRoLTNcIiBzdHlsZT17aG9sZGVyU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPGNhbnZhcyByZWY9XCJtYXBDYW52YXNcIiBzdHlsZT17Y2FudmFzU3R5bGV9IHdpZHRoPXt0aGlzLnN0YXRlLndpZHRoLTQwfSBoZWlnaHQ9e3RoaXMuc3RhdGUuaGVpZ2h0LTY0LTQwfT48L2NhbnZhcz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWFwQ29tcG9uZW50OyIsImxldCBEaWNlQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvZGljZWFjdGlvbnMnKTtcclxuXHJcbkBTaW5nbGV0b25cclxuY2xhc3MgRGljZVN0b3JlIGV4dGVuZHMgU3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoSW1tdXRhYmxlLmZyb21KUyhcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAyMyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbERpY2U6IFszLDIwXSxcclxuICAgICAgICAgICAgICAgICAgICByb2xsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY2U6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJvbGxzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtU2lkZXM6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUm9sbHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1TaWRlczogMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbERpY2U6IFs0LDUsNl0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWNlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Sb2xsczogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVNpZGVzOiA2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgRGljZUFjdGlvbnMucm9sbERpY2Uuc3Vic2NyaWJlKHRoaXMuaGFuZGxlUm9sbERpY2UuYmluZCh0aGlzKSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVSb2xsRGljZShyb2xsKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5wdXNoKHJvbGwpXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWNlU3RvcmU7IiwibGV0IGxhc3RJZCA9IDA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcmVmaXg9J2lkJykge1xyXG4gICAgbGFzdElkKys7XHJcbiAgICByZXR1cm4gYCR7cHJlZml4fSR7bGFzdElkfWA7XHJcbn0iXX0=
