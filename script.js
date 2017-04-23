angular.module('main', ['ngAnimate', 'toaster'])

.controller('myController', function($scope, toaster) {

    $scope.pop = function(){
        toaster.pop('warning', "failed");
        toaster.pop('success', "success");

    };
});
