pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    tools {
        maven 'localmaven'
    }
    stages {
        stage('Build - Backend') {
            steps {
                sh 'cd backend'
                sh 'ls'
                sh 'mvn clean package'
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