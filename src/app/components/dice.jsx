let DiceStore = require("../stores/dicestore")
let DiceItem = require("./diceitem.jsx")
let newid = require('../util/newid');

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
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center"

        };

        var rolls = this.state.data.map((m) => {
            return (
                <DiceItem key={newid()} roll={m}/>
            );
        });
        return <div style={containerStyle}>
            {rolls}
        </div>
    }
}

module.exports = DiceComponent;