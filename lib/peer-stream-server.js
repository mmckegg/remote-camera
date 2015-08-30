var WebSocketServer = require('ws').Server
var SimplePeer = require('simple-peer')

module.exports = function (opts, onStream) {
  var server = new WebSocketServer(opts)
  server.ip = getIPAddress()

  server.on('connection', function (socket) {
    var peer = new SimplePeer()
    peer.on('stream', function (stream) {
      server.emit('stream', URL.createObjectURL(stream))
    })
    socket.on('message', function (data) {
      peer.signal(JSON.parse(data))
    })
    peer.on('signal', function (data) {
      socket.send(JSON.stringify(data))
    })
  })

  return server
}

function getIPAddress () {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
  return '0.0.0.0'
}