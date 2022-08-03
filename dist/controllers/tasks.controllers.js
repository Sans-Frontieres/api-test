"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var v4 = require("uuid").v4;

var _require = require("../server/db"),
    getConnection = _require.getConnection;
/**
 *
 * @param {*} __
 * @param {*} res
 */


var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(__, res) {
    var tasks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getConnection().get("tasks").value();

          case 2:
            tasks = _context.sent;
            res.json({
              tasks: tasks,
              count: tasks === null || tasks === void 0 ? void 0 : tasks.length
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var count = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(__, res) {
    var tasks;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getConnection().get("tasks").value();

          case 2:
            tasks = _context2.sent;
            res.json({
              count: tasks === null || tasks === void 0 ? void 0 : tasks.length
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function count(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var findByID = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, task;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return getConnection().get("tasks").find({
              id: id
            }).value();

          case 3:
            task = _context3.sent;

            if (task) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              error: "Tarea no encontrada."
            }));

          case 6:
            res.status(200).json(task);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var create = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, title, description, newTask, db;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description;
            newTask = {
              id: v4(),
              title: title,
              description: description
            };
            _context4.next = 4;
            return getConnection();

          case 4:
            db = _context4.sent;
            _context4.next = 7;
            return db.get("tasks").push(newTask).write();

          case 7:
            res.status(201).json(newTask.id);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function create(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, title, description, db, task;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context5.next = 4;
            return getConnection();

          case 4:
            db = _context5.sent;
            _context5.next = 7;
            return db.get("tasks").find({
              id: id
            }).value();

          case 7:
            task = _context5.sent;

            if (task) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "La tarea no fue encontrada."
            }));

          case 10:
            _context5.next = 12;
            return db.get("tasks").find({
              id: id
            }).assign({
              title: title,
              description: description
            }).write();

          case 12:
            res.status(200).json({
              id: id
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function update(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var remove = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, db, task;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return getConnection();

          case 3:
            db = _context6.sent;
            _context6.next = 6;
            return db.get("tasks").find({
              id: id
            }).value();

          case 6:
            task = _context6.sent;

            if (task) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "La tarea no fue encontrada."
            }));

          case 9:
            _context6.next = 11;
            return db.get("tasks").remove({
              id: id
            }).write();

          case 11:
            res.status(202).json({
              id: id
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function remove(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  getAll: getAll,
  create: create,
  count: count,
  findByID: findByID,
  update: update,
  remove: remove
};