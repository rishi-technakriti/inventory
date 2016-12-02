(function(){
    var app = angular.module('receiveupdateModule',[]);

    app.controller('receiveupdateController', function($http){
        
        var _this = this;
        
        _this.show = 'main';
        _this.date = '';
        _this.do = '';
        _this.item = '';
        _this.rcvdqty = '';
        _this.dmgqty = '';
        _this.shtqty = '';
        _this.id = '';
        
        var updatelist = function(){
                            $http.get('./php/receivelist.php').then(function(response){
                                _this.supplierdata = response.data.record;
                            });
                        };

        updatelist();

        _this.update = function (value){
            _this.id = value[0];
            _this.date = value[1];
            _this.do = value[2];
            _this.item = value[3];
            _this.rcvdqty = value[4];
            _this.dmgqty = value[5];
            _this.shtqty = value[6];
            _this.show = 'upd';
        };

        _this.delete = function (value){
            _this.id = value[0];
            _this.show = 'dlt';
        };


        _this.updatevalue = function(){
            var record = {
            id:_this.id,
            rcvdqty:_this.rcvdqty,
            dmgqty:_this.dmgqty,
            shtqty:_this.shtqty,
            act:'upd'
            }
            $http.post('./php/receiveupdate.php',record).then(function(response){
                updatelist();
            });
            _this.id = '';
            _this.date = '';
            _this.do = '';
            _this.item = '';
            _this.rcvdqty = '';
            _this.dmgqty = '';
            _this.shtqty = '';
            _this.show = 'main';
            };

        _this.deletevalue = function(){
            var record = {
            id:_this.id,
            rcvdqty:_this.rcvdqty,
            dmgqty:_this.dmgqty,
            shtqty:_this.shtqty,
            act:'del'
            }
            $http.post('./php/receiveupdate.php',record).then(function(response){
                updatelist();
            });
            _this.id = '';
            _this.date = '';
            _this.do = '';
            _this.item = '';
            _this.rcvdqty = '';
            _this.dmgqty = '';
            _this.shtqty = '';
            _this.show = 'main';
            };

        _this.cancel = function(){
            _this.show = 'main';
        };
        
        

        


    });
})();