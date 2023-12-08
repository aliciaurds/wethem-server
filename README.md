
# Project Name

## [See the App!](https://wethem-project.netlify.app/)

![App Logo](./img/LogoBg.jpeg)

## Description

My project arises from the idea of creating an online store where the importance is not given to the gender but to the clothes. I have chosen this because it seemed to me a good opportunity to apply the knowledge acquired and also give it a personal touch.

#### [Client Repo here](https://github.com/aliciaurds/wethem-client)
#### [Server Repo here](https://github.com/aliciaurds/wethem-server)

## Backlog Functionalities

- Create a search bar
- Add more styles to the website
- The payment gateway to be displayed in a pop-up window
- Store all confirmed orders on one page
- Remove already purchased products from the shopping list
- Nodemailer


## Technologies used

- HTML
- CSS
- JavaScript
- NodeJS
- Express
- Axios
- React
- Bootstrap
- React Context


# Server Structure

## Models

User model

```javascript
 {
    firstName:{type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, trim: true, required: false, unique: true, lowercase: true }
    email: {type: String, required: true, unique: true, lowercase: true,trim: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true}
    postalCode: {type: Number, required: true},  
    dateOfBirth: {type: Date},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user"},
    wishlist:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    shoppingCart:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}], 
    profilePic: String,
 }
```

Product model

```javascript
 {
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, enum: ['small', 'medium', 'large']},
    color: {type: String,enum: ['black', 'white', 'green', 'yellow', 'grey', 'orange', 'pink', 'brown', 'purple', 'red', 'blue']}, 
    image: String,
    category:{type: String,enum: ['skirts', 'dresses', 'suits', 'shirts', 'trousers', 'jeans', 'sport', 'coats', 'jackets', 'hoodies', 'accessories']}
 }
```

Review model

```javascript
 {
   comment: String,    
   rating: {type: Number, min: 0, max: 5},
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   product: {type: mongoose.Schema.Types.ObjectId,ref: "Product"}
 }
```
Order model

```javascript
 {
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true}],
    totalPrice: Number,
    paymentIntentId: String,
    clientSecret: String,
    status: {type: String,enum: ["incomplete", "succeeded"],default: "incomplete"},
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                                      | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | ---------------------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`                           | {name, email, password, etc} | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`                            | {email, password}            | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`                           |                              | 200            | 401          | Verifies the user Token                                        |
| PUT         | `/auth/change-password`                  | { newPassword }              | 200            | 400          | Updates user password                                          |
|GET	      | `/products`                              |		                        | 200	         |              | Retrieves all products with name and image                     |   
|POST	      | `/products/create`                       |	 	                        | 201	         |              | Creates a new product                                          |
|GET	      | `/products/:productId/details`           |		                        | 200	         |              | Retrieves details of a specific product                        |
|DELETE	      | `/products/:productId/delete`	         |	                            | 200	         |              | Deletes a specific product                                     |
|PUT	      | `/products/:productId/update`            |	                            | 200	         |              | Updates a specific product                                     |
|POST	      | `/review/:productId/add`                 |	{ comment, rating }         | 201	         |              | Adds a review to a specific product                            |
|GET	      | `/review/:productId/reviews`             |		                        | 200	         |              | Retrieves all reviews for a specific product                   |
|DELETE	      | `/review/:reviewId/delete`               |	                            | 200	         |              | Deletes a specific review                                      |
|GET	      | `/profile`	                             |	                            | 200	         |              | Retrieves user profile details                                 |
|PUT	      | `/profile/edit`	                         |                              | 200	         |              | Updates user profile                                           |
|GET	      | `/profile/wishlist`	                     |	                            | 200	         |              | Retrieves user's wishlist                                      |
|PATCH	      | `/profile/wishlist/:productI/add`	     |	                            | 200	         |              | Adds product to user's wishlist                                |
|PATCH	      | `/profile/wishlist/:productI/remove`     |	                            | 200	         |              | Removes product from user's wishlist                           |
|GET	      | `/profile/shoppingCart`	                 |	                            | 200	         |              | Retrieves user's shopping cart                                 |
|PATCH	      | `/profile/shoppingCart/:prodctId/add`	 |	                            | 200	         |              | Adds product to user's shopping cart                           |
|PATCH	      | `/profile/shoppingCart/:prodctId/remove` |		                        | 200	         |              | Removes product from user's shopping cart                      |
|DELETE	      | `/profile/delete-account`                |		                        | 200	         |              | Deletes user account and associated reviews                      


  
## Links

### Project

[Repository Link Client](https://github.com/aliciaurds/wethem-client)

[Repository Link Server](https://github.com/aliciaurds/wethem-server)

[Deploy Link](https://wethem-project.netlify.app/)

### Excalidraw

[Link to excalidraw](https://excalidraw.com/#json=6eFiMtdQT7EzQPPjtzqOZ,awRADYs52IFH7K709cPsXw)

### Slides

[Slides Link](www.your-slides-url-here.com)