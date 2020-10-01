class Validations {
  static nameValidation(fullName) {
    const nameSplit = fullName.split(' ');

    return nameSplit.length >= 2 && nameSplit[1] != '';
  }
}

export default Validations;
