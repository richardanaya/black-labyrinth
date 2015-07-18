let ChatActions = require('../actions/chatactions');

@Singleton
class MessageStore extends Store {
    constructor() {
        super(Immutable.fromJS(["blah","test"]));
        ChatActions.sendMessage.subscribe(this.handleMessage.bind(this))
    }

    handleMessage(message) {
        var newMessages = this.state.push(message);
        this.updateState(newMessages);
    }
};

module.exports = MessageStore;