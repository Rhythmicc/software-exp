if [ $(echo $1 | grep "b") != "" ]; then
    echo "Start package Backend"

    if [ ! -d static ]; then
        mkdir static
        mkdir static/backend
    fi

    mvn clean package -f vhr/pom.xml
    ln -snf $(pwd)/vhr/vhrserver/vhr-web/target/vhr-web-0.0.1-SNAPSHOT.jar static/backend/vhr.jar
    ln -snf $(pwd)/vhr/vhrserver/vhr-web/src/resource/application.yml static/backend/application.yml
    echo "Backend packaged"
fi
if [ $(echo $1 | grep "f") != "" ]; then
    echo "Start package Frontend"

    if [ ! -d static/frontend ]; then
        echo "Start Create Express Frontend Template"
        cd static
        npm i -g express
        express frontend
        cd frontend
        npm i
        echo "Express Frontend Template Created!"
        cd ../../
    fi

    cd vuehr
    if [ ! -d node_modules ]; then
        npm i
    fi
    npm run build
    cd ../static/frontend
    if [ -d public ]; then
        rm -rf public/*
    fi
    mv ../../vuehr/dist/* public/

    echo "Frontend packaged!"
fi
echo "All Finished"
