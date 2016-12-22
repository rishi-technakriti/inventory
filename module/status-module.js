(function(){
    var app = angular.module('statusModule',[]);

    app.controller('stockController', function($http){
        
        var _this = this;

        _this.stock = [];

        $http.get('php/stock.php').then(function(response){
            _this.stock = response.data.record;
        });
    });

    app.controller('invoiceController', function($http){

        var _this = this;

        _this.invoice = [];
        $http.get('php/invoice.php').then(function(response){
            _this.invoice = response.data.record;
        });
    });
})();