// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db=null;
angular.module('starter', ['ionic','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('registration', {
          url: "/registration",
          templateUrl: "registration.html",
          controller: 'RegistrationClt'
        })   
    $urlRouterProvider.otherwise("/registration");
})
.controller('RegistrationClt', function($scope, $state, $rootScope,$ionicLoading,$ionicPopup, $timeout,$cordovaSQLite) {
 	
 
 
 $scope.submit = function(reg) {
	//alert(reg.first);
//	alert(reg.last);
	//alert("db :"+db);
if(!reg || ! reg.first){
$ionicPopup.alert({
		  title: 'Please Enter Your First Name',
		  //template:'From date'
		  })	
}else if(!reg || ! reg.last){
$ionicPopup.alert({
		  title: 'Please Enter Your Last Name',
		  //template:'From date'
		  })	
}else{

 
 db.transaction(function(tx) {  
 		//alert("inside");
           	tx.executeSql("INSERT INTO user (first_name,last_name) VALUES (?,?)", [reg.first,reg.last], function(tx, res) { 
				alert("Insert Successfully");
				//Show
					$rootScope.list = [];
	 db.transaction(function(tx) {
	 	tx.executeSql("SELECT * from user", [], function(tx, res) {
	 	 var len = res.rows.length;
                 if(len>0){
                  for (var i = 0; i < len; i++) {
                  	 $scope.list.push({
                  	 	first_name: res.rows.item(i).first_name,
                 		last_name: res.rows.item(i).last_name	
                  	 });
                  	  $scope.$apply();
                  }
                  
                 }
                
	 	})
	 })
 
				//End Show
			});
         }, function(e) {
       alert("Error");
    });
    
 }		
 }

})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	db = window.sqlitePlugin.openDatabase({name: "DB"});
	
	
	
	db.transaction(function(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS user (first_name text,last_name)');
	})
//	alert("db :"+db);

	
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	

  });
})
