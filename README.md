Incidentify is a web application for insurance professionals, designed to optimize the incident reporting and documentation process. With the power of location-based pin-dropping, you can effortlessly record and track insurance-related incidents on a map. Add crucial details like descriptions and images to create a friedly incident log.

Incidentify simplifies the way insurance workers manage cases, making it easier than ever to stay organized and stay on top of your claims.

## Getting Started

### Backend

To run the backend first download [Docker](https://docs.docker.com/get-docker/) on you machine.

After installing Docker run the comand
```bash
docker-compose up -d --build
```

This will build and run the service on your local machine on port 4444

### Frontent

NOTE: To run locally you will need the var envs, the password was sent with the link of this repo. Feel free to ping me if you need them again.

Envs: https://1time.app/secret/6rb6nqVOR2kLCMLfamyfjn9jwIJC9gvVy0WPar8Z

Once you get them, create a file `.env.local` and add them there.

To get started with the application, you need to run the development server. You can do this by running one of the following commands:
```bash
npm run dev
```

On the home page you will see a landing, in order to access the app you will need to create a user. 

The app is pretty simple, you can CRUD posts to a service that runs on Ruby.

Once loggedin you will be redirected to `/posts` where you will see all the posts on the database. 

To edit a post click on the post, and to create a new one just click on Create a new one.

You are able to upload images and save them on your post

## Built With

The application is built using several technologies:
- Next.js: A React framework for building  web applications.
- TypeScript: A typed superset of JavaScript that adds static types.
- Tailwind CSS: A utility-first CSS framework.
- Jest & React Testing Library: JavaScript Testing Framework with a focus on simplicity.
- Mapbox: An open-source mapping platform for custom designed maps.
- Kindle: Authentication in one platform.
- Cloudinary: Media managing, images upload.
- React Query: for cache management.

## Testing

The application uses Jest for testing. You can run the tests using the following command:
```bash
npm run test
```

## Code Style

The code style is enforced using ESLint with the Airbnb configuration. You can check the code style by running:
```bash
npm run lint
```

The code follows SOLID principles extracting logic from components, single responsibility, dependency injections, etc.

For GIT a rebase pattern is preffered in order to keep cleaner commit history.

Commits are written using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Deployment
Deployments are done on the [Vercel Platform](https://vercel.com/new) everytime a Pull Request is merged to main.

The app currenlty runs on https://front-repo-test-td5f.vercel.app/ but you won't be able to do much since there is no backend service available, this is explained on the difficulties point.

### Next Steps
- Right now any user could see all posts, it will be better that a user could see only his posts, this changes should be done on backend.
- Upload more types of files, currently it only accepts images.
- Work on the mobile layout, right now it only workd on desktop.
- Add Semantic Release for versioning the app.
- Add test job to the CI.
- Add a better test coverage.
- Add husky to help us write better commits.
- Add CDN for better cache
- Create a mapbox service running in our own servers.
- Add a search box to find incidents.
- Add proper form validation (joi).

### Known bugs
- There is a bug in which after saving a post and redirected to the posts page, the edited marker wont update. Probably a issue with the useEffect.
- When accesing a post, the inital marker stays at the initial position and when you grag it a new marker is created.

### Difficulties
- Couldn't Deploy the app and make it work due to the back end throwing an invalid host error. To fix it it will be needed to download the image add the host in the ruby config and then create a new image and deploy it.
- Due to the same error I was not able to create a docker network for the fornt and the back.
