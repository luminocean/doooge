// convert seconds to a time expression string like HH:mm:ss
let secondsToTimeStr = function(seconds){
    let sec = 0, min = 0;

    if( seconds > 0) sec = parseInt(seconds%60);
    if( seconds >= 60 ) min = parseInt(seconds/60);

    return leftPad(min, 2, '0') + ':'
        + leftPad(sec, 2, '0');
};

exports.secondsToTimeStr = secondsToTimeStr;

function leftPad(origin, toLength, pad){
    // ensure the object to be left padded is a string
    let str = origin + '';
    let padding = '';
    let diffLen = toLength - str.length;
    while(diffLen > 0){
        padding += pad;
        diffLen--;
    }
    return padding + str;
}