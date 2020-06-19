import {cleanConsole, createAll} from './data';

const companies = createAll();
const newUser = {
  firstName: 'Juan',
  lastName: 'Delgado',
  age: 35,
  car: true,
  id: Math.round(Math.random() * 1000),
};

cleanConsole(7, companies);
console.log('---- EXAMPLE 7 part 1 --- ', 'Put here your function', getNameIdCompany(2));
console.log('---- EXAMPLE 7 part 2 --- ', 'Put here your function', getCompaniesWithOut(2));
console.log('---- EXAMPLE 7 part 3 --- ', 'Put here your function', pathComapnies(5));
console.log('---- EXAMPLE 7 part 4 --- ', 'Put here your function', addUserToCompany(2, newUser));
console.log('---- EXAMPLE 7 part 5 --- ', 'Put here your function', putInCompany(0));
console.log('---- EXAMPLE 7 part 6 --- ', 'Put here your function', delUserFromCompany(0, 2));
console.log('---- EXAMPLE 7 part 7 --- ', 'Put here your function', patchCompanyUserId(0, 5));
console.log('---- EXAMPLE 7 part 8 --- ', 'Put here your function', putCompanyUserId(0, 3));
console.log('---- EXAMPLE 7 part 9 --- ', 'Put here your function', transferUser(0, 1, 4));

function getNameIdCompany(id) {
  return (companies.find((company) => company.id === id)) ? companies.find((company) => company.id === id).name : null;
}
// 2
function getCompaniesWithOut(id) {
  return companies.filter((company) => company.id !== id);
}
// 3
function pathComapnies(idCompany) {
  const ret = JSON.parse(JSON.stringify(companies));
  const companySelected = ret.find((company) => company.id === idCompany);
  if (!companySelected) {
    return null;
  }
  for (const key in companySelected) {
    if (key !== 'users') {
      const data = {
        [key]: companySelected[key],
      };
      isFetch(`/company/${idCompany}/${key}`, 'PATCH', data).then((resp) => {
        companySelected[key] = resp;
      });
    }
  }
}
// 4
function addUserToCompany(id, nUser) {
  const compSelected = companies.find((company) => company.id === id);
  if (!compSelected) {
    return null;
  }
  compSelected.users.push(nUser);
  compSelected.usersLength = compSelected.users.length;
  return compSelected;
}
// 5
function putInCompany(idCompany) {
  const compSelected = companies.find((company) => company.id === idCompany);
  if (!compSelected) {
    return null;
  }
  const data = {
    isOpen: compSelected.isOpen,
    name: compSelected.name,
    usersLength: compSelected.usersLength,
  };
  isFetch(`/company/${compSelected.id}`, 'PUT', data).then((resp) => {
    return resp;
  });
}
// 6
function delUserFromCompany(idCompany, idUser) {
  const companySelected = companies.find((company) => company.id === idCompany);
  if (!companySelected) {
    return null;
  }
  companySelected.users = companySelected.users.filter((user) => user.id !== idUser);
  companySelected.usersLength = companySelected.users.length;
  return companySelected;
}
// 7
function patchCompanyUserId(idCompany, idUser) {
  const companySelected = companies.find((company) => company.id === idCompany);
  if (!companySelected) {
    return null;
  }
  const userSelected = companySelected.users.find((user) => user.id === idUser);
  if (!userSelected) {
    return null;
  }
  const data = {
    age: userSelected.age,
    car: userSelected.car,
    firstName: userSelected.firstName,
    lastName: userSelected.lastName,
  };
  isFetch(`/company/${idCompany}/${idUser}`, 'PATCH', data).then((resp) => {
    return resp;
  });
}
// 8
function putCompanyUserId(idCompany, idUser) {
  const companySelected = companies.find((company) => company.id === idCompany);
  if (!companySelected) {
    return null;
  }
  const userSelected = companySelected.users.find((user) => user.id === idUser);
  if (!userSelected) {
    return null;
  }
  const data = {
    age: userSelected.age,
    car: userSelected.car,
    firstName: userSelected.firstName,
    lastName: userSelected.lastName,
  };
  isFetch(`/company/${idCompany}/${idUser}`, 'PUT', data).then((resp) => {
    return resp;
  });
}
// 9
function transferUser(idA, idB, idUser) {
  const companyA = companies.find((company) => company.id === idA);
  const companyB = companies.find((company) => company.id === idB);
  if (!companyA || !companyB) {
    return null;
  }
  const userSelected = companyA.users.find((user) => user.id === idUser);
  if (!userSelected) {
    return null;
  }
  companyB.users.push(userSelected);
  companyB.usersLength = companyB.users.length;
  companyA.users = companyA.users.filter((user) => user.id !== idUser);
  companyA.usersLength = companyA.users.length;
  return companies;
}
//
function isFetch(url, method, data=null) {
  const header = {
    method: method,
  };
  if (data) {
    header.body = JSON.stringify(data);
    header.headers = {
      'Content-Type': 'application/json',
    };
  }
  return fetch(url, header);
}


// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Parte 1: Crear una función tomando como parámetro un "id" de "company" y
// devolviendo el nombre de esta "company".

// Parte 2: Crear una función tomando como parámetro un "id" de "company" y
// quitando la "company" de la lista.

// Parte 3: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PATCH (como con una llamada HTTP) en todos los
// atributos de esta "company" excepto en el atributo "users".

// Parte 4: Crear una función tomando como parámetro un "id" de "company" y un
// nuevo "user" cuyo el apelido es "Delgado", el nombre "Juan", de 35 años y
// dueño de un carro. El nuevo "user" debe agregarse a la lista de "users" de este
// "company" y tener un "id" generado automáticamente. La función también debe modificar
// el atributo "usersLength" de "company".

// Parte 5: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PUT (como con una llamada HTTP) en esta "company" excepto
// en el atributo "users".

// Parte 6: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user". La función debe quitar este "user" de la lista de "users"
// de "company" y cambiar el atributo "usersLength" de "company".

// Parte 7: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PATCH (como con una llamada HTTP) en este
// "user".

// Parte 8: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PUT (como con una llamada HTTP) en este
// "user".

// Parte 9: Crear una función tomando como parámetro dos "id" de "company" y
// un "id" de "user". La función debe permitir que el user sea transferido de la
// primera "company" a la segunda "company". El atributo "usersLength" de cada
// "company" debe actualizarse.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Part 1: Create a function taking as parameter an "id" of "company" and
// returning the name of this "company".

// Part 2: Create a function taking as parameter an "id" of "company" and
// removing the "company" from the list.

// Part 3: Create a function taking as a parameter an "id" of "company" and
// allowing to make a PATCH (as with an HTTP call) on all
// attributes of this "company" except on the "users" attribute.

// Part 4: Create a function taking as parameter an "id" of "company" and a
// new "user" whose name is "Delgado", the first name "Juan", aged 35 and
// a car. The new "user" must be added to the "users" list of this
// "company" and have an automatically generated "id". The function must also modify
// the "usersLength" attribute of "company".

// Part 5: Create a function taking as parameter an "id" of "company" and
// allowing to make a PUT (as with an HTTP call) on this "company" except
// on the "users" attribute.

// Part 6: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user". The function must remove this "user" from the list of "users"
// from "company" and change the attribute "usersLength" from "company".

// Part 7: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PATCH (as with an HTTP call) on this
// "user".

// Part 8: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PUT (as with an HTTP call) on this
// "user".

// Part 9: Create a function taking as parameter two "id" of "company" and
// an "id" of "user". The function must allow the user to be transferred as a parameter
// from the 1st "company" to the 2nd "company". The "usersLength" attribute of each
// "company" must be updated.

// -----------------------------------------------------------------------------
// INSTRUCTIONS EN FRANÇAIS

// Partie 1 : Créer une fonction prenant en paramètre un "id" de "company" et
// retournant le nom de cette "company".

// Partie 2 : Créer une fonction prenant en paramètre un "id" de "company" et
// supprimant la "company" de la liste.

// Partie 3 : Créer une fonction prenant en paramètre un "id" de "company" et
// permettant de faire un PATCH (comme avec un appel HTTP) sur tous les
// attributs de cette "company" sauf sur l'attribut "users".

// Partie 4 : Créer une fonction prenant en paramètre un "id" de "company" et un
// nouvel "user" dont le nom est "Delgado", le prénom "Juan", ayant 35 ans et
// une voiture. Le nouvel "user" doit être ajouté à la liste des "users" de cette
// "company" et avoir un "id" généré automatiquement. La fonction doit aussi modifier
// l'attribut "usersLength" de "company".

// Partie 5 : Créer une fonction prenant en paramètre un "id" de "company" et
// permettant de faire un PUT (comme avec un appel HTTP) sur cette "company" sauf
// sur l'attribut "users".

// Partie 6 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user". La fonction doit supprimer cet "user" de la liste des "users"
// de la "company" et modifier l'attribut "usersLength" de "company".

// Partie 7 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user" permettant de faire un PATCH (comme avec un appel HTTP) sur cet
// "user".

// Partie 8 : Créer une fonction prenant en paramètre un "id" de "company" et un
// "id" de "user" permettant de faire un PUT (comme avec un appel HTTP) sur cet
// "user".

// Partie 9 : Créer une fonction prenant en paramètre deux "id" de "company" et
// un "id" de "user". La fonction doit permettre de transférer l'user en paramètre
// de la 1re "company" à la 2e "company". L'attribut "usersLength" de chaque
// "company" doit être mis à jour.
