pipeline {
    environment {
        registryApp = "georgekaran/gcs-app"
        registryBackend = "georgekaran/gcs-backend"
        registryCredential = 'dockerhub'
        dockerImageApp = ''
        dockerImageBackend = ''
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
                    sh 'cp target/(*.jar) docker/'
                },
                dir("app") {
                    sh 'cp build docker/'
                }
            }
            steps {
                script {
                    dockerImageApp = docker.build(registryApp + ":1.0.0","./app/docker")
                    dockerImageBackend = docker.build(registryBackend + ":1.0.0","./backend/docker")
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
                sh "docker rmi $registryApp:1.0.0"
                sh "docker rmi $registryBackend:1.0.0"
            }
        }
    }
}