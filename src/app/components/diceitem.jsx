let React = require('react');
let {Paper,TextField} = require('material-ui');
let Immutable = require('immutable');
let DiceStore = require("../stores/dicestore")

class DiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: props.roll
        }
    }

    render() {
        let diceRollStyle = {
            width: 600
        }

        return <Paper zDepth={1} style={diceRollStyle}>
            Roll: <p>{this.state.roll.get("name")}</p>
        </Paper>
    }
}

module.exports = DiceItem;