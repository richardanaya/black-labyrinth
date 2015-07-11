let React = require('react');
let mui = require('material-ui');
let TextField = mui.TextField;
let FlatButton = mui.FlatButton;

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    joinRoom(){
        var room = this.refs.roomName.getValue();
        $.get("/token", (token) => {
            this.webrtc.joinRoom(room,token);
        }).error( (xhr) => {
           console.error(xhr);
        })
    }

    addText(t){
        this.state.messages.push(t);
        this.setState(this.state);
    }

    sendMessage(){
        var t = this.refs.message.getValue();
        this.addText(t);
        this.webrtc.ref.sendDirectlyToAll("text chat", "chat", t);
    }

    onCreatedPeer(peer){
        this.addText('createdPeer');
    }

    onChannelMessage(peer, channel, data) {
        this.addText(data.payload);
    }

    componentDidMount() {
        this.webrtc = new $xirsys.simplewebrtc(); //add secure server stuff here?
        this.webrtc.connect({},
            {
                // we don't do video
                localVideoEl: '',
                remoteVideosEl: '',
                // dont ask for camera access
                autoRequestMedia: false,
                // dont negotiate media
                receiveMedia: {
                    mandatory: {
                        OfferToReceiveAudio: false,
                        OfferToReceiveVideo: false
                    }
                }
            }
        );

        this.webrtc.on('createdPeer', ::this.onCreatedPeer);

        this.webrtc.on("channelMessage", ::this.onChannelMessage);
    }

    render() {
        var messages = this.state.messages.map((m) => {
            return (
                <div>
                    {m}
                </div>
            );
        });

        return <div>
            <TextField ref="roomName" hintText="Room" value="default"/>
            <FlatButton onClick={::this.joinRoom}>Join</FlatButton>
            <div ref="chatArea">
                {messages}
            </div>
            <TextField ref="message" hintText="Message"/>
            <FlatButton onClick={::this.sendMessage}>Send</FlatButton>
        </div>
    }
}

module.exports = ChatComponent;