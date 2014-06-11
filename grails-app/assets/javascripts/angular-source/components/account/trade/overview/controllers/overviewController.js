//=require angular-source/components/account/trade/overview/overview.module

'use strict';

angular.module('account.trade.overview').controller('OverviewController', [
    '$scope', 'OverviewService', function ($scope, overviewService) {
        var loaded = false;

        overviewService.query()
            .success(function (data) {
                $scope.rates = data;
                loaded = true;
            }).error(function () {
                $scope.rates = [];
                loaded = true;
            });

        $scope.isLoaded = function () {
            return !loaded;
        };

        $scope.sort = {
            predicate: 'CurrencyPair',
            reverse: true
        };

        $scope.getSortingClass = function (columnName) {
            var className = 'sorting';

            if ($scope.sort.predicate === columnName) {
                $scope.sort.reverse ? className += '_asc' : className += '_desc';
            }

            return className;
        };

        $scope.updateSorting = function (columnName) {
            if ($scope.sort.predicate === columnName) {
                $scope.sort.reverse = !$scope.sort.reverse;
            } else {
                $scope.sort.predicate = columnName;
                $scope.sort.reverse = true;
            }
        };

        $scope.pageChanged = function () {
            recalculateMinAndMax();
            filterCollection();
        };

        function filterCollection() {
            $scope.filteredRates = $scope.rates.slice($scope.currentMinIndex, $scope.currentMaxIndex);
        }

        function recalculateMinAndMax() {
            $scope.currentMinIndex = ($scope.currentPage - 1) * 10;
            $scope.currentMaxIndex = Math.min($scope.totalItems, $scope.currentPage * 10);
        }
    }]);