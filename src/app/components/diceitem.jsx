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
            width: 600,
            margin: 7,
            padding: 10,
            fontSize: 24,
            position: "absolute"
        }

        let nameStyle = {
            position:"absolute",
            fontSize: 16,
            margin: "-10px -10px",
            padding: "3px 10px",
            backgroundColor: "black"
        }

        let rerollStyle = {
            position:"absolute",
            fontSize: 16,
            right: 0,
            marginTop: -10,
            marginRight: 0,
            padding: "3px 10px"
        }

        let hidden = {
            display: "none"
        }

        var rollJs = this.state.roll.toJS();

        var allRolls = rollJs.roll.map(function(r){
            var allDice = r.dice.map(function(d){
                var dRet = d.numRolls+"d"+d.numSides +(d.modifier!=0?" + "+d.modifier:"");
                if(r.dice.length == 1){
                    return dRet;
                }
                if(!(d.numRolls == 1 && d.modifier == 0)){
                    dRet = "( "+dRet+" )";
                }
                return dRet;
            });
            allDice = allDice.join(" + ");
            return allDice;
        })
        var finalString = allRolls.join(" + ");
        var diceString = rollJs.totalDice.join(" + ")+" = "+rollJs.total;
        return <Paper zDepth={1} style={diceRollStyle}>
            <div style={rollJs.name!=''?nameStyle:hidden}>{rollJs.name}</div>
            <div style={rerollStyle}>Reroll</div>
            {allRolls}<br/><br/>
            {diceString}
        </Paper>
    }
}

module.exports = DiceItem;