"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var main = document.getElementById('main');
var allUsers = document.getElementById('all-users');
var userInfo = document.getElementById('user-info');
var allNames = [];
var allUsersData = [];
var contentUsers = document.getElementById('content-users');
var allUserCheck = document.getElementById('select-all-users');
var deleteAllButton = document.getElementById('delete-all-users');
var allUsersButtons = Array.from(document.querySelectorAll('.content__user .button'));
var allUserChecks = Array.from(document.querySelectorAll('.content__user .content__checkbox'));
var topBarTitle = document.getElementById('top-bar-title');
var addUserButton = document.getElementById('add-user');
var updateUserButton = document.getElementById('update-user'); //capturar la informacion para insertar en la base de datos

var userName = document.getElementById('user-info-name');
var userSurName = document.getElementById('user-info-surname');
var userEmail = document.getElementById('user-info-email');
var userTipoOp = document.getElementById('tipo_op');
var searchText = document.getElementById('search-text');
var newUser = true;

var showUserInfo = function showUserInfo() {
  allUsers.classList.add('all-users--hide');
  userInfo.classList.add('user-info--show');
};

var hideUserInfo = function hideUserInfo() {
  allUsers.classList.remove('all-users--hide');
  userInfo.classList.remove('user-info--show');
};

var selectUser = function selectUser(id) {
  var element = document.getElementById(id);
  allUsersButtons = Array.from(document.querySelectorAll('.content__user .button'));
  allUserChecks = Array.from(document.querySelectorAll('.content__user .content__checkbox'));

  if (element.checked) {
    allUserChecks.map(function (check) {
      return check.checked = false;
    });
    element.checked = true;
    allUsersButtons.map(function (button) {
      return button.classList.add('button--hide');
    });
    Array.from(element.parentElement.querySelectorAll('.button')).map(function (button) {
      return button.classList.remove('button--hide');
    });
  } else {
    allUsersButtons.map(function (button) {
      return button.classList.remove('button--hide');
    });
  }
};

var selectAllUser = function selectAllUser() {
  allUsersButtons = Array.from(document.querySelectorAll('.content__user .button'));
  allUserChecks = Array.from(document.querySelectorAll('.content__user .content__checkbox'));

  if (allUserCheck.checked) {
    allUserChecks.map(function (check) {
      return check.checked = true;
    });
    allUsersButtons.map(function (button) {
      return button.classList.add('button--hide');
    });
    deleteAllButton.classList.remove('button--hide');
  } else {
    allUserChecks.map(function (check) {
      return check.checked = false;
    });
    allUsersButtons.map(function (button) {
      return button.classList.remove('button--hide');
    });
    deleteAllButton.classList.add('button--hide');
  }
};

var addUser = function addUser() {
  topBarTitle.textContent = 'New User';
  addUserButton.classList.remove('button--hide');
  updateUserButton.classList.add('button--hide');
};

var saveUser = function saveUser(id) {
  topBarTitle.textContent = 'Edit User';
  addUserButton.classList.add('button--hide');
  updateUserButton.classList.remove('button--hide');
  var user = getUserId(id);
  userName.value = user.name;
  userSurName.value = user.surname;
  userEmail.value = user.email;
  updateUserButton.dataset.id = user.id;
};

var getUserId = function getUserId(id) {
  id = id.substring(id.lastIndexOf('-') + 1);
  var user = allUsersData.filter(function (user) {
    return user.id == id;
  })[0];
  return user;
};

var getAllUser = function getAllUser() {
  var path = 'php/read-all.php';
  fetch(path).then(function (response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error('Failed to load'));
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    allUsersData = data;
    var fragment = document.createDocumentFragment();

    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var user = _step.value;
        fragment.appendChild(createUserRow(user));
      } //para vaciar el formulario cuando hace la consulta

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    contentUsers.innerHTML = '';
    contentUsers.appendChild(fragment);
    allNames = Array.from(document.querySelectorAll('[data-name]'));
  })["catch"](function (error) {
    return console.log("Error: ".concat(error.message));
  });
};

var createUserRow = function createUserRow(user) {
  /*
    .content__user
      input(type="checkbox" id="id-1").content__checkbox
      p(data-name="Pedro").content__text Pedro
      p.content__text Vanderlinder
      p.content__text.content_text--email vandelinderstation@gmail.com
      a(href='#').content__link.button.button--edit
        | Edit
        i.fa.fa-pencil-alt
      a(href='#').content__link.button.button--delete
        | Delete
        i.fa.fa-trash
  */
  var fragment = document.createDocumentFragment();
  var userRow = document.createElement('DIV');
  userRow.classList.add('content__user');
  var userCheck = document.createElement('INPUT');
  userCheck.setAttribute('type', 'checkbox');
  userRow.appendChild(userCheck);
  var userName = document.createElement('P');
  userName.dataset.name = user.name;
  userName.classList.add('content__text');
  userName.textContent = user.name;
  userRow.appendChild(userName);
  var userSurName = document.createElement('P');
  userSurName.dataset.name = user.surname;
  userSurName.classList.add('content__text');
  userSurName.textContent = user.surname;
  userRow.appendChild(userSurName);
  var userEmail = document.createElement('P');
  userEmail.dataset.name = user.surname;
  userEmail.classList.add('content__text', 'content__text--email');
  userEmail.textContent = user.email;
  userRow.appendChild(userEmail);
  var buttonEdit = document.createElement('A');
  buttonEdit.classList.add('content__link', 'button', 'button--edit');
  buttonEdit.textContent = 'Edit';
  buttonEdit.id = "edit-user-".concat(user.id);
  var buttonIcon = document.createElement('I');
  buttonIcon.classList.add('fas', 'fa-pen');
  buttonEdit.appendChild(buttonIcon);
  userRow.appendChild(buttonEdit);
  var buttonDelete = document.createElement('A');
  buttonDelete.classList.add('content__link', 'button', 'button--delete');
  buttonDelete.textContent = 'Delete';
  buttonDelete.id = "delete-user-".concat(user.id);
  buttonIcon = document.createElement('I');
  buttonIcon.classList.add('fas', 'fa-trash');
  buttonDelete.appendChild(buttonIcon);
  userRow.appendChild(buttonDelete);
  fragment.appendChild(userRow);
  return fragment;
};

