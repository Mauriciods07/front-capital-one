const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,20}$/;

const validateEmail = (email) => {
    if (!email) {
      return {
        status: false,
        msg: "Este campo es obligatorio.",
      };
    } else {
      return emailRegex.test(email)
        ? {status: true, msg: ""}
        : {
            status: false,
            msg: "Por favor, ingrese un email válido.",
          };
    }
}

const validatePassword = (pass) => {
    if (!pass) {
        return {
            status: false,
            msg: "Por favor, ingrese una contraseña."
        }
    }

    status = false;
    msg = "";

    if (passwordRegex.test(pass) && pass.length >= 8) {
        status = true;
    } else {
        msg = "La contraseña debe contener entre 8-20 caracteres y, al menos, 1 letra mayúscula, 1 minúscula, 1 número (0-9) y un caracter especial excepto espacios en blanco.";
    }

    return {
        status: status,
        msg: msg
      };
}

const validateSecondPassword = (psw, secondPsw) => {
    if (psw != secondPsw) {
        return {
            status: false,
            msg: "Las contraseñas no coinciden."
        }
    }

    return {
        status: true,
        msg: ""
    }
}

export {
    validateEmail,
    validatePassword,
    validateSecondPassword
}