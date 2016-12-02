(function(){
    var app = angular.module('supplierModule',[]);

    app.controller('supplierController', function($http){
        
        var _this = this;
        
        _this.show = 'main';
        _this.name = '';
        _this.address = '';
        _this.mobnum = '';
        _this.id = '';
        
        var updatelist = function(){
                            $http.get('./php/supplier.php').then(function(response){
                                _this.supplierdata = response.data.record;
                            });
                        };

        updatelist();

        _this.update = function (value){
            _this.id = value[0];
            _this.name = value[1];
            _this.address = value[2];
            _this.mobnum = value[3];
            _this.show = 'upd';
        };

        _this.updatevalue = function(){
            var record = {
            id:_this.id,
            name:_this.name,
            address:_this.address,
            mobile:_this.mobnum,
            }
            $http.post('./php/supplierupdate.php',record).then(function(response){
                updatelist();
            });
            _this.id = '';
            _this.name='';
            _this.address='';
            _this.mobnum='';               
            _this.show = 'main';
            };

        _this.cancel = function(){
            _this.show = 'main';
        };
        
        

        


    });
})();