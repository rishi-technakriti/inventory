(function(){
    var app = angular.module('materialModule',[]);

    app.controller('materialController', function($http){
        
        var _this = this;
        
        _this.show = 'main';
        _this.item = '';
        _this.id = '';
        
        var updatelist = function(){
                            $http.get('./php/material.php').then(function(response){
                                _this.materialdata = response.data.record;
                            });
                        };

        updatelist();

        _this.update = function (value){
            _this.id = value[0];
            _this.item = value[1];
            _this.show = 'upd';
        };

        _this.updatevalue = function(){
            var record = {
            id:_this.id,
            item:_this.item,
            }
            $http.post('./php/materialupdate.php',record).then(function(response){
                updatelist();
            });
            _this.id = '';
            _this.item='';
            _this.show = 'main';
            };

        _this.cancel = function(){
            _this.show = 'main';
        };
        
        

        


    });
})();