# Welcome to Milkywires coding assignment repo

This repo gives you the basic setup for our coding assignments and information about the assignment. If you have any questions don't hesitate to reach out.

# Background

At Milkywire we work with small local charity organizations that do hands on work in the field. We call people working for these organizations impacters. Impacters continually create posts to keep the users that support them updated with what is happening in the field.

We now want to create a system that lets impacters administer their posts using an app or the web. It is your task to help build on part of this system.

# About the assignments

We don't expect you to do all parts of the implementation, instead we want you select the part (backend, app or web) that you feel most comfortable with and you think will highlight your skills in the best way.

The goal of this assignment is not to make a perfect solution, but to have something to act as a starting point for a technical discussion during the interview.

Besides the assignment itself, please:

1. Submit the assignment as a repository on github

2. Cover parts of the project with tests. 

3. Think about how you structure your files and folders, maintain good naming conventions, pick libraries for common tasks etc. Write the code as if this project would be extended with more functionality and be maintained by a team.

4. Write down the trade-offs and decisions you have made, stuff you left out (if any), what you would do if you had more time etc. Please also submit this together with the rest of the assignment (eg. in the Readme of your submission repository).

And again if you have any doubts or questions, feel free to bring them up with us at any time. You can reach us at work@milkywire.com.

# Assignments (choose one of them)

## Backend

The system needs a basic API to handle posts.

Create an api using Node.js, the user of the api should be able to

- Get all posts
- Get all posts for a specific impacter
- Get a post by id
- Update a post
- Delete a post

We have provided a basic setup with a PostgreSQL database that has a basic schema and is populated with data. Feel free to update the schema or exchange any framework that is part of the initial setup if you think that is necessary.

If you feel you have the time, you can also add so the user can create a new post by uploading an image to the API.

## App

We need an app for our impacters to administer their posts.

Create an app using React Native, the user should be able to

- see all posts
- update a post
- delete a post
- open a post in full screen by clicking the post
- go to the next post in full screen mode
- delete and update a post in full screen mode


If you feel you have the time, you can also add support for the user to create a new post by uploading a new image to the API.

## Web

We need a web site for our impacters to administer their posts.

Create a web site, the user should be able to

- see all posts
- update a post
- delete a post
- open a post in a modal by clicking the post
- go to the next and previous post in modal mode
- delete and update a post in modal mode


If you feel you have the time, you can also add support for the user to create a new post by uploading a new image to the API.
