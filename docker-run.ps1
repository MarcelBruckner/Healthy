docker build -t marcelbruckner/healthy .
docker run -p 3000:3000 -v $PWD/data:/data marcelbruckner/healthy