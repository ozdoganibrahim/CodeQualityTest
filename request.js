var fns = require("@@/utils/Functions");
var TryCatchProxy = require('@@/utils/TryCatchProxy');

function Request () {}

/**
 * @param {object} options
 * @param {string} options.url
 * @param {string} options.jsonpCallback
 * @param {function} options.success
 */
Request.jsonp= function (options)
{
    window[options.jsonpCallback] = function(data) {
    delete window[options.jsonpCallback];

    document.head.removeChild(script);
        (options.success || fns.noop)(data);

        return data;
    };
    var script = document.createElement('script');

    script.src = options.url + (fns.has(options.url, '?') ? '&' : '?') + 'callback=' + options.jsonpCallback;
    document.head.appendChild(script);

    return script.src;
};

module.exports = TryCatchProxy(Request);
