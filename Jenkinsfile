pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Build - Backend') {
            steps {
                sh 'ls'
                sh 'cd backend'
                sh '/bin/sh ./mvnw clean'
                sh '/bin/sh ./mvnw package'
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