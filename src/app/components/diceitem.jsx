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
            fontSize: 24
        }

        let nameStyle = {
            position:"absolute",
            fontSize: 16
        }

        var rollJs = this.state.roll.toJS();

        var allRolls = rollJs.roll.map(function(r){
            var allDice = r.dice.map(function(d){
                var dRet = (d.numRolls!=1?d.numRolls+" x ":"")+"d"+d.numSides +(d.modifier!=0?" + "+d.modifier:"");
                if(r.dice.length == 1){
                    return dRet;
                }
                if(!(d.numRolls == 1 && d.modifier == 0)){
                    dRet = "( "+dRet+" )";
                }
                return dRet;
            });
            allDice = allDice.join(" + ");
            if(r.modifier != 0){
                allDice = "[ "+allDice+" ] + "+r.modifier
            }
            return allDice;
        })
        var finalString = allRolls.join(" + ");
        var diceString = rollJs.totalDice.join(" + ")+" = "+rollJs.total;
        return <Paper zDepth={1} style={diceRollStyle}>
            <div style={nameStyle}>{rollJs.name}</div>
            {allRolls}<br/><br/>
            {diceString}
        </Paper>
    }
}

module.exports = DiceItem;