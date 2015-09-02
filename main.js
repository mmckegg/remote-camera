var join = require('path').join
var BrowserWindow = require('browser-window')
var app = require('app')
var window = null

app.on('ready', function () {
  window = new BrowserWindow({
    'title': 'Remote Camera',
    'width': 400,
    'height': 300,
    'show': false,
    'accept-first-mouse': true,
    'always-on-top': true,
    'frame': false
  })

  window.on('closed', function () {
    window = null
  })

  window.loadUrl('file://' + join(__dirname, 'index.html'))

  // prevent white flicker on load
  setTimeout(function () {
    window.show()
  }, 300)
})
