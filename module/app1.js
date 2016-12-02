var app = angular.module('myapp',[]);

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

//initiallizing variables
_this.supplier = '';
_this.supplierlist = [];
_this.supplierdata = [];
_this.displistsupp = [];
_this.addsupp = '';
_this.mobnumsupp = '';
_this.supid = '';
_this.itemrec = '';
_this.rcvdqty = 0;
_this.dmgqty = 0;
_this.shtqty = 0;
_this.matlistrec = [];
_this.matdatarec = [];
_this.itemidrec = '';
_this.dispmatrec = [];
_this.supdate = '';
_this.itemlistrec = [];
_this.showdatastatus='working....';

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
_this.supdate = '';
_this.itemlistsold = [];

//----------------------------------------------Start of Receipt Section--------------------------------------------------------------

//populating supplier list, address and contact
$http.get('./supplier.php').then(function(response){
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
$http.get('./material.php').then(function(response){
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
    if(_this.supplier !='' && _this.itemlistrec.length >0){
        var record = {
        supid:_this.supid,
        supplier:_this.supplier,
        address:_this.addsupp,
        mobile:_this.mobnumsupp,
        date:_this.supdate,
        item:_this.itemlistrec
        }
        $http.post('receive.php',record).then(function(response){
            if(response.data == 'ok'){
                _this.showdatastatus = 'Data entered';
            }
            else{
                _this.showdatastatus = 'Data not entered. Please contact the system administrator';
            }            
        });
        _this.tab = 'matreccon';
        _this.supplier='';
        _this.addsupp='';
        _this.mobnumsupp='';
        _this.supdate='';
        _this.itemlistrec=[];
    }
    else {
        return false;
    }
};
// -------------------------------------------------End of Receipt Section--------------------------------------

//----------------------------------------------Start of Sold Section--------------------------------------------------------------

//populating customer list, address and contact
$http.get('./customer.php').then(function(response){
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
$http.get('./material.php').then(function(response){
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
_this.showinvoice = function(){
    if(_this.customer !='' && _this.itemlistsold.length >0){
        var record = {
        custid:_this.custid,
        customer:_this.customer,
        address:_this.addcust,
        mobile:_this.mobnumcust,
        date:_this.custdate,
        item:_this.itemlistsold
        }
        $http.post('sold.php',record).then(function(response){
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
};
// -------------------------------------------------End of Sold Section--------------------------------------

});

 