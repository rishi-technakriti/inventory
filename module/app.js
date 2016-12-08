(function(){var app = angular.module('myapp',[
    'ngRoute',
    'receiveModule',
    'soldModule',
    'supplierModule',
    'materialModule',
    'receiveupdateModule',
    'towordModule'
    ]);

app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:'home.html'
    }) .when("/material-receipt",{
        templateUrl:'receive.html'
    }) .when("/material-sold",{
        templateUrl:'sold.html'
    }) .when("/status",{
        templateUrl:'status.html'
    }) .when("/supplier",{
        templateUrl:'supplier.html'
    }) .when("/material",{
        templateUrl:'material.html'
    }) .when("/receive-material",{
        templateUrl:'receive-material.html'
    }) .otherwise({redirectTo:'/'});
});

app.controller('contentController',function($scope, $http){

_this = this;

// for tab control on page
_this.tab = 'home';

_this.settab = function(value){
    _this.tab = value;
};

// for using with autocomplete on main page
var autocmpt = function (input,list){
    var display = [];
    if(input && input.length>2){
        display = list.filter(function(value){
            var valuelow = value.toLowerCase();
            var inputlow = input.toLowerCase() ;
            if(valuelow.includes(inputlow)){
                return value;
            };
        });
    }
    else{
        display = [];
    }
    return display;
};
});
})();

 