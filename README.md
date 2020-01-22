# Portfolio

## My Professional Portfolio [Website](https://evanfinnigan.com)

### [evanfinnigan.com](https://evanfinnigan.com)
I'm currently looking for job opportunities as a software developer. Hire me!

## gh-pages branch
This branch contains HTML rendered from [pug](https://pugjs.org/api/getting-started.html)

### [evanfinnigan.github.io/portfolio](https://evanfinnigan.github.io/portfolio)

This website was originally written in HTML, but I recently migrated the project to pug for ease of maintenance. Pug allows my to reuse code across multiple pages, which is helpful for common features such as the nav bar and footer. Using pug locally (as opposed to rendering out files from a Node.js server, for example) allows me to keep this as a static webpage, so it can be hosted on GitHub pages. This can also lower the cost of web hosting on other platforms.

The pug template files are rendered to HTML via pug-cli locally, then uploaded to the this branch. This process is automated with a local bash script so that the pug source and the rendered html live in two seperate directories and can both use version control without exposing the pug files to the web domain.
