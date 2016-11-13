(function () {
    "use strict";
    angular.module('trayApp', []);

    angular.module('trayApp')
        .controller('mainCtrl', Controller);

    function Controller($scope) {
        $scope.gauges = ["1", "2", "3", "4", "5", "6", "7", "8"];

        console.log('eee');
    }

})();

(function () {
    angular.module('trayApp')
        .directive('gauge', Directive);

    function Directive() {
        var curId = 1;

        function Link(scope, element, attributes) {
            scope.uniqueId = 'gg' + curId++;
            scope.uniqueBut = 'bb' + curId;
        }

        function Controller($scope, $timeout) {

            $timeout(function () {
                var dflt = {
                    min: 0,
                    max: 100,
                    donut: true,
                    gaugeWidthScale: 0.6,
                    counter: true,
                    hideInnerShadow: false
                }
                $scope.title = 'Food tray #' + $scope.uniqueId.replace('gg', '');
                $scope.value = 100;
                $scope.gg = new JustGage({
                    id: $scope.uniqueId,
                    value: 100,
                    //title: 'Food tray #' + $scope.uniqueId.replace('gg',''),
                    defaults: dflt,
                    levelColors: [
                        "#FF4136",
                        "#FF851B",
                        "#2ECC40"
                    ]
                });

                $scope.resetValue = function(){
                    $scope.value = 100;
                    $scope.gg.refresh($scope.value);
                }
                var buttons9Click = Array.prototype.slice.call(document.querySelectorAll('button.btn-8g')),
                    totalButtons9Click = buttons9Click.length;

                buttons9Click.forEach(function (el, i) { el.addEventListener('click', activate, false); });

                function activate() {
                    var self = this, activatedClass = 'btn-activated';

                    if (classie.has(this, 'btn-8g')) {
                        // if it is the first of the two btn-8g then activatedClass = 'btn-success3d';
                        // if it is the second then activatedClass = 'btn-error3d'
                        activatedClass = 'btn-success3d';
                    }

                    if (!classie.has(this, activatedClass)) {
                        classie.add(this, activatedClass);
                        setTimeout(function () { classie.remove(self, activatedClass) }, 1000);
                    }
                }

                function getRandom(fromV, to) {
                    return Math.round(Math.random() * to + fromV);
                }

                setInterval(function () {
                    $scope.value = $scope.value - getRandom(0, 7);
                    $scope.gg.refresh($scope.value);
                }, getRandom(3000, 6000));
            }, 1);
        }

        return {
            restrict: 'E',
            link: Link,
            template: `<div class="card"><div class="panel-heading">{{title}}</div><div id="{{uniqueId}}">
            			
				</div><button class="btn btn-8 btn-8g" style="margin-left:auto;margin-right:auto;" id="{{uniqueBut}}" ng-click="resetValue()">Refill</button>
                <div style="height:20px;"></div></div>`,
            controller: Controller
        }
    }
})();