# Voronoi

A ReactJS app for creating and viewing Delaunay triangulations and Voronoi diagrams.

See a [live demo here](http://james.schwartz.engineer/voronoi).

![Voronoi](http://james.schwartz.engineer/voronoi/Voronoi.png)

## Usage
This application uses [Create React App](https://github.com/facebookincubator/create-react-app).

```sh
git clone https://github.com/jbschwartz/voronoi
cd voronoi
npm install
npm start
```
Then open [http://localhost:3000/](http://localhost:3000/).

To deploy the application, use:
```sh
npm run build
```

See the Create React App [read me](https://github.com/facebookincubator/create-react-app) for more information.

## Algorithm
This application implements the algorithm as described by Paul Bourke [here] (http://paulbourke.net/papers/triangulate/).
