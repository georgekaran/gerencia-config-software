pipeline {
    environment {
        registryApp = "georgekaran/gcs-app"
        registryBackend = "georgekaran/gcs-backend"
        registryCredential = 'dockerhub'
        dockerImageApp = ''
        dockerImageBackend = ''
        pomInfo = readMavenPom file: 'backend/pom.xml'
    }
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build and Test - Backend') {
            steps {
                dir("backend") {
                    sh './mvnw clean package'
                }
            }
        }
        stage('Build and Test - App') {
            steps {
                dir("app") {
                    sh 'npm i'
                    sh 'npm run build'
                }
            }
        }
        stage('Building Docker Images') {
            steps {
                dir("backend") {
                    sh 'cp target/app.jar docker/app.jar'
                }
                dir("app") {
                    sh 'cp -r build docker/'
                }
                script {
                    dockerImageApp = docker.build(registryApp + ":" + pomInfo.version,"./app/docker")
                    dockerImageBackend = docker.build(registryBackend + ":" + pomInfo.version,"./backend/docker")
                }
            }
        }
        stage('Deploy Docker Images') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImageApp.push()
                        dockerImageBackend.push()
                    }
                }
            }
        }
        stage('Remove Unused Docker Images') {
            steps {
                sh "docker rmi $registryApp:${pomInfo.version}"
                sh "docker rmi $registryBackend:${pomInfo.version}"
            }
        }
    }
}