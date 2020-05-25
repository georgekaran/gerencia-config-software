pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build - Backend') {
            steps {
                dir("backend") {
                    sh './mvnw clean package'
                }
            }
        }
        stage('Test - Backend') {
            steps {
                sh 'ls'
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