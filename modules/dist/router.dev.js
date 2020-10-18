"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = isEqual;
exports["default"] = exports.Route = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function _render(query, block) {
  var root = document.querySelector(query);
  root.innerHtml = block.render(); //console.log('root', root);
  //console.log('root', root);
  //console.log('innerhtml', root.innerHtml);

  return root;
}

var Route =
/*#__PURE__*/
function () {
  function Route(pathname, view, props) {
    _classCallCheck(this, Route);

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  _createClass(Route, [{
    key: "navigate",
    value: function navigate(pathname) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      if (this._block) {
        this._block.hide();
      }
    }
  }, {
    key: "match",
    value: function match(pathname) {
      return isEqual(pathname, this._pathname);
    }
  }, {
    key: "render",
    value: function render() {
      //console.log('block', this._block);        
      if (!this._block) {
        //console.log('rourter');
        this._block = new this._blockClass();
        console.log('rourter', this._block);

        _render(this._props.rootQuery, this._block);

        this._block.show();

        this._block.setEvents();

        window.currentBlock = this._block;
        return;
      }

      window.currentBlock = this._block;

      _render(this._props.rootQuery, this._block);

      this._block.setEvents(); //this._block.show();//TODO

    }
  }]);

  return Route;
}();

exports.Route = Route;

var Router =
/*#__PURE__*/
function () {
  function Router(rootQuery) {
    _classCallCheck(this, Router);

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._currentBlock = null;
    Router.__instance = this;
  }

  _createClass(Router, [{
    key: "use",
    value: function use(pathname, block) {
      var route = new Route(pathname, block, {
        rootQuery: this._rootQuery
      });
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      window.onpopstate = function (event) {
        _this._onRoute(event.currentTarget.location.pathname);
      }.bind(this); //console.log(window.location.pathname);


      this._onRoute(window.location.pathname);
    }
  }, {
    key: "_onRoute",
    value: function _onRoute(pathname) {
      var route = this.getRoute(pathname);

      if (!route) {
        return;
      }

      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      route.render(route, pathname);
      this._currentRoute = route;
      console.log('route', route);
    }
  }, {
    key: "go",
    value: function go(pathname) {
      this.history.pushState({}, "", pathname);

      this._onRoute(pathname);
    }
  }, {
    key: "back",
    value: function back() {
      console.log(this.history);
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      console.log(this.history);
      this.history.forward();
    }
  }, {
    key: "getRoute",
    value: function getRoute(pathname) {
      return this.routes.find(function (route) {
        return route.match(pathname);
      });
    }
  }]);

  return Router;
}();

exports["default"] = Router;