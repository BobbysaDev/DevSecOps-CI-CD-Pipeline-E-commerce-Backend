pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '522632170020'
        AWS_REGION = 'ap-south-1'
        ECR_REPO_NAME = 'ecommerce-backend'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BobbysaDev/DevSecOps-CI-CD-Pipeline-E-commerce-Backend.git'
            }
        }

        stage('File Vulnerability Scan (Trivy FS)') {
            steps {
                sh 'trivy fs . --severity HIGH,CRITICAL'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Container Image Scan (Trivy)') {
            steps {
                retry(2) {
                    sh "trivy image ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${BUILD_NUMBER} --severity HIGH,CRITICAL --scanners vuln --timeout 10m"
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                    export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
                    export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

                    aws ecr get-login-password --region ap-south-1 | \
                    docker login --username AWS --password-stdin 522632170020.dkr.ecr.ap-south-1.amazonaws.com

                    docker push 522632170020.dkr.ecr.ap-south-1.amazonaws.com/ecommerce-backend:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}