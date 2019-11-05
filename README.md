# Acoustic Code Challenge in React

This is a code challenge built in two days for [Acoustic](https://acoustic.co/)
which consists in a SPA application that consumes Acoustic Content APIs and
renders the content returned using React.

![Demo](https://raw.githubusercontent.com/lpelos/acoustic-challenge-react/master/src/assets/images/demo.gif)

To be able to run these projects locally, it's highly recommended that you use
docker. If you don't have docker installed see:
https://docs.docker.com/engine/installation.

If you don't want to use docker for some reason, try and prepare your local
development environment in accordance to the technologies and versions
present in the `Dockerfile.dev` and see the how to run them in the
`docker-compose.yml`.

## Build Docker Image

```
$ docker-compose build
```

## Dev Server

```
$ docker-compose up app
```

Open your browser on http://localhost:3000/

## Build App

```
$ docker-compose run --rm app yarn build
```

## Tests

```
$ docker-compose run --rm app yarn test
```

## Logs

```
$ docker-compose logs
```

## Further help

### React

To learn React, check out the [React documentation](https://reactjs.org/).
