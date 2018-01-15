var emailId = 0;

	function remove(container) {
		container.parentNode.remove();
		return false;
	}

	function newEmail(container) {
		var createEmail = document.createElement('p');
		createEmail.innerHTML = '<input type="text" class="email" name="email' + emailId + '" placeholder="Введите Ваш email" /><a href="#" onclick="remove(this)">Удалить</a>';
		var next = container.nextSibling;
		container.parentNode.insertBefore(createEmail, next);
		emailId = emailId+1;
		return false;
	}

	function showError(error, errorMessage) {
      error.className = 'error';
      var msgElem = document.createElement('span');
      msgElem.className = "error-message";
      msgElem.innerHTML = errorMessage;
      error.appendChild(msgElem);
    }

    function resetError(error) {
      error.className = '';
      if (error.lastChild.className == "error-message") {
        error.removeChild(error.lastChild);
      }
    }

    function validateName(str) {
    	var letters = /^[\w]/.test(str);
    	var fletter = /^[a-zA-Z]+$/.test(str.charAt(0));
    	if (letters && fletter && str.length > 4) {
    		return true;
    	}
    }

    function validateEmail(str) {
    	if (/^[\w\.\d-_]+@+\w+\.+\w+$/i.test(str)) {
    		return true;
    	}
    }

    function validateAge(number) {
    	if (number >= 7 && number <= 120) {
    		return true;
    	}
    }

    function validatePassword(str) {
     	var strLength = str.length;
     	var is_s = false;
    	var is_u = false;
    	var is_n = false;
    	for (var i = 0; i < strLength; i++) {
    		if (/\d/.test(str[i])) {
    			is_n = true;
    		} else if (str[i].toUpperCase()==str[i]) {
    			is_u = true;
    		} else {
    			is_s = true;
    		}
    	}

    	if (is_u && is_s && is_n && strLength > 5 ) {
    		return true;
    	}
    }

    function validate(form) {
      var elems = form.elements;

      resetError(elems.yname.parentNode);
       if (!elems.yname.value) {
        showError(elems.yname.parentNode, ' Укажите имя.');
      } else if (!validateName(elems.yname.value)) {
      	showError(elems.yname.parentNode, 'Имя должно начинаться на латинскую букву, содержать только латинские буквы, цифры, спецсимвол _, и быть не менее 5 символов.');
      }

      resetError(elems.password.parentNode);
      if (!elems.password.value) {
        showError(elems.password.parentNode, ' Укажите пароль.');
      } else if (!validatePassword(elems.password.value)) {
      	showError(elems.password.parentNode, 'Пароль должен содержать буквы верхнего и нижнего регистра, не менее одной цифры, и быть не менее 6 символов.')
      } else if (elems.password.value != elems.password2.value) {
        showError(elems.password.parentNode, ' Пароли не совпадают.');
      }

      resetError(elems.age.parentNode);
      if (!elems.age.value) {
      	showError(elems.age.parentNode, ' Укажите ваш возраст.');
      } else if (!validateAge(elems.age.value)) {
      	showError(elems.age.parentNode, ' Возраст должен быть в диапазоне 7-120 лет.');
      }

      var emailElems = document.getElementsByClassName('email');
      for (var i = 0; i < emailElems.length; i++) {
	      resetError(emailElems[i].parentNode);
	      if (!emailElems[i].value) {
	      	showError(emailElems[i].parentNode, ' Укажите ваш email.');
	      } else if (!validateEmail(emailElems[i].value)) {
	      	showError(emailElems[i].parentNode, ' Некорректный формат email.');
	      }      	
      }

    }