/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let FlatButton = mui.FlatButton;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let {RouteHandler} = require('react-router');
let DiceDialog = require("./dicedialog.jsx");

let menuItems = [
  { route: '/', text: 'Map' },
  { route: '/dice', text: 'Dice' },
]


let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.object
  },

  contextTypes : {
    router: React.PropTypes.func
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render() {

    let containerStyle = {
      padding: 0,
      margin: 0
    };

    let standardActions = [
      { text: 'Okay' }
    ];

    return (

      <div style={containerStyle}>
        <AppBar title="Black Labyrinth"
                onLeftIconButtonTouchTap={()=>this.refs.leftNav.toggle()}
                iconElementRight={<FlatButton onClick={this.onRoll} label="Roll"/>}
                />
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems}
                 selectedIndex={this.getSelectedIndex()}
                 onChange={this.onLeftNavChange} />
        <DiceDialog ref="diceDialog" />
        <RouteHandler/>
      </div>
    );
  },
  onRoll(){
      this.refs.diceDialog.show();
  },
  getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;
