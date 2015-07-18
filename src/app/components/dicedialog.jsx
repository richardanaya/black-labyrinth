let DiceStore = require("../stores/dicestore");
let DiceActions = require("../actions/diceactions");

class DiceDialogComponent extends React.Component {
    constructor(props,context) {
        super(props);
        this.state = {
        };
        this.context = context;
    }

    componentDidMount() {
        DiceStore.instance.subscribe(this.onDiceUpdate.bind(this));
    }

    onDiceUpdate(value){

    }

    show(){
        $(this.refs.dialog.getDOMNode()).openModal();
    }

    render() {
        let standardActions = [
            { text: 'Cancel' },
            { text: 'Roll', onTouchTap: this.onRoll.bind(this), ref: 'submit' }
        ];

        return (
        <div ref="dialog" className="modal bottom-sheet">
            <div className="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div className="modal-footer">
                <a onClick={this.onRoll.bind(this)} className=" modal-action modal-close waves-effect waves-green btn-flat">Roll</a>
            </div>
        </div>
        );
    }

    onRoll(){
        this.context.router.transitionTo("/dice");
        DiceActions.rollDice(Immutable.fromJS({
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
        }));
        $(this.refs.dialog.getDOMNode()).closeModal();
    }
}

DiceDialogComponent.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = DiceDialogComponent;