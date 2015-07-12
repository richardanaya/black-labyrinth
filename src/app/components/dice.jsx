let React = require('react');
let {Paper,TextField} = require('material-ui');
let Immutable = require('immutable');
let DiceStore = require("../stores/dicestore")

class DiceComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        DiceStore.instance.subscribe(this.onDiceUpdate.bind(this));
    }

    onDiceUpdate(value){
        this.setState(({data}) => (
            {data: value}
        ));
    }

    render() {
        if(!this.state){return (<div></div>);}

        let containerStyle = {
            padding: 15,
            textAlign: "center"
        };

        let diceRollStyle = {
            width: 600
        }

        var rolls = this.state.data.get("rolls").map((m) => {
            return (
                <Paper zDepth={1} style={diceRollStyle}>
                    <p>{m}</p>
                </Paper>
            );
        });
        return <div style={containerStyle}>
            {rolls}
        </div>
    }
}

module.exports = DiceComponent;