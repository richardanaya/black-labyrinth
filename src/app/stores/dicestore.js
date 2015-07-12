let DiceActions = require('../actions/diceactions');
let Immutable = require('immutable');
var Rx = require('rx');
let {Action,Store,Singleton} = require("staticflux");

@Singleton
class DiceStore extends Store {
    constructor() {
        super(Immutable.Map({
            rolls : Immutable.List.of("hey","wassup")
        }));
        DiceActions.rollDice.subscribe(this.handleRollDice.bind(this))
    }

    handleRollDice(roll) {
        this.updateState(
            this.state.updateIn(['rolls'], list => list.push(roll))
        )
    }
};

module.exports = DiceStore;