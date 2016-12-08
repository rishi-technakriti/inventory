(function (){var app = angular.module('soldModule',[]);

app.controller('soldController',function($scope, $http){

var _this = this;

_this.prsheet = 'inv';
_this.customer = 'Rishi';
_this.addcust = '92/16 Nehru Nagar East';
_this.mobnumcust = '9827465745';
_this.custdate = new Date();
_this.itemlistsold = [{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
},{
    name:'Bolt', 
    soldqty: 26,
    soldprice: 2
},{
    name:'Nut', 
    soldqty: 56,
    soldprice: 3
}];

_this.cd = 2;
_this.tax = 4;
_this.gross = 0;
_this.itemlistsold.forEach(function(element) {
    _this.gross = _this.gross + element.soldqty*element.soldprice;
}, this);
_this.cdamt = _this.gross * _this.cd * 0.01;
_this.taxamt = (_this.gross - _this.cdamt)*_this.tax*0.01 ;

_this.net = _this.gross - _this.cdamt + _this.taxamt;
_this.print = function(){
    window.print();
};


/*
//initiallizing variables
_this.customer = '';
_this.customerlist = [];
_this.customerdata = [];
_this.displistcust = [];
_this.addcust = '';
_this.mobnumcust = '';
_this.custid = '';
_this.itemsold = '';
_this.soldqty = 0;
_this.soldprice = 0;
_this.matlistsold = [];
_this.matdatasold = [];
_this.itemidsold = '';
_this.dispmatsold = [];
_this.custdate = '';
_this.itemlistsold = [];
_this.type = 'est';
_this.prsheet = 'dataentry';
_this.cd = 0;
_this.tax = 0;
_this.gross = 0;

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

//----------------------------------------------Start of Sold Section--------------------------------------------------------------

//populating customer list, address and contact
$http.get('./php/customer.php').then(function(response){
        _this.customerdata = response.data.record;
        _this.customerdata.forEach(function(value){
             _this.customerlist.push(value[1]);
        });
});

_this.showcust = function (){
    _this.addcust = '';
    _this.mobnumcust = '';
    _this.custid = '';
    _this.displistcust = autocmpt (_this.customer, _this.customerlist);
};

//selecting customer for list of suppliers
_this.listcustomer = function(value){
    _this.customer = value;
    _this.displistcust = [];
    _this.customerdata.forEach(function(value){
        if(_this.customer == value[1]){
            _this.custid = value[0];
            _this.addcust = value[2];
            _this.mobnumcust = value[3];
    }});
};

//populating material list
$http.get('./php/material.php').then(function(response){
        _this.matdatasold = response.data.record;
        _this.matdatasold.forEach(function(value){
             _this.matlistsold.push(value[1]);
        });
});

_this.showmatsold = function (){
    _this.dispmatsold = autocmpt (_this.itemsold, _this.matlistsold);
};

//selecting material for list of materials
_this.listitemsold = function(value){
    _this.itemsold = value;
    _this.dispmatsold = [];
    _this.matdatasold.forEach(function(value){
        if(_this.itemsold == value[1]){
            _this.itemidsold = value[0];
    }});
};

//adding items detail in page
_this.additemsold = function (item,soldqty,soldprice){
    if(item!=undefined && item!=''){
        var newitem = {
            itemid:_this.itemidsold,
            name:item,
            soldqty:soldqty,
            soldprice:soldprice,
            amount:(soldqty*soldprice)
        };    
        _this.itemlistsold.push(newitem);
        _this.itemidsold = '';
        _this.itemsold='';
        _this.soldqty = 0;
        _this.soldprice = 0;
    }  
};

//deleting item details in page
_this.deleteitemsold = function(value){
    _this.itemlistsold.splice(value,1);
};

//sending data to server to storage
/*_this.showinvoice = function(){
    if(_this.customer !='' && _this.itemlistsold.length >0){
        var record = {
        custid:_this.custid,
        customer:_this.customer,
        address:_this.addcust,
        mobile:_this.mobnumcust,
        date:_this.custdate,
        item:_this.itemlistsold
        }
        $http.post('php/sold.php',record).then(function(response){
            if(response.data == 'ok'){
                _this.showdatastatus = 'Data entered';
            }
            else{
                _this.showdatastatus = 'Data not entered. Please contact the system administrator';
            }            
        });
        _this.tab = 'matsoldcon';
        _this.customer='';
        _this.addcust='';
        _this.mobnumcust='';
        _this.custdate='';
        _this.itemlistsold=[];
    }
    else {
        return false;
    }
};*/

_this.prform = function(value){
    _this.prsheet = value;
};

// -------------------------------------------------End of Sold Section--------------------------------------

});
})();

 