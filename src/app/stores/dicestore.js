let DiceActions = require('../actions/diceactions');

@Singleton
class DiceStore extends Store {
    constructor() {
        super(Immutable.fromJS(
            [
                {
                    total: 23,
                    totalDice: [3,20],
                    roll: [
                        {
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
                    total: 15,
                    totalDice: [4,5,6],
                    roll: [
                        {
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