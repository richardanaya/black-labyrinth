let DiceActions = require('../actions/diceactions');
let Immutable = require('immutable');
var Rx = require('rx');
let {Action,Store,Singleton} = require("staticflux");

@Singleton
class DiceStore extends Store {
    constructor() {
        super(Immutable.fromJS(
            [
                {
                    name: "",
                    rollType: {
                        type: "sum"
                    },
                    total: 120,
                    roll: [
                        {
                            modifier: 2,
                            dice: [
                                {
                                    numRolls: 1,
                                    modifier: 2,
                                    numSides: 4
                                },
                                {
                                    numRolls: 1,
                                    modifier: 0,
                                    numSides: 20
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Attack",
                    rollType: {
                        type: "sum"
                    },
                    total: 20,
                    roll: [
                        {
                            modifier: 2,
                            dice: [
                                {
                                    numRolls: 3,
                                    modifier: 0,
                                    numSides: 6
                                }
                            ]
                        }
                    ]
                }
            ]
        ));
        DiceActions.rollDice.subscribe(this.handleRollDice.bind(this))
    }

    handleRollDice(roll) {
        this.updateState(
            this.state.push(roll)
        )
    }
};

module.exports = DiceStore;