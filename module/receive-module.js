(function (){var app = angular.module('receiveModule',[]);

app.controller('receiveController',function($scope, $http){

var _this = this;

// for using with autocomplete on main page
var autocmpt = function (input,list){
    var display = [];
    if(input && input.length>1){
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

//initiallizing variables
_this.supplier = '';
_this.supplierlist = [];
_this.supplierdata = [];
_this.displistsupp = [];
_this.addsupp = '';
_this.mobnumsupp = '';
_this.do='';
_this.supid = '';
_this.itemrec = '';
_this.rcvdqty = 0;
_this.dmgqty = 0;
_this.shtqty = 0;
_this.matlistrec = [];
_this.matdatarec = [];
_this.itemidrec = '';
_this.dispmatrec = [];
_this.supdate = new Date();
_this.itemlistrec = [];
_this.showdatastatus='working....';
_this.show = 'data';

//----------------------------------------------Start of Receipt Section--------------------------------------------------------------

//populating supplier list, address and contact
$http.get('./php/supplier.php').then(function(response){
        _this.supplierdata = response.data.record;
        _this.supplierdata.forEach(function(value){
             _this.supplierlist.push(value[1]);
        });
});

_this.showsupp = function (){
    _this.addsupp = '';
    _this.mobnumsupp = '';
    _this.supid = '';
    _this.displistsupp = autocmpt (_this.supplier, _this.supplierlist);
};

//selecting supplier for list of suppliers
_this.listsupplier = function(value){
    _this.supplier = value;
    _this.displistsupp = [];
    _this.supplierdata.forEach(function(value){
        if(_this.supplier == value[1]){
            _this.supid = value[0];
            _this.addsupp = value[2];
            _this.mobnumsupp = value[3];
    }});
};

//populating material list
$http.get('./php/material.php').then(function(response){
        _this.matdatarec = response.data.record;
        _this.matdatarec.forEach(function(value){
             _this.matlistrec.push(value[1]);
        });
});

_this.showmatrec = function (){
    _this.dispmatrec = autocmpt (_this.itemrec, _this.matlistrec);
};

//selecting material for list of materials
_this.listitemrec = function(value){
    _this.itemrec = value;
    _this.dispmatrec = [];
    _this.matdatarec.forEach(function(value){
        if(_this.itemrec == value[1]){
            _this.itemidrec = value[0];
    }});
};

//adding items detail in page
_this.additemrec = function (item,rcvdqty,dmgqty,shtqty){
    if(item!=undefined && item!=''){
        var newitem = {
            itemid:_this.itemidrec,
            name:item,
            rcvdqty:rcvdqty,
            dmgqty:dmgqty,
            shtqty:shtqty,
            actqty:(rcvdqty-dmgqty-shtqty)
        };    
        _this.itemlistrec.push(newitem);
        _this.itemidrec = '';
        _this.itemrec='';
        _this.rcvdqty = 0;
        _this.dmgqty = 0;
        _this.shtqty = 0
    }  
};

//deleting item details in page
_this.deleteitemrec = function(value){
    _this.itemlistrec.splice(value,1);
};

//sending data to server to storage
_this.showrecords = function(){
    if(_this.supplier !='' && _this.itemlistrec.length >0 && _this.supdate != undefined){
        var record = {
        supid:_this.supid,
        supplier:_this.supplier,
        address:_this.addsupp,
        mobile:_this.mobnumsupp,
        do:_this.do,
        date:_this.supdate,
        item:_this.itemlistrec
        }
        $http.post('./php/receive.php',record).then(function(response){
            if(response.data == 'ok'){
                _this.showdatastatus = 'Data entered';
            }
            else{
                _this.showdatastatus = 'Data not entered. Please contact the system administrator';
            }            
        });
        _this.show='conf';
        _this.supplier='';
        _this.addsupp='';
        _this.mobnumsupp='';
        _this.do='';
        _this.supdate=new Date();
        _this.itemlistrec=[];
        setTimeout(function(){
            _this.show = 'data';
        },1000);
    }
    else {
        return false;
    }
};
// -------------------------------------------------End of Receipt Section--------------------------------------
});
})();

 