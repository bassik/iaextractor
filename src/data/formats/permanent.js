/* globals self */
'use strict'

function $ (id) {
  try {
    return window.content.document.getElementById(id);
  }
  catch (e) {
    return null;
  }
}

function html (tag, atts, parent) {
  var elem = document.createElement(tag);
  for (var name in atts) {
    elem.setAttribute(name, atts[name]);
  }
  if (parent) {
    parent.appendChild(elem);
  }
  return elem;
}

function remove () {
  var button = $('formats-button-small');
  if (button && button.parentNode) {
    button.parentNode.removeChild(button);
  }
  var menu = $('iaextractor-menu');
  if (menu && menu.parentNode) {
    menu.parentNode.removeChild(menu);
  }
}

function init () {
  var parent = $('watch8-secondary-actions') || $('vo');
  if (!parent) {
    return;
  }
  // Remove old button
  remove();
  // Add new button
  var button = html('button', {
    'id': 'formats-button-small',
    'title': 'Detect all possible download links',
    'class': 'yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon yt-uix-tooltip'
  }, parent);
  button.addEventListener('click', function () {
    this.blur();
    self.port.emit('formats');
  });

  var title = html('span', {
    'class': 'yt-uix-button-content'
  });
  title.textContent = 'Download';
  var imgContainer = html('span', {
    'class': 'yt-uix-button-icon-wrapper'
  });
  html('img', {
    'class': 'yt-uix-button-icon yt-sprite',
    'src': 'resource://feca4b87-3be4-43da-a1b1-137c24220968-at-jetpack/data/formats/injected-button.png'
  }, imgContainer);
  button.appendChild(imgContainer);
  button.appendChild(title);
}
// init
document.addEventListener('DOMContentLoaded', init, false);
if (document.readyState !== 'loading') {
  init();
}
function loader () {
  init();
  self.port.emit('page-update');}
// Update toolbar button (HTML5 History API)
self.port.emit('page-update');
document.addEventListener('spfdone', loader);
self.port.on('detach', function () {
  remove();
  document.removeEventListener('spfdone', loader);
});

// Clean up
function resize () {
  var menu = $('iaextractor-menu');
  if (menu && menu.parentNode) {
    menu.parentNode.removeChild(menu);
  }
}
window.addEventListener('resize', resize, false);
self.port.on('detach', function () {
  remove();
  window.removeEventListener('resize', resize);
});
