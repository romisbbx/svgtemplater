function icon(name, options, path) {
  var options = options || {};
  var size    = options.size ? ' icon--' + options.size : '';
  var classes = 'icon icon--' + name + size + ' ' + (options.class || '');
  classes     = classes.trim();

  var icon =  '<svg class="icon-svg">' +
      '<use xlink:href="' + (path ? path : '') + '#' + name + '-icon" />' +
      '</svg>';

  var html =  '<div class="' + classes + '">' + icon + '</div>';

  return html;
}

function buildParamsFromString(string) {
  var match, attr, value;
  var params = {};
  var attrsRegexp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi;

  while (match = attrsRegexp.exec(string)) {
    attr  = match[1];
    value = match[2].replace(/'|"/, '');
    params[attr] = value;
  }

  return params;
}

function replaceIconTags(src, path) {
  var match, tag, params, name;
  var html = src.toString();
  var iconRegexp = /<icon\s+([-=\w\d'"\s]+)\s*\/?>(<\/icon>)?/gi;

  while (match = iconRegexp.exec(html)) {
    tag     = match[0];
    params  = buildParamsFromString(match[1]);
    name    = params.name;

    delete params.name;

    html = html.replace(tag, icon(name, params, path));
  }

  return html;
}

module.exports = {
  replaceIconTags: replaceIconTags,
  buildParamsFromString: buildParamsFromString,
  icon: icon
};
