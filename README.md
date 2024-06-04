# Articles App Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This README provides an overview of the Articles App Frontend, including instructions for installation, usage, and a detailed description of the main components and functions available in the application.

## Installation

To install and run the Articles App Frontend locally, follow these steps:
- **I step:**
1. Clone the repository:

```bash
git clone https://github.com/QCmetrologist/artcl_back.git
```

2. Navigate to the project directory:

```bash
cd artcl_back
```
3. Create and fill .env file:
   
```bash
#DATABASE
DB_DATABASE='...'
DB_PASSWORD='...'
DB_USER='...'
DB_HOST=...
DB_PORT=...
DB_SCHEMA=...
DB_DIALECT=...

#SERVER_PORT
SERVER_PORT=...

#TOKEN
SECRET_ACCESS_TOKEN=...
```
4. Install dependencies:

```bash
npm install
```

5. Start the application:

```bash
npm start
node index.js
```
- **II step:**
1. Clone the repository:

```bash
git clone https://github.com/QCmetrologist/arctl_front.git
```

2. Navigate to the project directory:

```bash
cd artcl_front
```

3. Install dependencies:

```bash
npm install
```
4. Start the application:

Frontend should be started after backend start.
```bash
npm start
```

## Usage

Once the application is running, you can access it at http://localhost:3000

## Folder Structure main elements

```bash
artcl_front/
  ├── public/                  # Public assets and HTML template
  ├── src/                     # Source code
  │   ├── components/          # Reusable React components
  │   ├── assets/
  │   ├── app.css              # Formats for App.js
  │   ├── index.css            # Formats for Index.js     
  │   ├── App.js               # Main application component
  │   └── index.js             # Entry point for the application
  ├── .gitignore               # Git ignore file
  ├── package.json             # Node.js dependencies
  └── README.md                # Project documentation
```


## Components

### AddArticle

The **AddArticle** component is used to display, fill and submit form for additing articles by signed in users.

### AddComment

The **AddComment** component is used to display, fill and submit form for additing comments to articles by signed in users.

### Articles

The **Articles** component is main component which allow to see all articles, delete/edit article by signed in user, selete/edit comment by signed in user, create comments and articles.

### Form

The **Form**  component is used to display, fill and submit sign up form.

### SignIn

The **SignIn**  component is used to display, fill and submit sign in form.

## Functions

**handleDeleteArticle**

- Description: Handles the deletion of an article.
- Parameters: articleSlug - The slug of the article to be deleted.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with the delete operation.

**handleEditArticle**

- Description: Handles the editing of an article.
- Parameters: article - The article object to be edited.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with the edit operation.

**handleSaveChanges**

- Description: Handles the saving of changes made to an article.
- Parameters: None.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with the edit operation.

**handleAddComment**

- Description: Handles the addition of a comment to an article.
- Parameters: articleSlug - The slug of the article to which the comment is added. articleId - The ID of the article. commentBody - The body of the comment.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with adding the comment.

**handleDeleteComment**

- Description: Handles the deletion of a comment from an article.
- Parameters: articleSlug - The slug of the article from which the comment is deleted. articleId - The ID of the article.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with deleting the comment.

**handleEditComment**

- Description: Handles the editing of a comment on an article.
- Parameters: articleSlug - The slug of the article containing the comment. articleId - The ID of the article. editedCommentBody - The edited body of the comment.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with editing the comment.

**useEffect**

- Description: Fetches articles and user data from the backend API.
- Parameters: None.
- Returns: None.
- Error Handling: Logs an error message if there is a problem with the axios operation.

**formatDate**

- Description: Formats the date string of an article.
- Parameters: dateString - The date string to be formatted.
- Returns: A formatted date string.
- Error Handling: None.

**isValidUrl**

- Description: Checks if a given string is a valid URL.
- Parameters: string - The string to be checked.
- Returns: true if the string is a valid URL, false otherwise.
- Error Handling: None.

**handleSubmit**
- Description: Handles form submissions.
- Parameters: e - The event object representing the form submission event.
- Returns: None.
- Error Handling: None.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).