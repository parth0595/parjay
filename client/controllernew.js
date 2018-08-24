var authenticatedUser=''; // variable to store in local storage of browser for authentication.
var token=null;
var mainurl="http://localhost:3000/";
var invalidLogin="you have entered wrong credentials";
var baseUrl= "http://localhost:3000/api/";   // always keep url same as the local storage for authenticated user is not valid for diff ip.
var company='';

// controller for the main site built here.
/*var app1 = angular.module('mainApp1', []).run(function($rootScope, $http,$location) {

console.log("before local storage authenticatedUser for main new wali"+ authenticatedUser);
authenticatedUser=sessionStorage.getItem('x');

sessionStorage.getItem('lastname');
sessionStorage.getItem('email');

// setting up profile data from sesson storage

$rootScope.firstname=sessionStorage.getItem('firstname');
$rootScope.lastname=sessionStorage.getItem('lastname');
$rootScope.email=sessionStorage.getItem('email');
$rootScope.contactno=sessionStorage.getItem('contactno');

//checking if user is authenticated
if (authenticatedUser=="true")
    {
        //console.log("x  new page redirectt "+x);
        console.log("if" + authenticatedUser)
        console.log("getting item"+ authenticatedUser);
        $rootScope.authneticated=authenticatedUser;
        $rootScope.authenticated=authenticatedUser;
        console.log("authenticatedUser for main new wali"+ authenticatedUser);
        console.log($rootScope.authenticated);
    }
else
    {
    console.log("else" + authenticatedUser)
    window.location.href= mainurl+"newpage.html#/login";

    }

    //main controller here for showing company and storeinfos
 app1.controller('mainController', function($rootScope,$http,$location,$scope){
      *//* if ($rootScope.authenticated==false){
         $location.path("/signup");
       }
       document.getElementById("defaultOpen").click();
*//*
       // function to get store names
      $rootScope.ShowStore=function($rootScope,$http,$scope){
        console.log($scope.company);
         //console.log($rootScope.company);
        var filter="filter={\"where\":{\"company\":\""+$scope.company+"\"}}"; // to filter the data from back
        var storedata=null;// for getting store code rom storename
        console.log(filter);
              $http({
              method : "GET",
              url : baseUrl+"stores?"+filter+"&access_token="+token,


            }).then(function mySuccess(response) {
              console.log(response.status);
              var data = response.data;
             console.log(data);
             //printing here storenames
             for (x in data[0].companystores)
            {
             console.log( data[0].companystores[x].storename);
             //$scope.companystores=data[0]._companystores[x].storename;
             $scope.store=data;
             storedata=data;
         // storedata in response after filter
            // console.log(x.storename);
             }
            //console.log(data[0].storeInfos[1].storename);

            }, function myError(response) {
              console.log(status);

            });
        };


    //function to get storecode after selecting storename
        var storename=null;
        $rootScope.storeChange=function(storeObj){
        var obj = JSON.parse(storeObj);
        $scope.storecode=obj.storecode;
        storename=obj.storename;
        console.log(obj.storename);
        console.log(obj.storecode)
    };


    // function to book visit
    $rootScope.bookmyvisit=function($rootScope,$http,$scope){
        var storecode=$scope.storecode;
              $http({
              method : "POST",
              url : baseUrl+"storeinfos/"+storecode+"/booking?access_token="+token,
              data : {
                          "company": $scope.company,
                          "storename": storename,
                          "query": $scope.myquery,
                          "date": $scope.bookingdate,
                          "slot": $scope.bookingslot,
                          "customername": $rootScope.firstname+$rootScope.lastname,
                          "contactno": $rootScope.contactno
              					}
            }).then(function mySuccess(response) {
              console.log(response.status);
              var data = response.data;
             console.log(data);
             //printing here storenames
                   },
            function myError(response) {
              console.log(status);
               console.log(url);

            });
    };

    });

});*/



