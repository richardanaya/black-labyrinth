/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
var {RouteHandler} = require('react-router');

let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
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
    };

    let standardActions = [
      { text: 'Okay' }
    ];

    return (
      <div style={containerStyle}>
        <RouteHandler/>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;
