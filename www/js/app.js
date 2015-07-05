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
.controller('RegistrationClt', function($scope, $state, $rootScope,$ionicLoading,$ionicPopup, $timeout) {
 $scope.submit = function(reg) {
	alert(reg.first);
	alert(reg.last);
	
	 db.transaction(function(tx) { 
	tx.executeSql("INSERT INTO user(first_name,last_name) VALUES (?,?)", [reg.first,reg.last], function(tx, res) {
	 alert("Insert successfully");
	})
 })
 }

})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	db = window.sqlitePlugin.openDatabase({name: "DB"});
	
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	db.transaction(function(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS user(first_name text,last_name)');
	})
  });
})