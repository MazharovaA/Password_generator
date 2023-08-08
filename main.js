
//Определения
const generate_btn = document.getElementById("btn");

const ABC = "QWERTYUOPASDFGHJKLZXCVBNMI";
const symbols = "[];'{}|:,./<>?~!@#$%^&*()_+=-`";
const abc = "qwertyuiopasdfghjklzxcvbnm";
const digits = "1234567890";
const all_symb = ABC + symbols + abc + digits;

const uppercase_tick = document.getElementById("uppercase");
const symbol_tick = document.getElementById("symbol");

let string;

const range = document.getElementById("length");
const range_output = document.getElementById("value");
const password_field_box = document.getElementById("new_password");

class PasswordFieldsAccessor {
  constructor() {
    this.fields = null;
  }

  getFields() {
    if (this.fields == null) {
      this.fields = createFields();
    }
    return this.fields;
  }
}

let passwordFieldsAccessor = new PasswordFieldsAccessor();

class StringChooser {
  constructor() {
    this.string = null;
  }

  checkTickAndChooseString() {
    if (upCheck() == true && syCheck() == true) {
      this.string = chooseStrWithUppercaseAndSymbol();
    } else if (upCheck() == false && syCheck() == true) {
      this.string = chooseStrWithoutUppercaseWithSymbol();
    } else if (upCheck() == true && syCheck() == false) {
      this.string = chooseStrWithoutSymbolWithUppercase();
    } else {
      this.string = chooseStrWithoutUppercaseAndSymbol();
    }
    return this.string;
  }
}

let stringChooser = new StringChooser();

//Основная функция
generate_btn.addEventListener("click", onGenerateClick);

range_output.innerHTML = range.value;

range.oninput = function () {
  range_output.innerHTML = this.value;
};

//Вспомогательные функции
function upCheck() {
  if (uppercase_tick.checked) {
    return true;
  } else {
    return false;
  }
}

function syCheck() {
  if (symbol_tick.checked) {
    return true;
  } else {
    return false;
  }
}

function chooseStrWithUppercaseAndSymbol() {
  return all_symb;
}

function chooseStrWithoutUppercaseWithSymbol() {
  return symbols + abc + digits;
}

function chooseStrWithoutUppercaseAndSymbol() {
  return abc + digits;
}

function chooseStrWithoutSymbolWithUppercase() {
  return ABC + abc + digits;
}

function getRandomNumber() {
  return Math.floor(
    Math.random() * stringChooser.checkTickAndChooseString().length
  );
}

function createPassword() {
  let pas_arr = [];
  for (let k = 0; k < 3; k++) {
    let pas = "";
    for (let i = 0; i < range.value; i++) {
      //pas += symbol_lib[getRandomNumber()];
      pas += stringChooser.checkTickAndChooseString()[getRandomNumber()];
    }
    pas_arr.push(pas);
  }
  return pas_arr;
}

function onGenerateClick() {
  let fields = passwordFieldsAccessor.getFields();
  let passwords = createPassword();
  fillPasswordsFields(passwords, fields);
}

function fillPasswordsFields(passwords, fields) {
  for (let i = 0; i < fields.length; i++) {
    fields[i].textContent = passwords[i];
  }
}

function createFields() {
  let div_fields = [];
  for (let r = 0; r < 3; r++) {
    let field = document.createElement("div");
    password_field_box.appendChild(field);
    field.classList.add("field_style");
    div_fields.push(field);
  }
  return div_fields;
}
