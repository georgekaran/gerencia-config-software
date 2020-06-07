pipeline {
    environment {
        registryApp = "georgekaran/gcs-app"
        registryBackend = "georgekaran/gcs-backend"
        registryCredential = 'dockerhub'
        dockerImageApp = ''
        dockerImageBackend = ''
        version = ''
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
                    version = getVersion()
                    dockerImageApp = docker.build(registryApp + ":${version}","./app/docker")
                    dockerImageBackend = docker.build(registryBackend + ":${version}","./backend/docker")
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
                sh "docker rmi $registryApp:${version}"
                sh "docker rmi $registryBackend:${version}"
            }
        }
    }
}

def getVersion() {
    def pom = readMavenPom file: 'backend/pom.xml'
    return pom.version.replace("-SNAPSHOT", "")
}