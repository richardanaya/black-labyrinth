let ChatActions = require('../actions/chatactions');
let Immutable = require('immutable');
var Rx = require('rx');
let {Action,Store,Singleton} = require("staticflux");

@Singleton
class MessageStore extends Store {
    constructor() {
        super(Immutable.List.of("hey","wassup"));
        ChatActions.sendMessage.subscribe(this.handleMessage.bind(this))
    }

    handleMessage(message) {
        var newMessages = this.state.push(message);
        this.updateState(newMessages);
    }
};

module.exports = MessageStore;