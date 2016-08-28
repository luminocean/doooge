let countDown = function(scope, interval, seconds){
    scope.countDown = seconds;

    let counting = interval(function(){
        scope.countDown--;
        if(scope.countDown <= 0)
            interval.cancel(counting); // timeout, cancel itself
    }, 1000);

    return counting;
};

exports.countDown = countDown;