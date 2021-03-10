# software-exp

## Install

- java: 11.0.10
- Vue ^2.9
- Maven

```shell
chmod +x install.sh
chmod +x backend.sh
chmod +x frontend.sh

./install.sh bf # which means install backend & frontend
```

## Run

```shell
./backend.sh  # Start up backend
./frontend.sh # Start up frontend
```

## ENV

- OS: Linux & Mac & ... (if you want to use Windows, you should install by yourself)

## Struct

```shell
> exa --tree -l -L 2
drwxr-xr-x    - root 10 Mar 21:35 .
.rwxr-xr-x   79 root 10 Mar  0:01 ├── backend.sh
.rw-r--r--  137 root 10 Mar  0:39 ├── docker-compose.yml
.rw-r--r--    5 root  9 Mar 14:20 ├── Dockerfile
.rwxr-xr-x   29 root  9 Mar 23:03 ├── frontend.sh
.rwxr-xr-x 1.0k root  9 Mar 23:38 ├── install.sh
.rw-r--r--  380 root 10 Mar 21:34 ├── README.md
drwxr-xr-x    - root  9 Mar 23:17 ├── static                 # Compiled packages
drwxr-xr-x    - root  9 Mar 23:30 │  ├── backend
drwxr-xr-x    - root  9 Mar 23:17 │  └── frontend
drwxr-xr-x    - root 10 Mar 21:37 ├── vhr                    # Source code of backend
drwxr-xr-x    - root  9 Mar 23:30 │  ├── mailserver
.rw-r--r--  791 root 28 Feb 20:16 │  ├── pom.xml
.rw-r--r--  574 root 28 Feb 20:16 │  ├── vhr.iml
drwxr-xr-x    - root  1 Mar  0:23 │  └── vhrserver
.rw-r--r--  510 root 10 Mar  0:27 ├── vhr.conf
.rw-r--r-- 209k root  9 Mar 13:50 ├── vhr.sql
drwxr-xr-x    - root 10 Mar 21:01 └── vuehr                  # Source code of frontend
.rw-r--r--  335 root 28 Feb 20:16    ├── babel.config.js
drwxr-xr-x    - root 10 Mar 20:44    ├── dist
drwxr-xr-x    - root 10 Mar 20:44    ├── node_modules
.rw-r--r-- 447k root 10 Mar 15:17    ├── package-lock.json
.rw-r--r-- 1.0k root 10 Mar 15:17    ├── package.json
drwxr-xr-x    - root 28 Feb 20:16    ├── public
.rw-r--r--  125 root 28 Feb 20:16    ├── README.md
drwxr-xr-x    - root 10 Mar 21:07    ├── src
.rw-r--r--  843 root  9 Mar 17:15    └── vue.config.js
```

- You can dowmload my 3D model at: [model.gltf](https://cos.rhythmlian.cn/model.gltf), and move it to `vhr/vhrserver/vhr-web/src/main/resources/static/dae/`

