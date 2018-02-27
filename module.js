'use strict';

angular.module("APP", [
'ngAnimate',
'ngCookies',
'ngResource',
'ngSanitize',
'ngTouch',
'ngMessages',
'ui.router',
'ui.bootstrap',
'pascalprecht.translate',
'ui.grid',
'ui.grid.edit',
'ui.grid.cellNav',
'ui.grid.pinning',
'ui.grid.resizeColumns',
'ui.grid.selection',
'ui.grid.rowEdit',
'ui.grid.saveState',
'ui.grid.expandable',
'ui.grid.autoResize',
'ui.grid.infiniteScroll',
'ui.grid.treeView',
'ui.grid.exporter',
'ckeditor',
'treasure-overlay-spinner',
'ivh.treeview',
'angularTreeview',
'perfect_scrollbar',
'ngMask',
'ngFileUpload',
'ngIdle',
'ngStorage',
'ui.bootstrap.datetimepicker'
])
.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useUrlLoader('Asset/language/en.json');
    $translateProvider.preferredLanguage('en');
}])
.run(['ValidationUtility', function (ValidationUtility) {
    ValidationUtility.initialize('Asset/validation/validations.json');
}])
.run(['$rootScope', '$state', '$uibModalStack', '$templateCache', 'Idle', function ($rootScope, $state, $uibModalStack, $templateCache, Idle) {
    $rootScope.ver = new Date().getTime();
    var VersionNo = '10.0.0.0';
    $rootScope.spinner = {
        active: false,
        on: function () {
            this.active = true;
        },
        off: function () {
            this.active = false;
        }
    };

    $rootScope.$on("$stateChangeStart", function (event, current, previous, x) {
        $rootScope.spinner.on();
        var top = $uibModalStack.getTop();
        if (top) {
            $uibModalStack.dismiss(top.key);
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toState.title == 'Login') {
            Idle.unwatch();
        }
        $rootScope.title = toState.title + ' ' + VersionNo;
        $rootScope.spinner.active = false;
    });
}])
.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            request: function (config) {
                $rootScope.spinner.on();
                return config
            },
            response: function (response) {
                $rootScope.spinner.off();
                return response
            },
            responseError: function (response) {
                $rootScope.spinner.off();
                return response
            },
            requestError: function (response) {
                $rootScope.spinner.off();
                return response
            }
        }
    })
}).config(function (IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(10);
    IdleProvider.timeout(10);
    KeepaliveProvider.interval(599);
    IdleProvider.windowInterrupt('focus');
});