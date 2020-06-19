import {cleanConsole, createAll} from './data';
import {cleanData} from './example-1';

const companies = createAll();
const newCompanies = cleanData(companies);

cleanConsole(3, companies);
console.log('---- EXAMPLE 3 --- ', 'Put here your function', validateCompanies(newCompanies));

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Cree una función tomando la variable "companies" como parámetro y devolviendo
// un booleano que valida que todos los nombres de las empresas y los atributos
// "firstName" y "lastName" de "users" están en mayúsculas.
// Debes probar la operación de esta función importando la función creada
// en el "example-1.js".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the "companies" variable as a parameter and returning
// a boolean validating that all the names of the companies and the attributes "firstName"
// and "lastName" of "users" are capitalized. You must test the operation
// of this function by importing the function created for "example-1.js".

// -----------------------------------------------------------------------------
// INSTRUCTIONS EN FRANÇAIS

// Créer une fonction prenant en paramètre la variable "companies" et renvoyant
// un booléen validant que tous les noms des "company" et les attributs "firstName"
// et "lastName" des "users" sont en majuscules. Vous devez tester le fonctionnement
// de cette fonction en important la fonction créée pour "example-1.js".

function validateCompanies(companies) {
  for (const company of companies) {
    if (!validateFirstLetter(company.name)) {
      return false;
    }
    for (const user of company.users) {
      if (!validateFirstLetter(user.firstName)) {
        return false;
      }
      if (!validateFirstLetter(user.lastName)) {
        return false;
      }
    }
  }
  return true;
}
/**
 * Valido primera letra de palabra sea mayuscula
 * @param {string} word
 * @return {boolean}
 */
function validateFirstLetter(word) {
  if (word.length > 0) {
    return (word[0] === word[0].toUpperCase());
  }
  return true;
}
