Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return (col.expander || col.columns) && col.columns.some(function (col2) {
            return col2.expander;
          });
        });
        // The actual expander might be in the columns field of a group column
        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }

        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            var _ret = function () {
              dcol.id = dcol.id || dcol.accessor;
              var accessorString = dcol.accessor;
              dcol.accessor = function (row) {
                return _utils2.default.get(row, accessorString);
              };
              return {
                v: dcol
              };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function (d) {
              return undefined;
            };
          }

          return dcol;
        };

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };
        var allDecoratedColumns = [];
        var decoratedColumns = columnsWithExpander.map(function (column, i) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          } else {
            return decorateAndAddToAll(column);
          }
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column, i) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          (function () {
            // Retrieve the pivot columns in the correct pivot order
            var pivotColumns = [];
            pivotBy.forEach(function (pivotID) {
              var found = allDecoratedColumns.find(function (d) {
                return d.id === pivotID;
              });
              if (found) {
                pivotColumns.push(found);
              }
            });

            var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
              return prev && prev === current.parentColumn && current.parentColumn;
            }, pivotColumns[0].parentColumn);

            var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
            PivotGroupHeader = PivotGroupHeader || function () {
              return _react2.default.createElement(
                'strong',
                null,
                'Pivoted'
              );
            };

            var pivotColumnGroup = {
              Header: PivotGroupHeader,
              columns: pivotColumns.map(function (col) {
                return _extends({}, _this2.props.pivotDefaults, col, {
                  pivoted: true
                });
              })
            };

            // Place the pivotColumns back into the visibleColumns
            if (pivotIndex >= 0) {
              pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
              visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
            } else {
              visibleColumns.unshift(pivotColumnGroup);
            }
          })();
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this2.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flast list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column, i) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };
        var resolvedData = data.map(function (d, i) {
          return accessRow(d, i);
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });
        if (pivotBy.length) {
          (function () {
            var groupRecursively = function groupRecursively(rows, keys) {
              var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

              // This is the last level, just return the rows
              if (i === keys.length) {
                return rows;
              }
              // Group the rows together for this level
              var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
                var _ref3;

                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
              });
              // Recurse into the subRows
              groupedRows = groupedRows.map(function (rowGroup) {
                var _extends2;

                var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
                return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
              });
              return groupedRows;
            };
            resolvedData = groupRecursively(resolvedData, pivotBy);
          })();
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        this.props.onFetchData(this.getResolvedState(), this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            } else {
              return filteredSoFar.filter(function (row) {
                return filterMethod(nextFilter, row, column);
              });
            }
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id]);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id]);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = column.hasOwnProperty('defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
          d.desc = _utils2.default.isSortingDesc(d);
          return d;
        });
        if (!_utils2.default.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else {
            if (additive) {
              newSorted.push({
                id: column.id,
                desc: firstSortDirection
              });
            } else {
              newSorted = [{
                id: column.id,
                desc: firstSortDirection
              }];
            }
          }
        } else {
          (function () {
            // Multi-Sort
            var existingIndex = newSorted.findIndex(function (d) {
              return d.id === column[0].id;
            });
            // Existing Sorted Column
            if (existingIndex > -1) {
              var _existing = newSorted[existingIndex];
              if (_existing.desc === secondSortDirection) {
                if (additive) {
                  newSorted.splice(existingIndex, column.length);
                } else {
                  column.forEach(function (d, i) {
                    newSorted[existingIndex + i].desc = firstSortDirection;
                  });
                }
              } else {
                column.forEach(function (d, i) {
                  newSorted[existingIndex + i].desc = secondSortDirection;
                });
              }
              if (!additive) {
                newSorted = newSorted.slice(existingIndex, column.length);
              }
            } else {
              // New Sort Column
              if (additive) {
                newSorted = newSorted.concat(column.map(function (d) {
                  return {
                    id: d.id,
                    desc: firstSortDirection
                  };
                }));
              } else {
                newSorted = column.map(function (d) {
                  return {
                    id: d.id,
                    desc: firstSortDirection
                  };
                });
              }
            }
          })();
        }

        this.setStateWithData({
          page: (!sorted.length && newSorted.length) || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          if (x.id !== column.id) {
            return true;
          }
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var onResizedChange = this.props.onResizedChange;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing;

        // Delete old value


        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        // Set the min size to 10 to account for margin and border or else the group headers don't line up correctly
        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiY29tcGFjdE9iamVjdCIsIm5ld1N0YXRlIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImFnZ3JlZ2F0ZWRLZXkiLCJuZXN0aW5nTGV2ZWxLZXkiLCJvcmlnaW5hbEtleSIsImluZGV4S2V5IiwiZ3JvdXBlZEJ5UGl2b3RLZXkiLCJTdWJDb21wb25lbnQiLCJoYXNIZWFkZXJHcm91cHMiLCJmb3JFYWNoIiwiY29sdW1uIiwiY29sdW1uc1dpdGhFeHBhbmRlciIsImV4cGFuZGVyQ29sdW1uIiwiZmluZCIsImNvbCIsImV4cGFuZGVyIiwic29tZSIsImNvbDIiLCJtYWtlRGVjb3JhdGVkQ29sdW1uIiwicGFyZW50Q29sdW1uIiwiZGNvbCIsImV4cGFuZGVyRGVmYXVsdHMiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYWNjZXNzb3IiLCJpZCIsImFjY2Vzc29yU3RyaW5nIiwiZ2V0Iiwicm93IiwiY29uc29sZSIsIndhcm4iLCJFcnJvciIsInVuZGVmaW5lZCIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJhbGxEZWNvcmF0ZWRDb2x1bW5zIiwicHVzaCIsImRlY29yYXRlZENvbHVtbnMiLCJtYXAiLCJpIiwiZCIsInZpc2libGVDb2x1bW5zIiwic2xpY2UiLCJhbGxWaXNpYmxlQ29sdW1ucyIsInZpc2libGVTdWJDb2x1bW5zIiwiZmlsdGVyIiwiaW5kZXhPZiIsImdldEZpcnN0RGVmaW5lZCIsInNob3ciLCJsZW5ndGgiLCJwaXZvdEluZGV4IiwiZmluZEluZGV4IiwicGl2b3QiLCJwaXZvdENvbHVtbnMiLCJmb3VuZCIsInBpdm90SUQiLCJQaXZvdFBhcmVudENvbHVtbiIsInJlZHVjZSIsInByZXYiLCJjdXJyZW50IiwiUGl2b3RHcm91cEhlYWRlciIsIkhlYWRlciIsInBpdm90Q29sdW1uR3JvdXAiLCJwaXZvdERlZmF1bHRzIiwicGl2b3RlZCIsInNwbGljZSIsInVuc2hpZnQiLCJoZWFkZXJHcm91cHMiLCJjdXJyZW50U3BhbiIsImFkZEhlYWRlciIsImNvbmNhdCIsImFjY2Vzc1JvdyIsImxldmVsIiwicmVzb2x2ZWREYXRhIiwiYWdncmVnYXRlIiwiYWdncmVnYXRpb25WYWx1ZXMiLCJhZ2dyZWdhdGluZ0NvbHVtbnMiLCJ2YWx1ZXMiLCJyb3dzIiwiZ3JvdXBSZWN1cnNpdmVseSIsImtleXMiLCJncm91cGVkUm93cyIsIk9iamVjdCIsImVudHJpZXMiLCJncm91cEJ5Iiwia2V5IiwidmFsdWUiLCJzdWJSb3dzIiwicm93R3JvdXAiLCJtYW51YWwiLCJzb3J0ZWQiLCJmaWx0ZXJlZCIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJzb3J0TWV0aG9kc0J5Q29sdW1uSUQiLCJzb3J0TWV0aG9kIiwic29ydGVkRGF0YSIsInNvcnREYXRhIiwiZmlsdGVyRGF0YSIsIm9uRmV0Y2hEYXRhIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImZpbHRlcmVkRGF0YSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwieCIsImZpbHRlcmFibGUiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJvcmRlckJ5TWV0aG9kIiwib3JkZXJCeSIsInNvcnQiLCJhIiwiYiIsImRlZmF1bHRTb3J0TWV0aG9kIiwiZGVzYyIsIm1pblJvd3MiLCJnZXRTdGF0ZU9yUHJvcCIsInBhZ2UiLCJvblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImV4cGFuZGVkIiwic2V0U3RhdGVXaXRoRGF0YSIsIm5ld1BhZ2VTaXplIiwib25QYWdlU2l6ZUNoYW5nZSIsInBhZ2VTaXplIiwiY3VycmVudFJvdyIsIm5ld1BhZ2UiLCJNYXRoIiwiZmxvb3IiLCJhZGRpdGl2ZSIsInNraXBOZXh0U29ydCIsImRlZmF1bHRTb3J0RGVzYyIsImZpcnN0U29ydERpcmVjdGlvbiIsImhhc093blByb3BlcnR5Iiwic2Vjb25kU29ydERpcmVjdGlvbiIsIm9uU29ydGVkQ2hhbmdlIiwibmV3U29ydGVkIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJuZXdGaWx0ZXJpbmciLCJldmVudCIsImlzVG91Y2giLCJzdG9wUHJvcGFnYXRpb24iLCJwYXJlbnRXaWR0aCIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsInBhZ2VYIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cmFwRXZlbnRzIiwiY3VycmVudGx5UmVzaXppbmciLCJzdGFydFgiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemVDb2x1bW5Nb3ZpbmciLCJyZXNpemVDb2x1bW5FbmQiLCJvblJlc2l6ZWRDaGFuZ2UiLCJyZXNpemVkIiwibmV3UmVzaXplZCIsInR5cGUiLCJuZXdXaWR0aCIsIm1heCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBRWU7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUNBRU9BLEtBRlAsRUFFY0MsS0FGZCxFQUVxQjtBQUM5QixZQUFNQyw2QkFDRCxnQkFBRUMsYUFBRixDQUFnQixLQUFLRixLQUFyQixDQURDLEVBRUQsZ0JBQUVFLGFBQUYsQ0FBZ0IsS0FBS0gsS0FBckIsQ0FGQyxFQUdELGdCQUFFRyxhQUFGLENBQWdCRixLQUFoQixDQUhDLEVBSUQsZ0JBQUVFLGFBQUYsQ0FBZ0JILEtBQWhCLENBSkMsQ0FBTjtBQU1BLGVBQU9FLGFBQVA7QUFDRDtBQVZVO0FBQUE7QUFBQSxtQ0FZR0UsUUFaSCxFQVlhO0FBQUE7O0FBQUEsWUFFcEJDLE9BRm9CLEdBY2xCRCxRQWRrQixDQUVw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QUNBSCxpQkFBU1UsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBS1Isa0JBQS9DO0FBQ0FGLGlCQUFTVSxtQkFBVCxDQUE2QixTQUE3QixFQUF3QyxLQUFLUCxlQUE3QztBQUNBSCxpQkFBU1UsbUJBQVQsQ0FBNkIsWUFBN0IsRUFBMkMsS0FBS1AsZUFBaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSSxDQUFDZixPQUFMLEVBQWM7QUFDWixlQUFLeEIsZ0JBQUwsQ0FBc0I7QUFDcEJTLDBCQUFjLElBRE07QUFFcEJ5QiwrQkFBbUI7QUFGQyxXQUF0QjtBQUlEO0FBQ0Y7QUF4c0JVOztBQUFBO0FBQUEsSUFDQ2EsSUFERDtBQUFBLEMiLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2UgPT5cbiAgY2xhc3MgZXh0ZW5kcyBCYXNlIHtcbiAgICBnZXRSZXNvbHZlZFN0YXRlIChwcm9wcywgc3RhdGUpIHtcbiAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnN0YXRlKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMucHJvcHMpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3Qoc3RhdGUpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QocHJvcHMpLFxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkU3RhdGVcbiAgICB9XG5cbiAgICBnZXREYXRhTW9kZWwgKG5ld1N0YXRlKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsXG4gICAgICAgIHBpdm90QnkgPSBbXSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgcGl2b3RJREtleSxcbiAgICAgICAgcGl2b3RWYWxLZXksXG4gICAgICAgIHN1YlJvd3NLZXksXG4gICAgICAgIGFnZ3JlZ2F0ZWRLZXksXG4gICAgICAgIG5lc3RpbmdMZXZlbEtleSxcbiAgICAgICAgb3JpZ2luYWxLZXksXG4gICAgICAgIGluZGV4S2V5LFxuICAgICAgICBncm91cGVkQnlQaXZvdEtleSxcbiAgICAgICAgU3ViQ29tcG9uZW50LFxuICAgICAgfSA9IG5ld1N0YXRlXG5cbiAgICAgIC8vIERldGVybWluZSBIZWFkZXIgR3JvdXBzXG4gICAgICBsZXQgaGFzSGVhZGVyR3JvdXBzID0gZmFsc2VcbiAgICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBoYXNIZWFkZXJHcm91cHMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGxldCBjb2x1bW5zV2l0aEV4cGFuZGVyID0gWy4uLmNvbHVtbnNdXG5cbiAgICAgIGxldCBleHBhbmRlckNvbHVtbiA9IGNvbHVtbnMuZmluZChcbiAgICAgICAgY29sID0+XG4gICAgICAgICAgY29sLmV4cGFuZGVyIHx8XG4gICAgICAgICAgKGNvbC5jb2x1bW5zICYmIGNvbC5jb2x1bW5zLnNvbWUoY29sMiA9PiBjb2wyLmV4cGFuZGVyKSlcbiAgICAgIClcbiAgICAgIC8vIFRoZSBhY3R1YWwgZXhwYW5kZXIgbWlnaHQgYmUgaW4gdGhlIGNvbHVtbnMgZmllbGQgb2YgYSBncm91cCBjb2x1bW5cbiAgICAgIGlmIChleHBhbmRlckNvbHVtbiAmJiAhZXhwYW5kZXJDb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgZXhwYW5kZXJDb2x1bW4gPSBleHBhbmRlckNvbHVtbi5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5leHBhbmRlcilcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgaGF2ZSBTdWJDb21wb25lbnQncyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBoYXZlIGFuIGV4cGFuZGVyIGNvbHVtblxuICAgICAgaWYgKFN1YkNvbXBvbmVudCAmJiAhZXhwYW5kZXJDb2x1bW4pIHtcbiAgICAgICAgZXhwYW5kZXJDb2x1bW4gPSB7IGV4cGFuZGVyOiB0cnVlIH1cbiAgICAgICAgY29sdW1uc1dpdGhFeHBhbmRlciA9IFtleHBhbmRlckNvbHVtbiwgLi4uY29sdW1uc1dpdGhFeHBhbmRlcl1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFrZURlY29yYXRlZENvbHVtbiA9IChjb2x1bW4sIHBhcmVudENvbHVtbikgPT4ge1xuICAgICAgICBsZXQgZGNvbFxuICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgICAgZGNvbCA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5leHBhbmRlckRlZmF1bHRzLFxuICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIG1pbldpZHRoIGlzIG5vdCBncmVhdGVyIHRoYW4gbWF4V2lkdGggaWYgc2V0XG4gICAgICAgIGlmIChkY29sLm1heFdpZHRoIDwgZGNvbC5taW5XaWR0aCkge1xuICAgICAgICAgIGRjb2wubWluV2lkdGggPSBkY29sLm1heFdpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XG4gICAgICAgICAgZGNvbC5wYXJlbnRDb2x1bW4gPSBwYXJlbnRDb2x1bW5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcnN0IGNoZWNrIGZvciBzdHJpbmcgYWNjZXNzb3JcbiAgICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBjb25zdCBhY2Nlc3NvclN0cmluZyA9IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXG4gICAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBmdW5jdGlvbmFsIGFjY2Vzc29yIChidXQgcmVxdWlyZSBhbiBJRClcbiAgICAgICAgaWYgKGRjb2wuYWNjZXNzb3IgJiYgIWRjb2wuaWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZGNvbClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQSBjb2x1bW4gaWQgaXMgcmVxdWlyZWQgaWYgdXNpbmcgYSBub24tc3RyaW5nIGFjY2Vzc29yIGZvciBjb2x1bW4gYWJvdmUuJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBhbiB1bmRlZmluZWQgYWNjZXNzb3JcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9IGQgPT4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgfVxuXG4gICAgICAvLyBEZWNvcmF0ZSB0aGUgY29sdW1uc1xuICAgICAgY29uc3QgZGVjb3JhdGVBbmRBZGRUb0FsbCA9IChjb2x1bW4sIHBhcmVudENvbHVtbikgPT4ge1xuICAgICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW4gPSBtYWtlRGVjb3JhdGVkQ29sdW1uKGNvbHVtbiwgcGFyZW50Q29sdW1uKVxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLnB1c2goZGVjb3JhdGVkQ29sdW1uKVxuICAgICAgICByZXR1cm4gZGVjb3JhdGVkQ29sdW1uXG4gICAgICB9XG4gICAgICBjb25zdCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cbiAgICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbnMgPSBjb2x1bW5zV2l0aEV4cGFuZGVyLm1hcCgoY29sdW1uLCBpKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW4uY29sdW1ucy5tYXAoZCA9PiBkZWNvcmF0ZUFuZEFkZFRvQWxsKGQsIGNvbHVtbikpLFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcbiAgICAgIGxldCB2aXNpYmxlQ29sdW1ucyA9IGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKVxuICAgICAgbGV0IGFsbFZpc2libGVDb2x1bW5zID0gW11cblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCB2aXNpYmxlU3ViQ29sdW1ucyA9IGNvbHVtbi5jb2x1bW5zLmZpbHRlcihcbiAgICAgICAgICAgIGQgPT5cbiAgICAgICAgICAgICAgcGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTFcbiAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgOiBfLmdldEZpcnN0RGVmaW5lZChkLnNob3csIHRydWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiB2aXNpYmxlU3ViQ29sdW1ucyxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHVtblxuICAgICAgfSlcblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5jb2x1bW5zXG4gICAgICAgICAgPyBjb2x1bW4uY29sdW1ucy5sZW5ndGhcbiAgICAgICAgICA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTFcbiAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgIDogXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnNob3csIHRydWUpXG4gICAgICB9KVxuXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cbiAgICAgIGNvbnN0IHBpdm90SW5kZXggPSB2aXNpYmxlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5waXZvdClcblxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgcGl2b3QgY29sdW1ucyBpbiB0aGUgY29ycmVjdCBwaXZvdCBvcmRlclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxuICAgICAgICBwaXZvdEJ5LmZvckVhY2gocGl2b3RJRCA9PiB7XG4gICAgICAgICAgY29uc3QgZm91bmQgPSBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbmQoZCA9PiBkLmlkID09PSBwaXZvdElEKVxuICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgcGl2b3RDb2x1bW5zLnB1c2goZm91bmQpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCBQaXZvdFBhcmVudENvbHVtbiA9IHBpdm90Q29sdW1ucy5yZWR1Y2UoXG4gICAgICAgICAgKHByZXYsIGN1cnJlbnQpID0+XG4gICAgICAgICAgICBwcmV2ICYmIHByZXYgPT09IGN1cnJlbnQucGFyZW50Q29sdW1uICYmIGN1cnJlbnQucGFyZW50Q29sdW1uLFxuICAgICAgICAgIHBpdm90Q29sdW1uc1swXS5wYXJlbnRDb2x1bW5cbiAgICAgICAgKVxuXG4gICAgICAgIGxldCBQaXZvdEdyb3VwSGVhZGVyID0gaGFzSGVhZGVyR3JvdXBzICYmIFBpdm90UGFyZW50Q29sdW1uLkhlYWRlclxuICAgICAgICBQaXZvdEdyb3VwSGVhZGVyID0gUGl2b3RHcm91cEhlYWRlciB8fCAoKCkgPT4gPHN0cm9uZz5QaXZvdGVkPC9zdHJvbmc+KVxuXG4gICAgICAgIGxldCBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgIEhlYWRlcjogUGl2b3RHcm91cEhlYWRlcixcbiAgICAgICAgICBjb2x1bW5zOiBwaXZvdENvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5waXZvdERlZmF1bHRzLFxuICAgICAgICAgICAgLi4uY29sLFxuICAgICAgICAgICAgcGl2b3RlZDogdHJ1ZSxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cblxuICAgICAgICAvLyBQbGFjZSB0aGUgcGl2b3RDb2x1bW5zIGJhY2sgaW50byB0aGUgdmlzaWJsZUNvbHVtbnNcbiAgICAgICAgaWYgKHBpdm90SW5kZXggPj0gMCkge1xuICAgICAgICAgIHBpdm90Q29sdW1uR3JvdXAgPSB7XG4gICAgICAgICAgICAuLi52aXNpYmxlQ29sdW1uc1twaXZvdEluZGV4XSxcbiAgICAgICAgICAgIC4uLnBpdm90Q29sdW1uR3JvdXAsXG4gICAgICAgICAgfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnNwbGljZShwaXZvdEluZGV4LCAxLCBwaXZvdENvbHVtbkdyb3VwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnVuc2hpZnQocGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCdWlsZCBIZWFkZXIgR3JvdXBzXG4gICAgICBjb25zdCBoZWFkZXJHcm91cHMgPSBbXVxuICAgICAgbGV0IGN1cnJlbnRTcGFuID0gW11cblxuICAgICAgLy8gQSBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byBhZGQgYSBoZWFkZXIgYW5kIHJlc2V0IHRoZSBjdXJyZW50U3BhblxuICAgICAgY29uc3QgYWRkSGVhZGVyID0gKGNvbHVtbnMsIGNvbHVtbikgPT4ge1xuICAgICAgICBoZWFkZXJHcm91cHMucHVzaCh7XG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMsXG4gICAgICAgIH0pXG4gICAgICAgIGN1cnJlbnRTcGFuID0gW11cbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgZmxhc3QgbGlzdCBvZiBhbGxWaXNpYmxlQ29sdW1ucyBhbmQgSGVhZGVyR3JvdXBzXG4gICAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGkpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMgPSBhbGxWaXNpYmxlQ29sdW1ucy5jb25jYXQoY29sdW1uLmNvbHVtbnMpXG4gICAgICAgICAgaWYgKGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSGVhZGVyKGNvbHVtbi5jb2x1bW5zLCBjb2x1bW4pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMucHVzaChjb2x1bW4pXG4gICAgICAgIGN1cnJlbnRTcGFuLnB1c2goY29sdW1uKVxuICAgICAgfSlcbiAgICAgIGlmIChoYXNIZWFkZXJHcm91cHMgJiYgY3VycmVudFNwYW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXG4gICAgICB9XG5cbiAgICAgIC8vIEFjY2VzcyB0aGUgZGF0YVxuICAgICAgY29uc3QgYWNjZXNzUm93ID0gKGQsIGksIGxldmVsID0gMCkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSB7XG4gICAgICAgICAgW29yaWdpbmFsS2V5XTogZCxcbiAgICAgICAgICBbaW5kZXhLZXldOiBpLFxuICAgICAgICAgIFtzdWJSb3dzS2V5XTogZFtzdWJSb3dzS2V5XSxcbiAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogbGV2ZWwsXG4gICAgICAgIH1cbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikgcmV0dXJuXG4gICAgICAgICAgcm93W2NvbHVtbi5pZF0gPSBjb2x1bW4uYWNjZXNzb3IoZClcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJvd1tzdWJSb3dzS2V5XSkge1xuICAgICAgICAgIHJvd1tzdWJSb3dzS2V5XSA9IHJvd1tzdWJSb3dzS2V5XS5tYXAoKGQsIGkpID0+XG4gICAgICAgICAgICBhY2Nlc3NSb3coZCwgaSwgbGV2ZWwgKyAxKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9XG4gICAgICBsZXQgcmVzb2x2ZWREYXRhID0gZGF0YS5tYXAoKGQsIGkpID0+IGFjY2Vzc1JvdyhkLCBpKSlcblxuICAgICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXG4gICAgICBjb25zdCBhZ2dyZWdhdGUgPSByb3dzID0+IHtcbiAgICAgICAgY29uc3QgYWdncmVnYXRpb25WYWx1ZXMgPSB7fVxuICAgICAgICBhZ2dyZWdhdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxuICAgICAgICAgIGFnZ3JlZ2F0aW9uVmFsdWVzW2NvbHVtbi5pZF0gPSBjb2x1bW4uYWdncmVnYXRlKHZhbHVlcywgcm93cylcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IE1ha2UgaXQgcG9zc2libGUgdG8gZmFicmljYXRlIG5lc3RlZCByb3dzIHdpdGhvdXQgcGl2b3RpbmdcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmZpbHRlcihcbiAgICAgICAgZCA9PiAhZC5leHBhbmRlciAmJiBkLmFnZ3JlZ2F0ZVxuICAgICAgKVxuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwUmVjdXJzaXZlbHkgPSAocm93cywga2V5cywgaSA9IDApID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGxldmVsLCBqdXN0IHJldHVybiB0aGUgcm93c1xuICAgICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcbiAgICAgICAgICBsZXQgZ3JvdXBlZFJvd3MgPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgICAgIF8uZ3JvdXBCeShyb3dzLCBrZXlzW2ldKVxuICAgICAgICAgICkubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcbiAgICAgICAgICAgICAgW3Bpdm90VmFsS2V5XToga2V5LFxuICAgICAgICAgICAgICBba2V5c1tpXV06IGtleSxcbiAgICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZSxcbiAgICAgICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGksXG4gICAgICAgICAgICAgIFtncm91cGVkQnlQaXZvdEtleV06IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAvLyBSZWN1cnNlIGludG8gdGhlIHN1YlJvd3NcbiAgICAgICAgICBncm91cGVkUm93cyA9IGdyb3VwZWRSb3dzLm1hcChyb3dHcm91cCA9PiB7XG4gICAgICAgICAgICBsZXQgc3ViUm93cyA9IGdyb3VwUmVjdXJzaXZlbHkocm93R3JvdXBbc3ViUm93c0tleV0sIGtleXMsIGkgKyAxKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucm93R3JvdXAsXG4gICAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogc3ViUm93cyxcbiAgICAgICAgICAgICAgW2FnZ3JlZ2F0ZWRLZXldOiB0cnVlLFxuICAgICAgICAgICAgICAuLi5hZ2dyZWdhdGUoc3ViUm93cyksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gZ3JvdXBlZFJvd3NcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZERhdGEgPSBncm91cFJlY3Vyc2l2ZWx5KHJlc29sdmVkRGF0YSwgcGl2b3RCeSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3U3RhdGUsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGhlYWRlckdyb3VwcyxcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcbiAgICAgICAgaGFzSGVhZGVyR3JvdXBzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvcnRlZERhdGEgKHJlc29sdmVkU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFudWFsLFxuICAgICAgICBzb3J0ZWQsXG4gICAgICAgIGZpbHRlcmVkLFxuICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgfSA9IHJlc29sdmVkU3RhdGVcblxuICAgICAgY29uc3Qgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge31cblxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC5zb3J0TWV0aG9kKS5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFtjb2wuaWRdID0gY29sLnNvcnRNZXRob2RcbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGEgZnJvbSBlaXRoZXIgbWFudWFsIGRhdGEgb3Igc29ydGVkIGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvcnRlZERhdGE6IG1hbnVhbFxuICAgICAgICAgID8gcmVzb2x2ZWREYXRhXG4gICAgICAgICAgOiB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhKFxuICAgICAgICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgICAgICAgIGZpbHRlcmVkLFxuICAgICAgICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1uc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNvcnRlZCxcbiAgICAgICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFxuICAgICAgICAgICksXG4gICAgICB9XG4gICAgfVxuXG4gICAgZmlyZUZldGNoRGF0YSAoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRmV0Y2hEYXRhKHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpLCB0aGlzKVxuICAgIH1cblxuICAgIGdldFByb3BPclN0YXRlIChrZXkpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzW2tleV0sIHRoaXMuc3RhdGVba2V5XSlcbiAgICB9XG5cbiAgICBnZXRTdGF0ZU9yUHJvcCAoa2V5KSB7XG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5zdGF0ZVtrZXldLCB0aGlzLnByb3BzW2tleV0pXG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YSAoZGF0YSwgZmlsdGVyZWQsIGRlZmF1bHRGaWx0ZXJNZXRob2QsIGFsbFZpc2libGVDb2x1bW5zKSB7XG4gICAgICBsZXQgZmlsdGVyZWREYXRhID0gZGF0YVxuXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkLnJlZHVjZSgoZmlsdGVyZWRTb0ZhciwgbmV4dEZpbHRlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zLmZpbmQoeCA9PiB4LmlkID09PSBuZXh0RmlsdGVyLmlkKVxuXG4gICAgICAgICAgLy8gRG9uJ3QgZmlsdGVyIGhpZGRlbiBjb2x1bW5zIG9yIGNvbHVtbnMgdGhhdCBoYXZlIGhhZCB0aGVpciBmaWx0ZXJzIGRpc2FibGVkXG4gICAgICAgICAgaWYgKCFjb2x1bW4gfHwgY29sdW1uLmZpbHRlcmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRTb0ZhclxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZpbHRlck1ldGhvZCA9IGNvbHVtbi5maWx0ZXJNZXRob2QgfHwgZGVmYXVsdEZpbHRlck1ldGhvZFxuXG4gICAgICAgICAgLy8gSWYgJ2ZpbHRlckFsbCcgaXMgc2V0IHRvIHRydWUsIHBhc3MgdGhlIGVudGlyZSBkYXRhc2V0IHRvIHRoZSBmaWx0ZXIgbWV0aG9kXG4gICAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXJBbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgZmlsdGVyZWRTb0ZhciwgY29sdW1uKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRTb0Zhci5maWx0ZXIocm93ID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCByb3csIGNvbHVtbilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LCBmaWx0ZXJlZERhdGEpXG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXG4gICAgICAgIC8vIGZpbHRlciBhbnkgcm93cyB3aXRob3V0IHN1YmNvbHVtbnMgYmVjYXVzZSBpdCB3b3VsZCBiZSBzdHJhbmdlIHRvIHNob3dcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhXG4gICAgICAgICAgLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gcm93XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3csXG4gICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN1YlJvd3NLZXldOiB0aGlzLmZpbHRlckRhdGEoXG4gICAgICAgICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcbiAgICAgICAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1uc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuXG4gICAgc29ydERhdGEgKGRhdGEsIHNvcnRlZCwgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge30pIHtcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxuICAgICAgICBkYXRhLFxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAgICAgICBpZiAoc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXShhW3NvcnQuaWRdLCBiW3NvcnQuaWRdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRlZmF1bHRTb3J0TWV0aG9kKGFbc29ydC5pZF0sIGJbc29ydC5pZF0pXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgc29ydGVkLm1hcChkID0+ICFkLmRlc2MpLFxuICAgICAgICB0aGlzLnByb3BzLmluZGV4S2V5XG4gICAgICApXG5cbiAgICAgIHNvcnRlZERhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0gPSB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgIHNvcnRlZCxcbiAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHNvcnRlZERhdGFcbiAgICB9XG5cbiAgICBnZXRNaW5Sb3dzICgpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZChcbiAgICAgICAgdGhpcy5wcm9wcy5taW5Sb3dzLFxuICAgICAgICB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlU2l6ZScpXG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gVXNlciBhY3Rpb25zXG4gICAgb25QYWdlQ2hhbmdlIChwYWdlKSB7XG4gICAgICBjb25zdCB7IG9uUGFnZUNoYW5nZSwgY29sbGFwc2VPblBhZ2VDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IHBhZ2UgfVxuICAgICAgaWYgKGNvbGxhcHNlT25QYWdlQ2hhbmdlKSB7XG4gICAgICAgIG5ld1N0YXRlLmV4cGFuZGVkID0ge31cbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShuZXdTdGF0ZSwgKCkgPT4ge1xuICAgICAgICBvblBhZ2VDaGFuZ2UgJiYgb25QYWdlQ2hhbmdlKHBhZ2UpXG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XG4gICAgICBjb25zdCB7IG9uUGFnZVNpemVDaGFuZ2UgfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2UgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGFnZSB0byBkaXNwbGF5XG4gICAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXG4gICAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VTaXplOiBuZXdQYWdlU2l6ZSxcbiAgICAgICAgICBwYWdlOiBuZXdQYWdlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZSAmJiBvblBhZ2VTaXplQ2hhbmdlKG5ld1BhZ2VTaXplLCBuZXdQYWdlKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xuICAgICAgY29uc3QgeyBzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBjb2x1bW4uaGFzT3duUHJvcGVydHkoJ2RlZmF1bHRTb3J0RGVzYycpXG4gICAgICAgID8gY29sdW1uLmRlZmF1bHRTb3J0RGVzY1xuICAgICAgICA6IGRlZmF1bHRTb3J0RGVzY1xuICAgICAgY29uc3Qgc2Vjb25kU29ydERpcmVjdGlvbiA9ICFmaXJzdFNvcnREaXJlY3Rpb25cblxuICAgICAgLy8gd2UgY2FuJ3Qgc3RvcCBldmVudCBwcm9wYWdhdGlvbiBmcm9tIHRoZSBjb2x1bW4gcmVzaXplIG1vdmUgaGFuZGxlcnNcbiAgICAgIC8vIGF0dGFjaGVkIHRvIHRoZSBkb2N1bWVudCBiZWNhdXNlIG9mIHJlYWN0J3Mgc3ludGhldGljIGV2ZW50c1xuICAgICAgLy8gc28gd2UgaGF2ZSB0byBwcmV2ZW50IHRoZSBzb3J0IGZ1bmN0aW9uIGZyb20gYWN0dWFsbHkgc29ydGluZ1xuICAgICAgLy8gaWYgd2UgY2xpY2sgb24gdGhlIGNvbHVtbiByZXNpemUgZWxlbWVudCB3aXRoaW4gYSBoZWFkZXIuXG4gICAgICBpZiAoc2tpcE5leHRTb3J0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgc2tpcE5leHRTb3J0OiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgb25Tb3J0ZWRDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgbGV0IG5ld1NvcnRlZCA9IF8uY2xvbmUoc29ydGVkIHx8IFtdKS5tYXAoZCA9PiB7XG4gICAgICAgIGQuZGVzYyA9IF8uaXNTb3J0aW5nRGVzYyhkKVxuICAgICAgICByZXR1cm4gZFxuICAgICAgfSlcbiAgICAgIGlmICghXy5pc0FycmF5KGNvbHVtbikpIHtcbiAgICAgICAgLy8gU2luZ2xlLVNvcnRcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRlZC5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCAxKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IGZpcnN0U29ydERpcmVjdGlvblxuICAgICAgICAgICAgICBuZXdTb3J0ZWQgPSBbZXhpc3RpbmddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4aXN0aW5nLmRlc2MgPSBzZWNvbmRTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgICBuZXdTb3J0ZWQucHVzaCh7XG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTXVsdGktU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtblswXS5pZClcbiAgICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxuICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleF1cbiAgICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYyA9PT0gc2Vjb25kU29ydERpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZC5zcGxpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZFtleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5zbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cbiAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5jb25jYXQoXG4gICAgICAgICAgICAgIGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2U6XG4gICAgICAgICAgICAoIXNvcnRlZC5sZW5ndGggJiYgbmV3U29ydGVkLmxlbmd0aCkgfHwgIWFkZGl0aXZlXG4gICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICA6IHRoaXMuc3RhdGUucGFnZSxcbiAgICAgICAgICBzb3J0ZWQ6IG5ld1NvcnRlZCxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIG9uU29ydGVkQ2hhbmdlICYmIG9uU29ydGVkQ2hhbmdlKG5ld1NvcnRlZCwgY29sdW1uLCBhZGRpdGl2ZSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZpbHRlckNvbHVtbiAoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgY29uc3QgeyBmaWx0ZXJlZCB9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcbiAgICAgIGNvbnN0IHsgb25GaWx0ZXJlZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAvLyBSZW1vdmUgb2xkIGZpbHRlciBmaXJzdCBpZiBpdCBleGlzdHNcbiAgICAgIGNvbnN0IG5ld0ZpbHRlcmluZyA9IChmaWx0ZXJlZCB8fCBbXSkuZmlsdGVyKHggPT4ge1xuICAgICAgICBpZiAoeC5pZCAhPT0gY29sdW1uLmlkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGZpbHRlcmVkOiBuZXdGaWx0ZXJpbmcsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBvbkZpbHRlcmVkQ2hhbmdlICYmIG9uRmlsdGVyZWRDaGFuZ2UobmV3RmlsdGVyaW5nLCBjb2x1bW4sIHZhbHVlKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uU3RhcnQgKGV2ZW50LCBjb2x1bW4sIGlzVG91Y2gpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIC53aWR0aFxuXG4gICAgICBsZXQgcGFnZVhcbiAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmFwRXZlbnRzID0gdHJ1ZVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICAgICAgcGFyZW50V2lkdGg6IHBhcmVudFdpZHRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHsgb25SZXNpemVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7IHJlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICAvLyBEZWxldGUgb2xkIHZhbHVlXG4gICAgICBjb25zdCBuZXdSZXNpemVkID0gcmVzaXplZC5maWx0ZXIoeCA9PiB4LmlkICE9PSBjdXJyZW50bHlSZXNpemluZy5pZClcblxuICAgICAgbGV0IHBhZ2VYXG5cbiAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSBtaW4gc2l6ZSB0byAxMCB0byBhY2NvdW50IGZvciBtYXJnaW4gYW5kIGJvcmRlciBvciBlbHNlIHRoZSBncm91cCBoZWFkZXJzIGRvbid0IGxpbmUgdXAgY29ycmVjdGx5XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWF4KFxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxuICAgICAgICAxMVxuICAgICAgKVxuXG4gICAgICBuZXdSZXNpemVkLnB1c2goe1xuICAgICAgICBpZDogY3VycmVudGx5UmVzaXppbmcuaWQsXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHJlc2l6ZWQ6IG5ld1Jlc2l6ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBvblJlc2l6ZWRDaGFuZ2UgJiYgb25SZXNpemVkQ2hhbmdlKG5ld1Jlc2l6ZWQsIGV2ZW50KVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGxldCBpc1RvdWNoID0gZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJyB8fCBldmVudC50eXBlID09PSAndG91Y2hjYW5jZWwnXG5cbiAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdHMgYSB0b3VjaCBldmVudCBjbGVhciB0aGUgbW91c2Ugb25lJ3MgYXMgd2VsbCBiZWNhdXNlIHNvbWV0aW1lc1xuICAgICAgLy8gdGhlIG1vdXNlRG93biBldmVudCBnZXRzIGNhbGxlZCBhcyB3ZWxsLCBidXQgdGhlIG1vdXNlVXAgZXZlbnQgZG9lc24ndFxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG5cbiAgICAgIC8vIFRoZSB0b3VjaCBldmVudHMgZG9uJ3QgcHJvcGFnYXRlIHVwIHRvIHRoZSBzb3J0aW5nJ3Mgb25Nb3VzZURvd24gZXZlbnQgc29cbiAgICAgIC8vIG5vIG5lZWQgdG8gcHJldmVudCBpdCBmcm9tIGhhcHBlbmluZyBvciBlbHNlIHRoZSBmaXJzdCBjbGljayBhZnRlciBhIHRvdWNoXG4gICAgICAvLyBldmVudCByZXNpemUgd2lsbCBub3Qgc29ydCB0aGUgY29sdW1uLlxuICAgICAgaWYgKCFpc1RvdWNoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgc2tpcE5leHRTb3J0OiB0cnVlLFxuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==