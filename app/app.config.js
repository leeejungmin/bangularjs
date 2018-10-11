'use strict';

var leeApp = angular.module('leeApp', ['ngRoute','ngResource']);

leeApp.
  config([ '$routeProvider',
    function config( $routeProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login', {
          // template: '<login-list></login-list>',
          templateUrl:'login.html',
          controller:'loginController',
        }).

        when('/home', {
          // template: '<login-list></login-list>',
          templateUrl:'home.html',
          controller:'homeCtrl',
        }).
        when('/article', {
          // template: '<article-list></article-list>'
          templateUrl:'article.html',
          controller:'articlecontroller',
        }).
        when('/amis', {
          // template: '<amis-list></amis-list>'
          templateUrl:'amis.html',
          controller:'amiscontroller',
        }).
        when('/addamis', {
          // template: '<amis-list></amis-list>'
          templateUrl:'amisadd.html',
          controller:'addamiscontroller',
        }).
        when('/register', {
          // template: '<register-list></register-list>'
          templateUrl:'register.html',
          controller:'userregistercon',
        }).
        when('/edit/:id', {
          // template: '<register-list></register-list>'
          templateUrl:'edit.html',
          controller:'useredit',
        }).
        when('/articleregister', {
          // template: '<register-list></register-list>'
          templateUrl:'articleregister.html',
          controller:'artregiscontroller',
        }).
        when('/thing', {
          // template: '<register-list></register-list>'
          templateUrl:'thing.html',
          controller:'MainCtrl',
        }).
        otherwise({redirectTo : '/'});
    }
  ])

        .controller('homeCtrl',['$scope' ,'loginService', function($scope,loginService,$location){
            $scope.txt='Bonne Jour!!!';

            $scope.logout=function(){
              loginService.logout();
            };
            // $scope.login=function(){
            //     $location.path('/login');
            // };
            // $scope.logout=function(){
            //     $location.path('/logout');
            // };
            // $scope.register=function(){
            //     $location.path('/register');
            // };
            // $scope.amis=function(){
            //     $location.path('/amis');
            // };
            // $scope.article=function(){
            //     $location.path('/article');
            // };
            // $scope.articleregister=function(){
            //     $location.path('/articleregister');
            // };
        }])
        .controller('indexController',['$scope','loginService' , function($scope, $http, loginService , $location){
          $scope.getuserid = sessionStorage.length;
          $scope.getid = sessionStorage.uid;

          $scope.home=function(){
              $location.path('/home');
          };

          $scope.logout=function(){
            loginService.logout();
          };
        }])

        .controller('amiscontroller' ,function($scope, $http , $location, $resource) {
        // .controller('amiscontroller' ,['$resource',function($scope, $resource , $http , $location) {
         $scope.getuserid = sessionStorage.uid;


         $scope.addamis=function(){
             $location.path('/addamis');
         };

         $scope.getuserid = sessionStorage.uid;
             // sessionService.getItem('uid');
             // var Indata = {'product':$scope.getuserid};

          //
          // $http.post("app/data/amisvoir.php")
          // .then(function (response)
          // { console.log(response.data);
          //   $scope.names = response.data;});


          $http.get("http://localhost:8000/api/articles")
          .then(function (response)
          { console.log(response.data);
            $scope.names = response.data;});

        
          $scope.supprimamis=function(userid, amisid){
            $scope.getuserid = sessionStorage.uid;
            $http({
              method:"POST",
              url:"app/data/supprimamis.php",
              data: {userid, amisid}
            }).then(function(reponse){
              // $scope.names = reponse.data;
              // $scope.alertClass = 'success';
              console.log(reponse.data);

              $location.path('/home');
            });
          };

          $scope.getBook = function(){
            var id = $routeParams.id;
            $http.get('/api/books/'+id).then(function(response){
                $scope.book = response;
            })
          };


//           $scope.supprimamis=function(userid, amisid){
//
//           var Sendd = $resource('http://localhost/api/user', {
//               charge: {method: 'POST', params: {charge: true}}
//             });
//
//         var user = new Sendd({
//                 username: 'gooooddd',
//                 email: 'Punk',
//                 password: 'https://www.facebook.com/AggressiveCreatures?fref=ts'
//                   });
//           // var cards = new CreditCards();
//
//
//
//           // Each item is an instance of CreditCard
//
//
//           // Non-GET methods are mapped onto the instances
//
//           user.$save();
//
//
//
//
//
//
//
//
//
//           // $scope.cards.foo = 'bar';
//           // $scope.cards.something = 'leeeeeeeeeee';
//           // cards.$save();
//           console.log('success!!!');
//
//           // CreditCard.query(function(todos) {
//           //   //do something with todos
//           //   angular.forEach(todos, function(todo) {
//           //      todo.foo += ' something';
//           //      todo.$save();
//           //       });
//           //     });
//
//
//
// }



          // $scope.supprimamis=function(userid, amisid){
          //   $scope.getuserid = sessionStorage.uid;
          //   $http({
          //     method:"POST",
          //     url:"http://localhost/api/users",
          //     data: {userid, amisid}
          //   }).then(function(reponse){
          //     // $scope.names = reponse.data;
          //     // $scope.alertClass = 'success';
          //     // console.log(reponse.data);
          //     console.log("Jungmin Vous etes grand avec mon Seigneur!");
          //
          //     $location.path('/home');
          //   }).catch(function(result){
          //     console.log("Essayer Jungmin!!");
          //   });
          // };

        })
       .controller('symfonyCtrl', function($scope, $http, $location, sessionService) {
         $scope.getuserid = sessionStorage.uid;

         $scope.names = [];

         $http.post("app/data/amisvoir.php")
         .then(function (response)
         { console.log(response.data);
           $scope.names = response.data;});



         $scope.getuserid = sessionStorage.uid;
             // sessionService.getItem('uid');
             // var Indata = {'product':$scope.getuserid};
         $scope.supprimamis=function(userid, amisid){
           $scope.getuserid = sessionStorage.uid;
           $http({
             method:"GET",
             url:"http://localhost/api/users",
             data: {userid, amisid}
           }).then(function(reponse){
             // $scope.names = reponse.data;
             // $scope.alertClass = 'success';
             console.log(reponse.data);

             $location.path('/home');
           });
         };


        })
        .controller('addamiscontroller', function($scope, $http, $location) {

          $scope.getuserid = sessionStorage.uid;
          $scope.registerShow=function(){
            $scope.alertMsg = false;
          }
          $scope.registerSubmit=function(){
              $http({
                method:"POST",
                url:"app/data/addamis.php",
                data:$scope.registerData
              }).then(function(reponse){
                $scope.names = reponse.data;
                $scope.alertClass = 'success';
                console.log(reponse.data);
                $location.path('/amis');
              });
          }

        })


      .controller('articlecontroller', function($scope, $http) {
        $scope.getuserid = sessionStorage.uid;
        $http.post("app/data/artvoir.php")
        .then(function (response)
        {$scope.names = response.data;});

        $scope.deleteart=function(artid){
            $http({
              method:"POST",
              url:"app/data/supprimart.php",
              data:$scope.artid
            }).then(function(reponse){
              $scope.names = reponse.data;
              $scope.alertClass = 'success';
              console.log(reponse.data);
              $location.path('/amis');
            });
        }

      })

      .controller('artregiscontroller', function($scope, $http, $location) {

        $scope.getuserid = sessionStorage.uid;
        // var rep[] = ($scope.registerData,  $scope.getuserid);

        $scope.registerSubmit=function(){
            $http({
              method:"POST",
              url:"app/data/artregis.php",
              data: $scope.registerData
            }).then(function(reponse){
              $scope.names = reponse.data;
              // $scope.alertClass = 'success';
              console.log(reponse.data);
              $location.path('/article');
            });
        }
      })
      .controller('userregistercon', function($scope, $http, $location) {

        $scope.getuserid = sessionStorage.uid;
        // $scope.registerShow=function(){
        //   $scope.alertMsg = false;
        // }
        $scope.registerSubmit=function(){
            $http({
              method:"POST",
              url:"http://localhost:7000/api/adduser",
              // url:"app/data/userregister.php",
              data:$scope.registerData
            }).then(function(reponse){
              $scope.names = reponse.data;
              $scope.alertClass = 'success';
              console.log(reponse.data);
              $location.path('/login');
            });
        }
      })



      /// pour editer service
      .service('Thing', function ($resource) {
          return $resource('http://localhost:7000/api/adduser/:id', {id: '@id'}, {
            update: {
              method: 'PUT'
            }
          });
          })

      .controller('useredit', function($scope, $resource, $http, $location, Thing) {

        $scope.getuserid = sessionStorage.uid;
        $scope.things = Thing.query();


          $http.get("http://localhost:7000/api/user/:user_id")
          .then(function(response) {
          $scope.storage = response.data;
          console.log(reponse.data);
          });





        $scope.update = function (thing) {
        Thing.update({id: thing.id}).$promise.then(function () {
          console.log("ca march?");
          console.log(thing.id);
          $scope.things = Thing.query();
        })
        };

        // $scope.registerSubmit=function(){
        //     $http({
        //       method:"GET",
        //       url:"http://localhost:7000/api/user/:user_id",
        //       // url:"app/data/userregister.php",
        //       data:$scope.registerData
        //     }).then(function(reponse){
        //       $scope.names = reponse.data;
        //       $scope.alertClass = 'success';
        //       console.log(reponse.data);
        //       $location.path('/login');
        //     });
        // }


        thing.$save().then(function () {
          $scope.things = Thing.query();
        });

        // $location.path('/home');

      })
      // .controller('userregistercon', function($scope, $http, $location) {
      //
      //   $scope.getuserid = sessionStorage.uid;
      //   $scope.registerShow=function(){
      //     $scope.alertMsg = false;
      //   }
      //   $scope.registerSubmit=function(){
      //       $http({
      //         method:"POST",
      //         url:"app/data/userregister.php",
      //         data:$scope.registerData
      //       }).then(function(reponse){
      //         $scope.names = reponse.data;
      //         $scope.alertClass = 'success';
      //         console.log(reponse.data);
      //         $location.path('/login');
      //       });
      //   }
      // })

  .controller('loginController', function ($scope,loginService) {
    // $scope.user = [
    // {  username: ''},
    // {  password: ''},
    // {  mail: ''},
    // ];
    $scope.msgtxt='';

    // c'est diffrente que truc dessous
    $scope.login=function(user){
      // console.log($scope.user.mail);

        loginService.login(user, $scope);
        //appeler service
    };
  })
  // oublier '$http' sous la fonction
  .factory('sessionService',['$http', function($http){
    return{
      set:function(key,value){
        return sessionStorage.setItem(key,value);
      },
      get:function(key){
        return sessionStorage.getItem(key);
      },
      destroy:function(key){
        $http.post('app/data/destory_session.php');
        return sessionStorage.removeItem(key);
      }
    };
  }])
  .run(function($rootScope, $location, loginService){
      var routespermission=['/home']; // route that require login
      $rootScope.$on('$routeChangeStart', function(){

          if( routespermission.indexOf($location.path())  !=-1)
          {
              var connected=loginService.islogged();
              connected.then(function(msg){
                  if(!msg.data) $location.path('/login');
              });
          }
      });
})




