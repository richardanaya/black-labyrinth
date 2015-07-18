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

},{"../actions/diceactions":2,"../stores/dicestore":9}],4:[function(require,module,exports){
"use strict";

var DiceStore = require("../stores/dicestore");
var DiceItem = require("./diceitem.jsx");
var newid = require("../newid");

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

},{"../newid":8,"../stores/dicestore":9,"./diceitem.jsx":5}],5:[function(require,module,exports){
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

},{"../stores/dicestore":9}],6:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../actions/diceactions":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvYXBwLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2FjdGlvbnMvZGljZWFjdGlvbnMuanMiLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9ibGFjay1sYWJ5cmludGgvc3JjL2FwcC9jb21wb25lbnRzL0RpY2VEaWFsb2cuanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvY29tcG9uZW50cy9kaWNlLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2NvbXBvbmVudHMvZGljZWl0ZW0uanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvY29tcG9uZW50cy9tYWluLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL2NvbXBvbmVudHMvbWFwLmpzeCIsImM6L1VzZXJzL1JpY2hhcmQvc291cmNlL2JsYWNrLWxhYnlyaW50aC9zcmMvYXBwL25ld2lkLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvYmxhY2stbGFieXJpbnRoL3NyYy9hcHAvc3RvcmVzL2RpY2VzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQ0FBQyxZQUFZO0FBQ1gsTUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDNUMsTUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDMUMsTUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7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QUFDSSxpQkFBSyxFQUFFLEVBQUU7QUFDVCxxQkFBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQztBQUNqQixnQkFBSSxFQUFFLENBQ0Y7QUFDSSxvQkFBSSxFQUFFLENBQ0Y7QUFDSSw0QkFBUSxFQUFFLENBQUM7QUFDWCw0QkFBUSxFQUFFLENBQUM7QUFDWCw0QkFBUSxFQUFFLENBQUM7aUJBQ2QsRUFDRDtBQUNJLDRCQUFRLEVBQUUsQ0FBQztBQUNYLDRCQUFRLEVBQUUsQ0FBQztBQUNYLDRCQUFRLEVBQUUsRUFBRTtpQkFDZixDQUNKO2FBQ0osQ0FDSjtTQUNKLEVBQ0Q7QUFDSSxpQkFBSyxFQUFFLEVBQUU7QUFDVCxxQkFBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFDbEIsZ0JBQUksRUFBRSxDQUNGO0FBQ0ksb0JBQUksRUFBRSxDQUNGO0FBQ0ksNEJBQVEsRUFBRSxDQUFDO0FBQ1gsNEJBQVEsRUFBRSxDQUFDO0FBQ1gsNEJBQVEsRUFBRSxDQUFDO2lCQUNkLENBQ0o7YUFDSixDQUNKO1NBQ0osQ0FDSixDQUNKLEVBQUU7QUFDSCxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUNqRTs7NkJBMUNDLFNBQVM7O2VBNENHLHdCQUFDLElBQUksRUFBRTtBQUNqQixnQkFBSSxDQUFDLFdBQVcsQ0FDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDeEIsQ0FBQTtTQUNKOztxQkFoREMsU0FBUztBQUFULGFBQVMsR0FEZCxTQUFTLENBQ0osU0FBUyxLQUFULFNBQVM7V0FBVCxTQUFTO0dBQVMsS0FBSzs7QUFpRDVCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcclxuICBsZXQgTWFpbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYWluLmpzeCcpOyAvLyBPdXIgY3VzdG9tIHJlYWN0IGNvbXBvbmVudFxyXG4gIGxldCBNYXAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFwLmpzeCcpO1xyXG4gIGxldCBEaWNlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2RpY2UuanN4Jyk7XHJcblxyXG4gIHZhciByb3V0ZXMgPVxyXG4gICAgPFJlYWN0Um91dGVyLlJvdXRlIGhhbmRsZXI9e01haW59PlxyXG4gICAgICA8UmVhY3RSb3V0ZXIuUm91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtNYXB9Lz5cclxuICAgICAgPFJlYWN0Um91dGVyLlJvdXRlIHBhdGg9XCIvZGljZVwiIGhhbmRsZXI9e0RpY2V9Lz5cclxuICAgIDwvUmVhY3RSb3V0ZXIuUm91dGU+XHJcblxyXG4gIFJlYWN0Um91dGVyLnJ1bihyb3V0ZXMsIFJlYWN0Um91dGVyLkhhc2hMb2NhdGlvbiwgKFJvb3QpID0+IHtcclxuICAgIFJlYWN0LnJlbmRlcig8Um9vdCAvPiwgZG9jdW1lbnQuYm9keSk7XHJcbiAgfSk7XHJcbn0pKCk7XHJcbiIsImV4cG9ydHMucm9sbERpY2UgPSBBY3Rpb24uY3JlYXRlKCk7IiwibGV0IERpY2VTdG9yZSA9IHJlcXVpcmUoXCIuLi9zdG9yZXMvZGljZXN0b3JlXCIpO1xyXG5sZXQgRGljZUFjdGlvbnMgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9kaWNlYWN0aW9uc1wiKTtcclxuXHJcbmNsYXNzIERpY2VEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBEaWNlU3RvcmUuaW5zdGFuY2Uuc3Vic2NyaWJlKHRoaXMub25EaWNlVXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGljZVVwZGF0ZSh2YWx1ZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKXtcclxuICAgICAgICAkKHRoaXMucmVmcy5kaWFsb2cuZ2V0RE9NTm9kZSgpKS5vcGVuTW9kYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YW5kYXJkQWN0aW9ucyA9IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiAnQ2FuY2VsJyB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6ICdSb2xsJywgb25Ub3VjaFRhcDogdGhpcy5vblJvbGwuYmluZCh0aGlzKSwgcmVmOiAnc3VibWl0JyB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHJlZj1cImRpYWxvZ1wiIGNsYXNzTmFtZT1cIm1vZGFsIGJvdHRvbS1zaGVldFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxoND5Nb2RhbCBIZWFkZXI8L2g0PlxyXG4gICAgICAgICAgICAgICAgPHA+QSBidW5jaCBvZiB0ZXh0PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMub25Sb2xsLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cIiBtb2RhbC1hY3Rpb24gbW9kYWwtY2xvc2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWdyZWVuIGJ0bi1mbGF0XCI+Um9sbDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJvbGwoKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcIi9kaWNlXCIpO1xyXG4gICAgICAgIERpY2VBY3Rpb25zLnJvbGxEaWNlKEltbXV0YWJsZS5mcm9tSlMoe1xyXG4gICAgICAgICAgICB0b3RhbDogMjMsXHJcbiAgICAgICAgICAgIHRvdGFsRGljZTogWzMsMjBdLFxyXG4gICAgICAgICAgICByb2xsOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Sb2xsczogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtU2lkZXM6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUm9sbHM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVNpZGVzOiAyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgICQodGhpcy5yZWZzLmRpYWxvZy5nZXRET01Ob2RlKCkpLmNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxufVxyXG5cclxuRGljZURpYWxvZ0NvbXBvbmVudC5jb250ZXh0VHlwZXMgPSB7XHJcbiAgICByb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGljZURpYWxvZ0NvbXBvbmVudDsiLCJsZXQgRGljZVN0b3JlID0gcmVxdWlyZShcIi4uL3N0b3Jlcy9kaWNlc3RvcmVcIilcclxubGV0IERpY2VJdGVtID0gcmVxdWlyZShcIi4vZGljZWl0ZW0uanN4XCIpXHJcbmxldCBuZXdpZCA9IHJlcXVpcmUoJy4uL25ld2lkJyk7XHJcblxyXG5jbGFzcyBEaWNlQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIERpY2VTdG9yZS5pbnN0YW5jZS5zdWJzY3JpYmUodGhpcy5vbkRpY2VVcGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaWNlVXBkYXRlKHZhbHVlKXtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCh7ZGF0YX0pID0+IChcclxuICAgICAgICAgICAge2RhdGE6IHZhbHVlfVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZighdGhpcy5zdGF0ZSl7cmV0dXJuICg8ZGl2PjwvZGl2Pik7fVxyXG5cclxuICAgICAgICBsZXQgY29udGFpbmVyU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE1LFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxyXG4gICAgICAgICAgICBmbGV4V3JhcDogXCJub3dyYXBcIixcclxuICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIlxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgcm9sbHMgPSB0aGlzLnN0YXRlLmRhdGEubWFwKChtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RGljZUl0ZW0ga2V5PXtuZXdpZCgpfSByb2xsPXttfS8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e2NvbnRhaW5lclN0eWxlfT5cclxuICAgICAgICAgICAge3JvbGxzfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpY2VDb21wb25lbnQ7IiwibGV0IERpY2VTdG9yZSA9IHJlcXVpcmUoXCIuLi9zdG9yZXMvZGljZXN0b3JlXCIpXHJcblxyXG5jbGFzcyBEaWNlSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICByb2xsOiBwcm9wcy5yb2xsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgZGljZVJvbGxTdHlsZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IFwiOTUlXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbjogNyxcclxuICAgICAgICAgICAgcGFkZGluZzogMTAsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcclxuICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgIG1hcmdpbjogXCItMTBweCAtMTBweFwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjNweCAxMHB4XCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVyb2xsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAtMTAsXHJcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAwLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjNweCAxMHB4XCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0MlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhYmVsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhpZGRlbiA9IHtcclxuICAgICAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByb2xsSnMgPSB0aGlzLnN0YXRlLnJvbGwudG9KUygpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUm9sbHMgPSByb2xsSnMucm9sbC5tYXAoZnVuY3Rpb24ocil7XHJcbiAgICAgICAgICAgIHZhciBhbGxEaWNlID0gci5kaWNlLm1hcChmdW5jdGlvbihkKXtcclxuICAgICAgICAgICAgICAgIHZhciBkUmV0ID0gZC5udW1Sb2xscytcImRcIitkLm51bVNpZGVzICsoZC5tb2RpZmllciE9MD9cIiArIFwiK2QubW9kaWZpZXI6XCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZihyLmRpY2UubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkUmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoIShkLm51bVJvbGxzID09IDEgJiYgZC5tb2RpZmllciA9PSAwKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZFJldCA9IFwiKCBcIitkUmV0K1wiIClcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkUmV0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWxsRGljZSA9IGFsbERpY2Uuam9pbihcIiArIFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbERpY2U7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB2YXIgZmluYWxTdHJpbmcgPSBhbGxSb2xscy5qb2luKFwiICsgXCIpO1xyXG4gICAgICAgIHZhciBkaWNlU3RyaW5nID0gcm9sbEpzLnRvdGFsRGljZS5qb2luKFwiICsgXCIpK1wiID0gXCIrcm9sbEpzLnRvdGFsO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInotZGVwdGgtMVwiIHN0eWxlPXtkaWNlUm9sbFN0eWxlfT5cclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIHN0eWxlPXtyZXJvbGxTdHlsZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcmVmcmVzaFwiPjwvaT48L2E+XHJcbiAgICAgICAgICAgIHthbGxSb2xsc308YnIvPlxyXG4gICAgICAgICAgICB7ZGljZVN0cmluZ31cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWNlSXRlbTsiLCJsZXQgRGljZURpYWxvZyA9IHJlcXVpcmUoJy4vRGljZURpYWxvZy5qc3gnKTtcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyU3R5bGUgPSB7XHJcbiAgICAgIHBhZGRpbmc6IDAsXHJcbiAgICAgIG1hcmdpbjogMFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXtjb250YWluZXJTdHlsZX0+XHJcbiAgICAgICAgPG5hdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgPGEgcmVmPVwibWVudUJ1dHRvblwiIGRhdGEtYWN0aXZhdGVzPVwic2xpZGUtb3V0XCIgY2xhc3NOYW1lPVwiYnJhbmQtbG9nb1wiPiZuYnNwOzxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWJhcnNcIj48L3NwYW4+IEJsYWNrIExhYnlyaW50aDwvYT5cclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XHJcbiAgICAgICAgICAgICAgPGxpPjxhIG9uQ2xpY2s9e3RoaXMub25Sb2xsLmJpbmQodGhpcyl9PlJvbGw8L2E+PC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPHVsIGlkPVwic2xpZGUtb3V0XCIgY2xhc3NOYW1lPVwic2lkZS1uYXZcIj5cclxuICAgICAgICAgICAgICA8bGk+PGEgb25DbGljaz17dGhpcy5nb1RvTGluay5iaW5kKHRoaXMsXCIvXCIpfT5NYXA8L2E+PC9saT5cclxuICAgICAgICAgICAgICA8bGk+PGEgb25DbGljaz17dGhpcy5nb1RvTGluay5iaW5kKHRoaXMsXCIvZGljZVwiKX0+RGljZTwvYT48L2xpPlxyXG4gICAgICAgICAgICAgIDxsaT48YSBvbkNsaWNrPXt0aGlzLm9uUm9sbC5iaW5kKHRoaXMpfT5Sb2xsPC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25hdj5cclxuICAgICAgICA8UmVhY3RSb3V0ZXIuUm91dGVIYW5kbGVyLz5cclxuICAgICAgICA8RGljZURpYWxvZyByZWY9XCJkaWNlRGlhbG9nXCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAkKHRoaXMucmVmcy5tZW51QnV0dG9uLmdldERPTU5vZGUoKSkuc2lkZU5hdigpO1xyXG4gIH1cclxuXHJcbiAgZ29Ub0xpbmsocm91dGUpe1xyXG4gICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8ocm91dGUpO1xyXG4gICAgJCh0aGlzLnJlZnMubWVudUJ1dHRvbi5nZXRET01Ob2RlKCkpLnNpZGVOYXYoXCJoaWRlXCIpO1xyXG4gIH1cclxuXHJcbiAgb25Sb2xsKCl7XHJcbiAgICB0aGlzLnJlZnMuZGljZURpYWxvZy5zaG93KCk7XHJcbiAgICAkKHRoaXMucmVmcy5tZW51QnV0dG9uLmdldERPTU5vZGUoKSkuc2lkZU5hdihcImhpZGVcIik7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1haW47XHJcbiIsImNsYXNzIE1hcENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVEaW1lbnNpb25zID0gdGhpcy51cGRhdGVEaW1lbnNpb25zLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURpbWVuc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGg6ICQod2luZG93KS53aWR0aCgpLCBoZWlnaHQ6ICQod2luZG93KS5oZWlnaHQoKX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNYXAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZWZzLm1hcENhbnZhcyl7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSB0aGlzLnJlZnMubWFwQ2FudmFzLmdldERPTU5vZGUoKTtcclxuICAgICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCwxMDAsMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoKXtcclxuICAgICAgICB2YXIgZHJhdyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0aW5nKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX2RyYXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfZHJhdyA9IGRyYXcuYmluZCh0aGlzKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9kcmF3KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fdXBkYXRlRGltZW5zaW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fdXBkYXRlRGltZW5zaW9ucyk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lclN0eWxlID0ge1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FudmFzU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBob2xkZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUud2lkdGgtNDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5oZWlnaHQtNjQtNDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17Y29udGFpbmVyU3R5bGV9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInotZGVwdGgtM1wiIHN0eWxlPXtob2xkZXJTdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHJlZj1cIm1hcENhbnZhc1wiIHN0eWxlPXtjYW52YXNTdHlsZX0gd2lkdGg9e3RoaXMuc3RhdGUud2lkdGgtNDB9IGhlaWdodD17dGhpcy5zdGF0ZS5oZWlnaHQtNjQtNDB9PjwvY2FudmFzPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNYXBDb21wb25lbnQ7IiwibGV0IGxhc3RJZCA9IDA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcmVmaXg9J2lkJykge1xyXG4gICAgbGFzdElkKys7XHJcbiAgICByZXR1cm4gYCR7cHJlZml4fSR7bGFzdElkfWA7XHJcbn0iLCJsZXQgRGljZUFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2RpY2VhY3Rpb25zJyk7XHJcblxyXG5AU2luZ2xldG9uXHJcbmNsYXNzIERpY2VTdG9yZSBleHRlbmRzIFN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEltbXV0YWJsZS5mcm9tSlMoXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxEaWNlOiBbMywyMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWNlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Sb2xsczogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVNpZGVzOiA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJvbGxzOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtU2lkZXM6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxEaWNlOiBbNCw1LDZdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGw6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGljZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtUm9sbHM6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1TaWRlczogNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIERpY2VBY3Rpb25zLnJvbGxEaWNlLnN1YnNjcmliZSh0aGlzLmhhbmRsZVJvbGxEaWNlLmJpbmQodGhpcykpXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUm9sbERpY2Uocm9sbCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUucHVzaChyb2xsKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGljZVN0b3JlOyJdfQ==
