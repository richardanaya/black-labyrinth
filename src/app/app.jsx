(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Main = require('./components/main.jsx'); // Our custom react component
  var Router = require('react-router');
  var Root = Router.Root;
  var Route = Router.Route;
  let Map = require('./components/map.jsx');
  let Dice = require('./components/dice.jsx');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the document body.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  var routes = (
    <Route handler={Main}>
      <Route path="/" handler={Map}/>
      <Route path="/dice" handler={Dice}/>
    </Route>
  );

  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root />, document.body);
  });
})();
