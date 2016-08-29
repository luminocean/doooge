const path = require('path')
const core = require('./doooge/core');
const util = require('./doooge/util');

let app = angular.module('app', []);
app.controller('mainController', function($scope, $interval){
    $scope.countDown = -1;
    $scope.status = 'INIT';

    let counting;
    // executed when the button is clicked
    $scope.trigger = function(){
        if(this.status == 'INIT'){
            this.status = 'WORKING';
            counting = core.countDown($scope, $interval, 30*60);
        }
        else if(this.status == 'WORKING'){
            this.status = 'INIT';
            $interval.cancel(counting);
            $scope.countDown = -1;
        }
    };
});

app.filter('buttonFilter', function(){
    return function(status){
        if(status === 'INIT') return 'boom';
        if(status === 'WORKING') return 'stop';
        return 'nothing'; // unknown status
    }
});

app.filter('timeFilter', function(){
    return function(seconds){
        if( seconds < 0 ) return '';
        return util.secondsToTimeStr(seconds);
    }
});