// .service('Thing', function ($resource) {
//       return $resource('/api/things/:id', {id: '@id'}, {
//         update: {
//           method: 'put'
//         }
//       });
//     })
//     .controller('MainCtrl', function ($scope, Thing) {
//
//           $scope.things = Thing.query();
//
//           $scope.destroy = function (thing) {
//             Thing.remove({id: thing.id}).$promise.then(function () {
//               $scope.things = Thing.query();
//             })
//           };
//
//           $scope.update = function (thing) {
//             Thing.update({id: thing.id}, {status: !thing.status}).$promise.then(function () {
//               $scope.things = Thing.query();
//             })
//           };
//
//           $scope.create = function (form) {
//             var thing = new Thing({
//               name: $scope.name
//             });
//             thing.$save().then(function () {
//               $scope.things = Thing.query();
//             });
//           }
//         })
//





  .factory('loginService', function($http, $location, sessionService){
    return{
      login:function(data,scope){
        var $promise=$http.post('app/data/user.php',data);
        $promise.then(function(msg){
          console.log(msg);
          var uid=msg.data;
          if(uid){

            sessionService.set('uid',uid );//'user'
            $location.path('/home');
          }
          else {
            $location.path('/login');
            console.log(msgtxt);
            loginController.scope.msgtxt="incorrect!";
          }
        });
      },
      logout:function(){
          console.log('uid');
          sessionService.destroy('uid');//'user'
          $location.path('/login');
        },
      islogged:function(){

          var $checkSessionServer= $http.post('app/data/ckeck_session.php');
          return $checkSessionServer;
          // if(sessionService.get('user')) return true;
          // else return false;
        }
    }
  });
