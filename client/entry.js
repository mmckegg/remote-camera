var getUserMedia = require('getusermedia')
var SimplePeer = require('simple-peer')
var WebSocket = global.WebSocket

getUserMedia({video: true}, function (err, stream) {
  if (err) throw err
  var server = new WebSocket('ws://' + window.location.host)
  server.onopen = function () {
    start(stream, server)
  }
})

function start (stream, server) {
  var peer = new SimplePeer({ initiator: true, stream: stream })

  server.onmessage = function (e) {
    peer.signal(JSON.parse(e.data))
  }

  peer.on('signal', function (data) {
    server.send(JSON.stringify(data))
  })
}
