(function (){var app = angular.module('soldModule',[]);

app.controller('soldController',function($scope, $http){

var _this = this;

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
_this.custdate = new Date();
_this.itemlistsold = [];
_this.type = 'est';
_this.prsheet = 'dataentry';
_this.cd = 0;
_this.tax = 0;
_this.gross = 0;


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
    //_this.displistcust = [];
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
            //amount:(soldqty*soldprice)
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

//print and save invoice
_this.saveinvoice = function(){
        var record = {
        billno:_this.bill,
        cd:_this.cd,
        tax:_this.tax,
        gross:_this.gross,
        net:_this.net,    
        custid:_this.custid,
        customer:_this.customer,
        address:_this.addcust,
        mobile:_this.mobnumcust,
        date:_this.custdate,
        item:_this.itemlistsold
        }
        $http.post('php/sold.php',record).then(function(response){
            if(response.data == 'ok'){
                window.print();
            }else if(response.data == 'entered'){
                window.alert('This bill has been entered. Please check the status section');
            }else{
                window.alert('Data not entered. Please contact the system administrator');
            }            
        });
};

// print estimate
_this.printestimate = function(){
    window.print();
};

// for reseting form

_this.reset = function(){
    _this.cd = 0;
    _this.tax = 0;
    _this.gross = 0;
    _this.net = 0;
    _this.customer='';
    _this.addcust='';
    _this.mobnumcust='';
    _this.custdate= new Date();
    _this.itemlistsold=[];
    _this.prsheet = 'dataentry';
}

//for print preview
_this.prform = function(value){
    if(_this.customer !='' && _this.itemlistsold.length >0){
        _this.prsheet = value;
        $http.get('./php/bill.php').then(function(response){
        _this.bill = response.data.record[0][1];
        _this.bill++;

        if(_this.bill < 10){
            _this.billshow = '000' + _this.bill;
        } else if(_this.bill < 100){
            _this.billshow = '00' + _this.bill;
        } else if(_this.bill < 1000){
            _this.billshow = '0' + _this.bill;
        }else {
            _this.billshow = _this.bill;
        }

        _this.itemlistsold.forEach(function(element) {
            _this.gross = _this.gross + element.soldqty*element.soldprice;
        }, this);
        _this.cdamt = _this.gross * _this.cd * 0.01;
        _this.taxamt = (_this.gross - _this.cdamt)*_this.tax*0.01 ;
        _this.net = _this.gross - _this.cdamt + _this.taxamt;
    });
    }
    else {
        return false;
    }
};

// -------------------------------------------------End of Sold Section--------------------------------------

// -------------------------------------------------Start of Reprint Section------------------------------ 

$http.get('./php/bill.php').then(function(response){
    var invoice = response.data.record;
    _this.selectinv = invoice.map(function(value){
        return value[1];
    });
});

_this.showinv = '';

_this.pntinv = function(){
    var record = {
        showinv: _this.showinv
    };
    var pulledrec = {};
    _this.billshow = _this.showinv >= 1000 ? _this.showinv : (_this.showinv >= 100 ? '0' + _this.showinv :
                    (_this.showinv >= 10 ? '00' + _this.showinv :'000'+ _this.showinv));
    _this.customer = '';
    _this.addcust = '';
    _this.mobnumcust = '';
    _this.custdate = new Date();
    _this.itemlistsold = [];
    _this.gross = 0;
    _this.cd = 0;
    _this.tax = 0;
    _this.cdamt = 0;
    _this.taxamt = 0 ;
    _this.net = 0;

    $http.post('./php/reprint-invoice.php',record).then(function(response){
        pulledrec = response.data.record;

        _this.custid = pulledrec[0][10];
        _this.customer = pulledrec[0][0];
        _this.addcust = pulledrec[0][1];
        _this.mobnumcust = pulledrec[0][2];
        _this.custdate = new Date(pulledrec[0][3]);
        _this.itemlistsold = pulledrec.map(function(value){
            return {
                itemid:value[9],
                name:value[4],
                soldqty:parseFloat(value[5]),
                soldprice:parseFloat(value[6]) 
            };
        });
        _this.itemlistsold.forEach(function(element) {
            _this.gross = _this.gross + element.soldqty*element.soldprice;
        }, this);
        _this.cd = parseFloat(pulledrec[0][7]);
        _this.tax = parseFloat(pulledrec[0][8]);
        _this.cdamt = _this.gross * _this.cd * 0.01;
        _this.taxamt = (_this.gross - _this.cdamt)*_this.tax*0.01 ;
        _this.net = _this.gross - _this.cdamt + _this.taxamt;
    })
};

// -------------------------------------------------End of Reprint Section------------------------------ 

// -------------------------------------------------Start Edit invoice Section -------------------------

_this.editinvoice = function(){
    _this.itemlistsold.forEach(function(element) {
           _this.gross = _this.gross + element.soldqty*element.soldprice;
    }, this);
    _this.cdamt = _this.gross * _this.cd * 0.01;
    _this.taxamt = (_this.gross - _this.cdamt)*_this.tax*0.01 ;
    _this.net = _this.gross - _this.cdamt + _this.taxamt;
    
    var record = {
    billno:_this.showinv,
    cd:_this.cd,
    tax:_this.tax,
    gross:_this.gross,
    net:_this.net,    
    custid:_this.custid,
    customer:_this.customer,
    address:_this.addcust,
    mobile:_this.mobnumcust,
    date:_this.custdate,
    item:_this.itemlistsold
    }

    $http.post('php/edit-invoice.php',record).then(function(response){
        if(response.data == 'ok'){
            _this.displayresult = 'The data has been changed';
        }else{
            _this.displayresult = 'Data not entered. Please contact the system administrator';
        }            
    });

    _this.prsheet = 'conf';
};

// -------------------------------------------------End Edit invoice Section -------------------------

});
})();

