let React = require('react');
let mui = require('material-ui');
let Immutable = require('immutable');
let TextField = mui.TextField;
let Dialog = mui.Dialog
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
        this.refs.dialog.show();
    }

    render() {
        let standardActions = [
            { text: 'Cancel' },
            { text: 'Roll', onTouchTap: this.onRoll.bind(this), ref: 'submit' }
        ];

        return <Dialog
            title="Roll Dice"
            ref="dialog" autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            actions={standardActions}
            actionFocus="submit">
            Hey
        </Dialog>
    }

    onRoll(){
        this.context.router.transitionTo("/dice");
        DiceActions.rollDice("hey");
        this.refs.dialog.dismiss();
    }
}

DiceDialogComponent.contextTypes = {
    router: React.PropTypes.func.isRequired
};

module.exports = DiceDialogComponent;