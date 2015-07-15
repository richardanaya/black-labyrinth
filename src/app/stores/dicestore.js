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
                    total: 23,
                    totalDice: [3,20],
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
                    total: 15,
                    totalDice: [4,5,6],
                    roll: [
                        {
                            modifier: 0,
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