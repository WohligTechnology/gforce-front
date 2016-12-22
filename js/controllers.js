angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper','duScroll'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $document, $location) {
  $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
  $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  console.log($stateParams.id);
  $scope.menutitle = NavigationService.makeactive($stateParams.id);

  function makeAnimation(id) {
    if (_.isEmpty(id)) {
      id = "home";
    }
    var someElement = angular.element(document.getElementById(id));
    $document.scrollToElement(someElement, 0, 1400);
  }

  $scope.$on('$viewContentLoaded', function(event) {
    setTimeout(function() {
      makeAnimation($stateParams.id);
    }, 1000);
  });


  $scope.changeURL = function(id) {
    $scope.menutitle = NavigationService.makeactive(id);
    $state.transitionTo('homeid', {
      id: id
    }, {
      notify: false
    });
    makeAnimation(id);
    $location.replace();
  };
  $scope.section = {
    one: "views/content/sections/landing.html",
    two: "views/content/sections/about.html",
    three: "views/content/sections/services.html",
    four: "views/content/sections/partners.html",
    five: "views/content/sections/hiring.html",
    six: "views/content/sections/contact.html",
  };
  function AllClient(data, status) {
    $scope.clients = data;
    $scope.clients = _.chunk($scope.clients, 9);
    for (var i = 0; i < $scope.clients.length; i++) {
      $scope.clients[i] = _.chunk($scope.clients[i], 3);
    }
  }
  $scope.clients = [
      'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
  ];
})

.controller('FormCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
  $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.formSubmitted = false;

  $scope.submitForm = function(data) {
    console.log(data);
    $scope.formSubmitted = true;
  };
  $scope.changeURL = function(id) {
    console.log(id);
    $location.path("" + id);
  };
})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $.fancybox.close(true);
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

  $scope.changeLanguage = function() {
    console.log("Language CLicked");

    if (!$.jStorage.get("language")) {
      $translate.use("hi");
      $.jStorage.set("language", "hi");
    } else {
      if ($.jStorage.get("language") == "en") {
        $translate.use("hi");
        $.jStorage.set("language", "hi");
      } else {
        $translate.use("en");
        $.jStorage.set("language", "en");
      }
    }
    //  $rootScope.$apply();
  };


})

;
