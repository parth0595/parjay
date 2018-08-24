var authenticatedUser=''; // variable to store in local storage of browser for authentication.
var token=null;
var mainurl="http://localhost:3000/";
var invalidLogin="you have entered wrong credentials";
var baseUrl= "http://localhost:3000/api/";   // always keep url same as the local storage for authenticated user is not valid for diff ip.
var company="";

/*angular.module('mainApp', ['ngRoute']).controller(function($rootScope, $http)*/

var app1 = angular.module('mainApp1', []).run(function( $rootScope, $http) {
     $rootScope.company = '';
    console.log("before local storage authenticatedUser for main new wali"+ authenticatedUser);
    authenticatedUser=sessionStorage.getItem('x');
    // setting up profile data from sesson storage

    $rootScope.firstname=localStorage.getItem('firstname');
    $rootScope.lastname=localStorage.getItem('lastname');
    $rootScope.email=localStorage.getItem('email');
    $rootScope.contactno=localStorage.getItem('contactno');

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


});

app1.controller('mainChecking',function($scope, $http){


           $scope.ShowStore=function()
             {
             console.log("comming inside ShowStore");
               console.log($scope.company);
               console.log("here"+company);
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
                    $scope.store=data;

                    console.log($scope.store);
                    //printing here storenames
                  /*  for (x in data[0].companystores)
                   {

                    }

                    */
                   }, function myError(response) {
                     console.log(status);

                   });
               };

                 //function to get storecode after selecting storename
                       var storename=null;
                       $scope.storeChange=function(storeObj)
                       {

                       var obj = JSON.parse(storeObj);
                       console.log(obj);
                       $scope.storecode=obj.storecode;
                       console.log(obj.storecode);
                      // storename=obj.storename;

                        };
                       // function to book visit
                       $scope.bookmyvisit=function()
                       {
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
                                             "customername": $scope.firstname+$scope.lastname,
                                             "contactno": $scope.contactno
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
