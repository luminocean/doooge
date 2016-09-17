let countDown = function(interval, scope, key, seconds, done){
    scope[key] = seconds;

    let counting = interval(function(){
        scope[key]--;
        if(scope[key] <= 0){
            done();
        }
    }, 1000);

    return counting;
};

exports.countDown = countDown;