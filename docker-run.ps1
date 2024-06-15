docker build -t marcelbruckner/pooptracker .
docker run -p 3000:3000 -v $PWD/data:/data marcelbruckner/pooptracker