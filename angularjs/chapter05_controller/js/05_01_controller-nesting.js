var app = angular.module("myApp", []);
app.controller('ParentController', function($scope) {
		$scope.person = {greeted: false};
});
app.controller('ChildController', function($scope) {
	$scope.sayHello = function() {
		$scope.person.name = 'Ari Lerner';
	};
});