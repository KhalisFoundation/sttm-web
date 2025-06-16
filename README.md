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

- **Step 1**: Clone the repo.

```bash
git clone https://github.com/KhalisFoundation/sttm-web/
```

You should now see a `sttm-web` folder in your present working directory. Let's change directory to it.

```bash
cd sttm-web/
```

- **Step 2**: Setup python version 3.12.
  - Install Python 3.12 (if not already installed)
  - On mac:
  ```bash
  brew install python@3.12
  ```
  - On Linux
  ```bash
  sudo add-apt-repository ppa:deadsnakes/ppa
  sudo apt update
  sudo apt install python3.12 python3.12-venv
  ```

  - Create an isolated virtual environment
  ```bash
  /path/to/python3.12 -m venv myenv
  ```

  - Activate it
  ```bash
  source myenv/bin/activate
  ```

- **Step 3**: Setup node version 16
  - Install nvm (if not already installed)
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```
  - Restart the terminal or run the following to activate
  ```bash
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  ```

  - Install node 16.20 using nvm
  ```bash
  nvm install 16.20
  ``` 
  - Switch to node 16
  ```bash
  nvm use 16.20
  ``` 

- **Step 4**: Install dependencies.

```bash
# `ci` doesn't update package.json, and uses package-lock.json to install intended deps.
# This makes it pretty speedy and doesn't cause unintended updates.
npm ci
```

This will use `npm` that is included with `nodejs` to install project dependencies.

- **Step 5**: Start the project.

If you are running this project for the first time or did some change, run the following command to create a build and run it:

```bash
npm run dev
```

If you want to start a previous build, run the following command.

```bash
npm start
```

This will run a bunch of build tools and a `nodejs` server to deploy the code locally.

- **Step 6**: Setup ngrok 
   
  To avoid the API cors error, we can use ngrok to get a https url of project output.
  
  - Install ngrok
  ```bash
  # On mac OS X
  brew install ngrok 
  ```
  ```bash
  # On Linux
  sudo snap install ngrok
  ```

  - Sign up & Get Auth Token
    - Go to https://ngrok.com and sign up/log in.
    - Find your Auth Token here: https://dashboard.ngrok.com/get-started/setup

  - Add your auth token
  ```bash
  ngrok config add-authtoken <your-token>
  ```

  - Since this app runs on port 8080, expose it to ngrok
  ```bash
  ngrok http 8080
  ```
  - Get the forwarding URL from the command output
  ```bash
  Forwarding    https://1234abcd.ngrok.io -> http://localhost:8000
  ```
  - Open `https://1234abcd.ngrok.io` to see project output

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
