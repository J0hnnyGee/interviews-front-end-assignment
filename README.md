<!---
Hi! We're happy you opened this file, not everyone does!
To let us know you did, paste a capybara picture 
in the How to Run section 😊 
These will be extra points for you!
-->

# React Developer Interview Assignment

## Introduction

This is an interview exercise for the Digital Products team of [xtream](https://www.linkedin.com/company/xtream-srl). In
the following sections, you will find a number of challenges that we ask you to implement. You **DO NOT NECESSARILY need
to complete 100% of them**: you can choose to complete as many as you want.

:watch: We give you **1 week** to submit a solution, so that you can do it at your own pace. We are aware that you might
have other commitments, so we are not expecting you to work on this full-time. You will be evaluated based on the
quality of your work, not on the time you spent on it.

### Deliverables

Simply fork this repository and work on it as if you were working on a real-world project assigned to you. A week from
now, we will assess your work.

:heavy_exclamation_mark: **Important**: At the end of this README, you will find a "How to run" section that is not
written out. Please, write there instructions on how to run your code: we will use this section to evaluate your work.

### Evaluation

Your work will be assessed according to several criteria. As an example, these include:

* Code quality
* Design Patterns
* Project Structure
* Work quality (commits, branches, workflow, tests, ...)
* Provided Documentation

#### A Friendly Reminder:

We’re all about embracing the latest in AI, including GPT and similar technologies. They’re great tools that can provide
a helping hand, whether it’s for generating ideas, debugging, or refining solutions. However, for this coding challenge,
we’re really keen to see your personal touch. We're interested in your thought process, decision-making, and the
solutions you come up with.

Remember, while using AI tools can be incredibly helpful, the essence of this task is to showcase your skills and
creativity. Plus, be prepared to dive into the details of your code during the technical interview. Understanding the '
why' and 'how' behind your decisions is crucial, as it reflects your ability to critically engage with the technology
you're using.

So, feel free to lean on AI for support, but ensure your work remains distinctly yours. We're looking for a blend of
technical savvy and individual flair. Dive in, get creative, and let’s see what you can create. Excited to see your
work. Happy coding! 🚀💼👩‍💻

### Let's get started

We do understand that some topics might be unfamiliar for you. Therefore, pick any number of challenges and try to
complete them.

:heavy_exclamation_mark:**Important**: you might feel like the tasks are somehow too broad, or the requirements are not
fully elicited. **This is done on purpose**: we want to give you the freedom to make your own choices and to put as
fewer constraints as possible on your work. We appreciate if you could record any decisions, assumptions and doubts,
together with any questions that you will ask in a real-world scenario. If you want to choose our stack instead, we
generally work with TypeScript and React.

---   

### Problem Domain

Your task is to build a web application for RecipeBook, a community-driven recipe sharing platform. Users can browse
recipes, add new recipes, and leave comments and ratings. The application should allow users to search for recipes by
ingredients or cuisine and filter results based on dietary preferences. Do no consider authentication and authorization.

If you need some inspiration, you can take a look at [UI example folder](./ui-examples), where you can find some
generated screenshots of the application. Consider them as a starting point of a more complex application with respect
to the one that you have to build, but feel free to design your own UI.

Inside the [server](./server) directory there is a simple server that you can use to fetch the data. We suggest you to
read the instruction to setup it in the [server README](./server/README.md), you should find all the api endpoints that
you need to complete the challenges.

#### Challenge #1: Recipe List

Create the first RecipeBook page: the recipe list! Each recipe have a name, a photo, a list of ingredients
and many more details that you can find in the data model. Consider to avoid to show all the recipes at once to reduce
the browser load.

#### Challenge #2: Search and Filter

Add a search bar and a list of filters based on cuisine, difficulty and dietary preferences (e.g., vegetarian, gluten-free).

### Challenge #3: Add a Recipe

Design a form that allows users to add new recipes by providing details such as the recipe name, ingredients,
instructions, cuisine type, and dietary preference and an image.

### Challenge #4: Recipe Details and Comments
Develop a recipe details page where users can view the full recipe, including ingredients, instructions, and user
comments. Enable users to add comments and rate the recipe, displaying the average rating and updating the list of
comments.

## How to run
<p align="center">
<img  src="https://i.pinimg.com/564x/9c/d0/40/9cd040a4bcd9299c8980a16713016ea7.jpg"/>
</p>



### Frontend
To start the front-end go into the frontEnd folder:

```bash
cd frontEnd
```

And then start it with:

```bash
npm run dev
```

### Server
To run the server go to the server folder:

```bash
cd server
```
And then start it with:

```bash
npm start
```


## Documentation
For the project realization the following technologies have been used:

- ReactJS
- React Router (for a SPA approach)
- Axios (to better handle API calls and errors)

### About the functionalities

#### Main Page
<img  src="https://github.com/J0hnnyGee/interviews-front-end-assignment/blob/main/frontEnd/public/Main%20page.png"/>

The main page is made of three main components:
- Navbar
- Recipe List
- Sidebar

#### Navbar
Through the navbar thanks to react routing is possible to visit the webapp's pages using a single-page-application approach.

#### Navbar
The recipe list is showing as default the whole dateset of recipes present in the given API, divided in groups to reduce the browser load. 
Is possible to see the other recipes using the buttons at the bottom.

#### Sidebar
The sidebar makes possible for the use to filter the shown recipes using the given fields.
To make less possible for the user to make errors, and to get a more modern UI, for all the field exept the name it has been chosen to show some selectable options or a slider.

#### Add Recipe
<img  src="https://github.com/J0hnnyGee/interviews-front-end-assignment/blob/main/frontEnd/public/Add%20recipe%20page.png"/>

Through the "Add" button of the Navbar is possible for the user to visit the Add recipe page.
Here the user can add all the details of his favourite recipe.

Some important details for this section are:
- It's possible to load an image, see it, and delete it.
- It is possible to add and delete recipe ingredients
- A maximum of four ingredients are shown to avoid crowding the interface


### Future implementations
The webapp here shows some basic functionalities, but here I would like to give some possible future implementations:
- A working add recipe operation (at the moment only in UI)
- A recipe detail page
- A profile page
- The chance for the user to save his favourite recipes
- Some animations to make the UX more enjoyable
- Filter the recipes by category
- A more robust error handling and responsiveness

