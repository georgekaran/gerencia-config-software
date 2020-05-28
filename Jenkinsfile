pipeline {
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
                    nodejs(nodeJSInstallationName: 'NODE_12')   {
                        sh 'npm i'
                        sh 'npm run build'
                    }
                }
            }
        }
//         stage('Test'){
//             steps {
//                 sh 'make check'
//                 junit 'reports/**/*.xml'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 sh 'make publish'
//             }
//         }
    }
}