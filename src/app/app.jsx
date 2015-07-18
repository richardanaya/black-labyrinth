(function () {
  let Main = require('./components/main.jsx'); // Our custom react component
  let Map = require('./components/map.jsx');
  let Dice = require('./components/dice.jsx');

  var routes =
    <ReactRouter.Route handler={Main}>
      <ReactRouter.Route path="/" handler={Map}/>
      <ReactRouter.Route path="/dice" handler={Dice}/>
    </ReactRouter.Route>

  ReactRouter.run(routes, ReactRouter.HashLocation, (Root) => {
    React.render(<Root />, document.body);
  });
})();
