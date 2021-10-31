function isName(val) {
    return val.length === 0
      ? "*Field is required"
      : val.length < 5
      ? "*Must full name"
      : val.split("").some((char) => Number(char))
      ? "*Number ?"
      : "";
};

function isEmail(val) {
    // "@" index
    const ai = val.indexOf('@'); 
    const gdi = val.split('')
        .reduce((acc, curr, indx) => curr === "." ? indx : acc, 0);
    
    return val.length > 0 && (ai > -1 && gdi > ai)
        ? "" : '*Must be an email';
};

function isPhone(val) {
    return isNaN(val)
        ? "*Incorrect Number"
        : val.length === 10 ? "" : "*Incorrect Phone number"        
};

function isRegx(val) {
    let format = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g;
        // /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str)
    let regxArr = val.match(format);
    return regxArr === null ? '*Required special characters' : ''
};

function isRequired(val) {
    let length = val.length
    return (length < 6) ? "*Password required 6 characters" : ''
};

function isValue(val) {
    if (!val) return "Field is required";
    return "";
}

function getNameError(value) {
    if (!value) return 'Field is required';

    const valueIsLowerCase = value === value.toLowerCase()
    const valueIsLongEnough = value.length >= 3
    const valueIsShortEnough = value.length <= 10

    if (!valueIsLowerCase) {
        return 'Value must be lower case'
    } else if (!valueIsLongEnough) {
        return 'Value must be at least 3 characters long'
    } else if (!valueIsShortEnough) {
        return 'Value must be no longer than 10 characters'
    }
    return null
}

function isNumRequired(val) {
    return (val.match(/\d+$/) === null) ? '*Number is required': "";
};

function isConfirm(val) {
    return (val[0] !== val[1]) ? '*Password not match' : ''
}

String.prototype.UpperFirstLetter = function () {
    const firstLetter = this.charAt(0).toUpperCase();
    const rest = this.slice(1);
    return `${firstLetter}${rest}`;    
}

export {
  isValue,
  getNameError,
  isName,
  isEmail,
  isPhone,
  isRegx,
  isNumRequired,
  isRequired,
  isConfirm,
};


    // function PhoneNumber(string) {
    //     const numAr = [];  
    //     for (let i = 0; i <= 7; i= i+3) {
    //         numAr.push(string.split('').slice(i, i + 3).join(''));
    //     }
    //     return `${numAr.join(' ')}${string.slice(-1)}`;
    // };