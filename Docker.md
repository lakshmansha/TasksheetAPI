# Steps for Run API inside Container with DB as Container

## Step 1:

Create an Network for Docker with below Command:

```powershell

docker network create tasksheet

```

## Step 2:

Created Run the Mongo Container with mapping the created network using below Command:

```powershell

docker pull mongo
docker run --network tasksheet --network-alias mssql --name mongodb -p 37017:27017 -d mongo

```

## Step 3:

Created Run the API Container with mapping the created network using below Command:

```powershell

docker build -f Dockerfile.dev -t tasksheetapi:dev .
docker run --network tasksheet -it --rm -p 8001:8000 -v ${PWD}/src:/usr/src --name tasksheetapi tasksheetapi:dev

```

#### Refered Links

- [Multi container apps](https://docs.docker.com/get-started/07_multi_container/)
