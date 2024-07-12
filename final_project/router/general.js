const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registerd. You could log in now!"});
    } else {
      return res.status(200).json({message: "User already exists!"});
    }
  };
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(300).json(JSON.stringify(books));
//   // return res.send(JSON.stringify(books,null,4))
// });
public_users.get('/', async (req, res) => {
  try {
    return res.status(300).json(JSON.stringify(books));
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error has occurred');
  }
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   const isbn = req.params.isbn;
//   if (books[isbn]) {
//     res.status(300).json(books[isbn])
//   } else {
//     res.send(`There is no book with ISBN number: ${isbn}`);
//   };
//  });
public_users.get('/isbn/:isbn', function (req, res) {
  new Promise((resolve,reject) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject(`There is no book with ISBN number: ${isbn}`);
    };
  })
  .then((book) => {
    res.status(300).json(book);
  })
  .catch((error) => {
    res.send(error);
  })
 });
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   const author = req.params.author;
//   for (const key in books) {
//     if (books[key]["author"] === author) {
//       return res.status(300).json(books[key]);
//     }
//   };
//   res.send(`There is no book with ${author} as author`);
// });
public_users.get('/author/:author',async (req, res) => {
  try {
    const author = req.params.author;
    for (const key in books) {
      if (books[key]["author"] === author) {
        return res.status(300).json(books[key]);
      }
    };
    res.send(`There is no book with ${author} as author`);
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error has occurred');
  }
});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   // return res.status(300).json({message: "Yet to be implemented"});
//   const title = req.params.title;
//   for (const key in books) {
//     if (books[key]["title"] === title) {
//       return res.status(300).json(books[key]);
//     }
//   };
//   res.send(`There is no book with ${author} as title`);
// });
public_users.get('/title/:title',async (req, res) => {
  try {
    const title = req.params.title;
    for (const key in books) {
      if (books[key]["title"] === title) {
        return res.status(300).json(books[key]);
      }
    };
    res.send(`There is no book with ${author} as title`);
  } catch (error) {
    console.log(error);
    return res.status(500).send('An error has occurred');
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(300).json(books[isbn]['reviews'])
  } else {
    res.send(`There is no book with ISBN number: ${isbn}`);
  };
});

module.exports.general = public_users;
