pipeline {
    agent any

    stages {
        stage('Configure project for dev') {
            when{
                branch 'dev'
            }
            steps {
                echo 'Configure the project'
                sh 'ls -la'
                sh 'cp /home/fedora/.credentials/.env /var/lib/jenkins/workspace/mapbox-frontend_dev'
            }
        }

        stage('Configure project for main') {
            when{
                branch 'main'
            }
            steps {
                echo 'Configure the project'
                sh 'mv mapbox-frontend_main mapbox-frontend'
                sh 'cp /home/fedora/.credentials/.env /var/lib/jenkins/workspace/mapbox-frontend'
            }
        }

        stage('Buil') {
            steps {
                echo 'Building..'
                sh 'npm i'
                sh 'ls -la'
                sh 'npx webpack'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                echo 'Delete the older version'
                sh 'rm -rf /var/www/mapbox-frontend'
                sh 'mv /var/lib/jenkins/workspace/mapbox-frontend_dev /var/lib/jenkins/workspace/mapbox_frontend'
                sh 'mv /var/lib/jenkins/workspace/mapbox-frontend /var/www' 
            }
        }
    }
}