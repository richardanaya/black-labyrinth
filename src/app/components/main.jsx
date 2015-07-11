/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let Chat = require('./chat.jsx'); // Our custom react component


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
      textAlign: 'center',
      paddingTop: '200px'
    };

    let standardActions = [
      { text: 'Okay' }
    ];

    return (
      <div style={containerStyle}>
        <Chat/>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;
