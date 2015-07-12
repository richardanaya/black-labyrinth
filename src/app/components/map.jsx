let React = require('react');
let mui = require('material-ui');
let Immutable = require('immutable');
let TextField = mui.TextField;
let Dialog = mui.Dialog

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this._updateDimensions = this.updateDimensions.bind(this);
        this.animating = true;
    }

    updateDimensions() {
        this.setState({width: $(window).width(), height: $(window).height()});
    }

    drawMap() {
        if(this.refs.mapCanvas){
            var canvas = this.refs.mapCanvas.getDOMNode();
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = 'red';
            ctx.fillRect(0,0,100,100);

        }
    }

    animate(){
        var draw = () => {
            this.drawMap();
            if(this.animating){
                window.requestAnimationFrame(_draw);
            }
        }
        var _draw = draw.bind(this);
        window.requestAnimationFrame(_draw);
    }

    componentWillMount() {
        this.updateDimensions();
        this.animate();
    }

    componentDidMount() {
        window.addEventListener("resize", this._updateDimensions);
    }


    componentWillUnmount(){
        window.removeEventListener("resize", this._updateDimensions);
        this.animating = false;
    }

    render() {
        let containerStyle = {
            textAlign: "center",
            padding: 15
        }

        let canvasStyle = {
            display: "inline-block"
        }

        return <div style={containerStyle}>
            <canvas ref="mapCanvas" style={canvasStyle} width={this.state.width-40} height={this.state.height-64-40}></canvas>
        </div>
    }
}

module.exports = MapComponent;