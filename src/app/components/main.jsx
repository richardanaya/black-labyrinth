let DiceDialog = require('./DiceDialog.jsx');

class Main extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  render() {

    let containerStyle = {
      padding: 0,
      margin: 0
    };

    return (
      <div style={containerStyle}>
        <nav>
          <div className="nav-wrapper">
            <a ref="menuButton" data-activates="slide-out" className="brand-logo">&nbsp;<span className="fa fa-bars"></span> Black Labyrinth</a>
            <ul className="right hide-on-med-and-down">
              <li><a onClick={this.onRoll.bind(this)}>Roll</a></li>
            </ul>
            <ul id="slide-out" className="side-nav">
              <li><a onClick={this.goToLink.bind(this,"/")}>Map</a></li>
              <li><a onClick={this.goToLink.bind(this,"/dice")}>Dice</a></li>
              <li><a onClick={this.onRoll.bind(this)}>Roll</a></li>
            </ul>
          </div>
        </nav>
        <ReactRouter.RouteHandler/>
        <DiceDialog ref="diceDialog" />
      </div>
    );
  }

  componentDidMount() {
    $(this.refs.menuButton.getDOMNode()).sideNav();
  }

  goToLink(route){
    this.context.router.transitionTo(route);
    $(this.refs.menuButton.getDOMNode()).sideNav("hide");
  }

  onRoll(){
    this.refs.diceDialog.show();
    $(this.refs.menuButton.getDOMNode()).sideNav("hide");
  }
}

module.exports = Main;
