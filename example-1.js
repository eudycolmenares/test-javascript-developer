import {createAll, cleanConsole} from './data';
const companies = createAll();

cleanConsole(1, companies);
console.log('---- EXAMPLE 1 --- ', 'Put here your function', cleanData(companies));

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando la variable "companies" como parámetro y reemplazando
// todos los valores "undefined" en "usuarios" por un string vacío.
// El nombre de cada "company" debe tener una letra mayúscula al principio, así como
// el apellido y el nombre de cada "user".
// Las "companies" deben ordenarse por su total de "user" (orden decreciente)
// y los "users" de cada "company" deben aparecer en orden alfabético.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the variable "companies" as a parameter and replacing
// all values "undefined" in "users" by an empty string.
// The name of each "company" must have a capital letter at the beginning as well as
// the last name and first name of each "user".
// The "companies" must be sorted by their number of "user" (decreasing order)
// and the "users" of each "company" must be listed in alphabetical order.

// -----------------------------------------------------------------------------
// INSTRUCTIONS EN FRANÇAIS

// Créer une fonction prenant en paramètre la variable "companies" et remplaçant
// toutes les valeurs "undefined" dans les "users" par un string vide.
// Le nom de chaque "company" doit avoir une majuscule au début ainsi que
// le nom et le prénom de chaque "user".
// Les "companies" doivent être triées par leur nombre de "user" (ordre décroissant)
// et les "users" de chaque "company" doivent être classés par ordre alphabétique.

export function cleanData(companies) {
  const newCompanies = companies.map((item) => {
    return {
      ...item,
      name: capitalizeFirstLetter(item.name),
      users: item.users.map((user) => {
        return {
          age: (user.age === undefined) ? '' : user.age,
          car: (user.car === undefined) ? '' : user.car,
          firstName: (user.firstName === undefined) ? '' : capitalizeFirstLetter(user.firstName),
          id: (user.id === undefined) ? '' : user.id,
          lastName: (user.lastName === undefined) ? '' : capitalizeFirstLetter(user.lastName),
        };
      }),
    };
  });
  orderlength(newCompanies);
  newCompanies.map((item) => orderUser(item.users));
  return newCompanies;
}
/**
 * Capitaliza primera letra de una cadena
 * @param {string} text
 * @return {string}
 */
function capitalizeFirstLetter(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
/**
 * Ordena arreglo por campo usersLength de manera decreciente
 * @param {array} items
 * @return {array}
 */
function orderlength(items) {
  return items.sort(function(a, b) {
    if (a.usersLength < b.usersLength) {
      return 1;
    }
    if (a.usersLength > b.usersLength) {
      return -1;
    }
    return 0;
  });
}
/**
 * Ordena arreglo por campo firstName de manera creciente
 * @param {array} items
 * @return {array}
 */
function orderUser(items) {
  return items.sort(function(a, b) {
    if (a.firstName > b.firstName) {
      return 1;
    }
    if (a.firstName < b.firstName) {
      return -1;
    }
    return 0;
  });
}
