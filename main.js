var join = require('path').join
var BrowserWindow = require('browser-window')
var app = require('app')

app.on('ready', function () {
  var window = new BrowserWindow({
    'title': 'Remote Camera',
    'width': 400, 
    'height': 300,
    'show': false,
    'accept-first-mouse': true,
    'always-on-top': true,
    'frame': false
  })

  window.on('closed', function () {
    win = null
  })

  window.loadUrl('file://' + join(__dirname, 'index.html'))

  setTimeout(function () {
    window.show()
  }, 300)
})