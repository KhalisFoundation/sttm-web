![SikhiToTheMax's logo](/public/assets/images/sttm_logo.png)

# SikhiToTheMax Website

Originally developed by SHARE Charity UK, SikhiToTheMax has become a defacto standard for Keertans and gurdwaras around the world to display Gurbani on screens for Sangat to join into the depth of Gurbani and translations.

SikhiToTheMax is now developed by Khalis Foundation as Seva to the Panth and Khalis Foundation is working hard to ensure it lives up to its name.
Khalis Foundation Sevadaars are currently working hard to build newer version of SikhiToTheMax website using modern web technologies.

Website: http://www.SikhiToTheMax.org

Developer: Khalis Foundation and Sevadars (see committers for more details)

Acknowledgements: Bhai Tarsem Singh UK, SHARE UK, Khalis Foundation, Khalsa Foundation UK, Dr. Sant Singh Khalsa, Dr. Kulbir Singh Thind

Powered by [<img height="30" src="http://www.banidb.com/wp-content/uploads/2018/03/full-banidb-logo.png">](http://banidb.com)

## Build Instructions

Make sure you've [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) & [`nodejs`](https://nodejs.org/en/) installed in your system. We advise using Node version 8 or above, and npm version 5.7 or above.

Open terminal and follow these steps;

- Step 1: Clone the repo.

```bash
git clone https://github.com/KhalisFoundation/SikhiToTheMax-Web/
```

You should now see a `SikhiToTheMax-Web` folder in your present working directory. Let's change directory to it.

```bash
cd SikhiToTheMax-Web/
```

- Step 2: Install dependencies.

```bash
# `ci` doesn't update package.json, and uses package-lock.json to install intended deps.
# This makes it pretty speedy and doesn't cause unintended updates.
npm ci
```

This will use `npm` that is included with `nodejs` to install project dependencies.

- Step 3: Start the project.

```bash
npm start
```

This will run a bunch of build tools and a `nodejs` server to deploy the code locally.

- Step 4: Access your local dev environment of the SikhiToTheMax website

```bash
# On mac OS X
open http://localhost:8080
# On Linux
google-chrome http://localhost:8080
# On windows
start chrome http://localhost:8080
# Or just open chrome and enter the URL manually.
```

## Contributing

[Slack](https://khalis.slack.com/) channel.

Before raising a pull request, please go through [CONTRIBUTING.md](CONTRIBUTING.md). We use `dev` branch as the development branch, while `master` is the production branch. You should branch out from `dev` branch and raise a PR against `dev` branch. You can see your submitted changes on [dev.sikhitothemax.org](http://dev.sikhitothemax.org).

## Project Overview

You can watch this project and code [walkthrough](https://www.youtube.com/watch?v=XNMPiiIQZ2o).

[![Walkthrough](https://img.youtube.com/vi/XNMPiiIQZ2o/0.jpg)](https://www.youtube.com/watch?v=XNMPiiIQZ2o).

## License

[GSL](/LICENSE)

All images and assets not covered under other licenses are covered under full Copyright © 2019 Khalis Foundation.

Site made reliable with help of [<img src=".github/README_IMAGES/browserstack.svg" alt="BrowserStack" height="15px" />](https://www.browserstack.com/open-source)
