export function processOpcodes(compiler, opcodes) {
  var lastMethodSetAttribute = false;
  var lastAttribute = null;

  for (var i=0, l=opcodes.length; i<l; i++) {
    var method = opcodes[i][0];
    var params = opcodes[i][1];

    if (method === 'setAttribute') {
      if (lastMethodSetAttribute) {
        if (params[0] === lastAttribute) {
          continue;
        }
      }
      lastMethodSetAttribute = true;
      lastAttribute = params[0];
    }

    if (params) {
      compiler[method].apply(compiler, params);
    } else {
      compiler[method].call(compiler);
    }
  }
}