// controller for mainlyauthentication.
var app = angular.module('mainApp', ['ngRoute']).controller(function($rootScope, $http) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.firstname = '';
    $rootScope.lastname = '';
    $rootScope.contactno = '';
    $rootScope.email = '';
    $rootScope.oldnav='';

    $rootScope.Signout = function(){
       console.log(token);
       // logging out
       $.ajax({
          type:'post',
          url: baseUrl+'customers/logout',
          headers:{
            'Authorization':token
          }
        }).then(function(res) {
          console.log(res);

        }).catch(function(e) {
          console.log('error');
          console.log(e);
        });
       //$http.get(baseUrl+"customers/logout?access_token="+token);
      $rootScope.authenticated = false;
       //$rootScope.current_user = '';

        };
    });

  app.config(function($routeProvider){

	$routeProvider
		//the main display
	/*	.when('/main', {
			templateUrl: 'newmain.html',
			controller: 'mainController'
		})*/
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController',
		})

		// the store display
			.when('/store', {
    			templateUrl: 'putupstores.html',
    			controller: 'storeController'
    		})

		// the register display if not authneticated
		.when('/', {
			templateUrl: 'register.html',
			controller: 'authController',
		})

		//the signup display
		.when('/signup', {
			templateUrl: 'register.html',
			controller: 'authController',
		});

  });

//main controller was here

// store controller here
  app.controller('storeController', function($scope, $http, $rootScope, $location){

     if ($rootScope.authenticated==false){
       $location.path("/signup");
     }

  });

// auth controller here for register and login
app.controller('authController', function($scope, $http, $rootScope, $location){
 //$scope.user = {username: '', password: ''};
 // $scope.error_message = '';

 $rootScope.authenticated = false;


  //login function for login in user
	  $scope.loginUser=function(){

              $http({
            method : "POST",
            url : baseUrl+"customers/login",
            data : {

                    "username": $scope.logInUsername,
                    "password":$scope.LogInPassword,

                  }
          }).then(function success(response){
            console.log("login done");
            var status= response.status;
            console.log(status);
            var data= response.data;
            console.log(data);
            var current_user= data.FirstName;
            if(response.status==200){
              console.log("inside if");
              //authenticated= true;
              var data= response.data;
               token= data.id;
               sessionStorage.setItem("token", token);
              var userId= data.userId;
              console.log("inside function");
              $http({
              method : "GET",
              url : baseUrl+"customers/"+userId+"?access_token="+token,
              //params: {id: userId, access_token: token}
            }).then(function mySuccess(response) {
              console.log(response.status);
              console.log(response.data);
              var getData = response.data;
              console.log("userdetails after login: "+getData);
              $rootScope.authenticated = true;
              $rootScope.oldnav=true;
              authenticatedUser=true;
              $rootScope.current_user = getData.FirstName;
              $rootScope.firstname = getData.FirstName;
              $rootScope.lastname = getData.LastName;
              $rootScope.contactno = getData.contactno;
              $rootScope.email = getData.email;
              console.log(getData.email);
              console.log(authenticatedUser);
              sessionStorage.setItem("x","true");
              //stroing user name and email in session storage
              localStorage.setItem("firstname",getData.FirstName);
              localStorage.setItem("lastname",getData.LastName);
              localStorage.setItem("email", getData.email);
              localStorage.setItem("contactno",getData.contactno);

             //setting value x =true in local browser storage for authenticating and fetching in redirected page controller.
            window.location.href= mainurl+"indextext.html"; // redirecting to a new page


            }, function myError(response) {
              console.log(status);
              $scope.error_message = response.message;
              $scope.error = response.status;

            });


            }
            else
            {
              alert("you are not authenticated!")
            }

          }, function error(response){
            console.log("login failed");
            $scope.error = "error code: "+response.status;
            $scope.error_message= invalidLogin;
          });

	}

// function for register user
	  $scope.registerUser=function(){
              $rootScope.authenticated = false;
              $http({
              method : "POST",
              url : baseUrl+"customers",
              data : {
                    "username": $scope.username,
                    "password":$scope.password,
                    "email": $scope.email,
                    "contactno": $scope.contactno,
                     "FirstName": $scope.FirstName,
                     "LastName": $scope.LastName,
                    "emailVerified": true
                  }
            }).then(function mySuccess(response) {
              console.log(response.status);
              var data = response.data;
              $rootScope.authenticated = false;
              //$rootScope.current_user = data.user.username;
              alert("you are registered! clcik login");
              $location.path('/login');

            }, function myError(response) {
              console.log(status);
              $scope.error_message = response.message;
              $scope.data = response.status;
              //$scope.data = response.statusText;
              //$location.path('/');
            });
	};

});
