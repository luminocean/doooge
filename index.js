const path = require('path');
const electron = require('electron');
const core = require('./doooge/core');
const util = require('./doooge/util');

let app = angular.module('app', []);

app.controller('mainController', function($scope, $interval){
    $scope.countDown = -1;
    $scope.status = 'INIT';

    let counting = null;

    let reset = function(){
        this.status = 'INIT';
        this.countDown = -1;

        if( counting ){
            $interval.cancel(counting);
            counting = null;
        }
    };

    // executed when the button is clicked
    $scope.trigger = function(){
        if(this.status == 'INIT'){
            this.status = 'WORKING';
            counting = core.countDown($interval, $scope, 'countDown', 25*60, function(){
                reset.apply($scope);
            });
        }
        else if(this.status == 'WORKING'){
            reset.apply($scope);
        }
        else{
            console.error('Unknown trigger button status: ' + this.status);
        }
    };

    $scope.close = function(){
        electron.remote.BrowserWindow.getFocusedWindow().close();
    };

    $scope.minimize = function(){
        electron.remote.BrowserWindow.getFocusedWindow().minimize();
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
        if( seconds < 0 ) return 'READY';
        return util.secondsToTimeStr(seconds);
    }
});