var success = function success() {
  Swal.fire('Proceso Exitoso!', 'Los datos fueron guardados con Exito!', 'success');
};

var successUpdate = function successUpdate() {
  Swal.fire('Proceso Exitoso!', 'Los datos fueron Actualizado con Exito!', 'success');
};

var successDelete = function successDelete() {
  Swal.fire('Proceso Exitoso!', 'Los datos fueron Eliminado con Exito!', 'success');
};

var error = function error() {
  Swal.fire('Lo Sentimos!!', 'Su informacion no se Guardo Correctamente!!', 'error');
};

var errorUpdate = function errorUpdate() {
  Swal.fire('Lo Sentimos!!', 'Su informacion no se Actualizo Correctamente!!', 'error');
};

var errorDelete = function errorDelete() {
  Swal.fire('Lo Sentimos!!', 'Su informacion no se Eliminaron Correctamente!!', 'error');
};

var insertUser = function insertUser() {
  var path = 'php/ctr/CtrInsert.php';
  var formData = new FormData();
  formData.append('name', userName.value.toLowerCase());
  formData.append('surname', userSurName.value.toLowerCase());
  formData.append('email', userEmail.value.toLowerCase());
  formData.append('tipo_op', userTipoOp.value);
  fetch(path, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error('Failed to load'));
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    if (data == 1) {
      resetForm();
      getAllUser();
      hideUserInfo();
      success();
    } else {
      error();
    }
  })["catch"](function (error) {
    return console.log("Error: ".concat(error.message));
  });
};

var updateUser = function updateUser(id) {
  var path = 'php/ctr/CtrUpdate.php';
  var formData = new FormData();
  formData.append('id', updateUserButton.dataset.id);
  formData.append('name', userName.value.toLowerCase());
  formData.append('surname', userSurName.value.toLowerCase());
  formData.append('email', userEmail.value.toLowerCase());
  formData.append('tipo_op', userTipoOp.value);
  fetch(path, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error('Failed to load'));
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    if (data == 1) {
      resetForm();
      getAllUser();
      hideUserInfo();
      successUpdate();
    } else {
      console.log(data);
      errorUpdate();
    }
  })["catch"](function (error) {
    return console.log("Error: ".concat(error.message));
  });
};

var deleteUser = function deleteUser(id) {
  var path = 'php/ctr/CtrDelete.php';
  id = getUserId(id).id;
  var formData = new FormData();
  formData.append('id', id);
  formData.append('tipo_op', userTipoOp.value);
  fetch(path, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error('Failed to load'));
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    if (data == 1) {
      resetForm();
      getAllUser();
      hideUserInfo();
      successDelete(); //location.href = '/CRUD/public/';
    } else {
      console.log(data);
      errorDelete();
    }
  })["catch"](function (error) {
    return console.log("Error: ".concat(error.message));
  });
};

var resetForm = function resetForm() {
  userName.value = '';
  userSurName.value = '';
  userEmail.value = '';
};

main.addEventListener('click', function (e) {
  if (e.target.classList.contains('top-bar__user-info') || e.target.classList.contains('fa-plus')) {
    newUser = true;
    addUser();
    showUserInfo();
  } else if (e.target.classList.contains('button--cancel') || e.target.classList.contains('fa-times')) {
    hideUserInfo();
  } else if (e.target.classList.contains('content__checkbox')) {
    selectUser(e.target.id);
  } else if (e.target.id === 'select-all-users') {
    selectAllUser();
  } else if (e.target.id.indexOf('edit-user') !== -1) {
    newUser = false;
    saveUser(e.target.id);
    showUserInfo();
  } else if (e.target.id == 'add-user') {
    insertUser();
  } else if (e.target.id == 'update-user') {
    updateUser();
  } else if (e.target.id.indexOf('delete-user') !== -1) {
    deleteUser(e.target.id);
  }
});
searchText.addEventListener('keyup', function (e) {
  var value = searchText.value.toLowerCase();

  if (value == '') {
    var _iterator2 = _createForOfIteratorHelper(allNames),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var name = _step2.value;
        name.parentElement.style.display = 'grid';
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var _iterator3 = _createForOfIteratorHelper(allNames),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _name = _step3.value;

      if (_name.dataset.name.indexOf(value) == -1) {
        _name.parentElement.style.display = 'none';
      } else {
        _name.parentElement.style.display = 'grid';
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
});
getAllUser();