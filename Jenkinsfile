pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        ALLURE_RESULTS = 'allure-results'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                    npm install -g allure-commandline
                    allure generate allure-results --clean -o allure-report
                '''
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }
        success {
            telegramSend(message: "✅ Тесты пройдены: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            telegramSend(message: "❌ Тесты упали: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}
