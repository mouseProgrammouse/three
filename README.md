
<img src="./teapot.png" style="width:100%"/>

# Interactive 3D Graphics Course Homework

This repository contains practical examples for tasks in the ["Interactive 3D Graphics"](https://learn.udacity.com/courses/cs291) Udacity course.
The course covers essential concepts like 3D graphics principles, including meshes, transforms, lighting, 
animation, and building interactive 3D applications that smoothly run in web browsers.

## Prerequisites

Install Node Version Manager (nvm). 
This project uses a specific version of Node.js and npm. To manage the correct version, we recommend using `nvm`.

1. To install `nvm` run the following command:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash 
```

2. After the installation, restart your terminal or run:
```
source  ~/.zshrc
```

3. We have an .nvmrc file with the correct Node.js version for this project. Switch to the correct Node.js version by running:
```
nvm use
```


## Usage

To run the project, follow these steps:

1. Install all the dependencies by running:
```
npm install
```

2. To bundle all the projects and start the development server with Rollup, use:

```
npm run start

```
This will bundle your code using Rollup, start the development server, and enable live reloading for any changes.

3.  To bundle and serve a specific project (e.g., 01), use:
```
npm run dev page:01
```
This command will bundle and serve only the specified project (in this case, page 01), allowing you to focus on a particular project while still benefiting from live reloading.

4. Open `localhost:8080` in a web browser to view the project.

### Course Information

Interactive 3D Graphics on Udacity.
[Course Link](https://learn.udacity.com/courses/cs291)
