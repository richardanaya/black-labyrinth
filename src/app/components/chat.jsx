let React = require('react');
let mui = require('material-ui');
let Immutable = require('immutable');
let ChatActions = require('../actions/chatactions');
let MessageStore = require('../stores/messagestore');
let TextField = mui.TextField;
let FlatButton = mui.FlatButton;
let Snackbar = mui.Snackbar;

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: Immutable.List()
        };
        MessageStore.instance.subscribe(this.onMessageStoreUpdate.bind(this))
    }

    onMessageStoreUpdate(value){
        this.setState(({messages}) => (
            {messages: value}
        ));
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
        ChatActions.sendMessage(t);
    }

    sendMessage(){
        var t = this.refs.message.getValue();
        this.addText(t);
        this.webrtc.ref.sendDirectlyToAll("text chat", "chat", t);
    }

    onCreatedPeer(peer){
        this.refs.joinedMessage.show();
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

        this.webrtc.on('createdPeer', this.onCreatedPeer.bind(this));

        this.webrtc.on("channelMessage", this.onChannelMessage.bind(this));
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
            <Snackbar ref="joinedMessage" message="A peer has joined the chat" action="okay" onActionTouchTap={()=>this.refs.joinedMessage.dismiss()}/>
            <TextField ref="roomName" hintText="Room" value="default"/>
            <FlatButton onClick={this.joinRoom.bind(this)}>Join</FlatButton>
            <div ref="chatArea">
                {messages}
            </div>
            <TextField ref="message" hintText="Message"/>
            <FlatButton onClick={this.sendMessage.bind(this)}>Send</FlatButton>
        </div>
    }
}

module.exports = ChatComponent;