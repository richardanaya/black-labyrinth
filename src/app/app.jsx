(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Main = require('./components/main.jsx'); // Our custom react component

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the document body.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  React.render(<Main />, document.body);
  var webrtc = new $xirsys.simplewebrtc(); //add secure server stuff here?
  webrtc.connect({},
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

  $('#joinButton').click(function(){
      var room = $('#room').val();
      $.get("/token", function(token) {
          webrtc.joinRoom(room,token);
      })
      .error(function(xhr) {
          console.error(xhr);
      })
  })

  $('#sendButton').click(function(){
      var t = $('#textInput').val();
      addText(t);
      webrtc.ref.sendDirectlyToAll("text chat", "chat", t);
  })

  function addText(t){
      $('#chatArea').append(t+"<br>")
  }



  webrtc.on('createdPeer', function (peer) {
    addText('createdPeer', peer);
  });

  webrtc.on("channelMessage", function(peer, channel, data) { 
      addText(data.payload);
  });

})();
