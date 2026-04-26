pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '522632170020'
        AWS_REGION = 'ap-south-1'
        ECR_REPO_NAME = 'ecommerce-backend'
        SCANNER_HOME = tool 'SonarScanner'
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
                sh 'trivy image 522632170020.dkr.ecr.ap-south-1.amazonaws.com/ecommerce-backend:13 --severity HIGH,CRITICAL --scanners vuln --timeout 10m'
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${BUILD_NUMBER}"
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    sh "sed -i 's|IMAGE_TAG|${BUILD_NUMBER}|g' k8s/deployment.yaml"
                    sh "kubectl apply -f k8s/deployment.yaml"
                    sh "kubectl apply -f k8s/service.yaml"
                }
            }
        }

        stage('Dynamic Security Testing (DAST)') {
            steps {
                script {
                    // Placeholder for OWASP ZAP scan
                    // In a real scenario, you'd wait for the LB URL and run zap-baseline.py
                    echo "Running OWASP ZAP Baseline Scan..."
                    sh "docker run --rm -t owasp/zap2docker-stable zap-baseline.py -t http://YOUR_APP_LB_URL"
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
st {
        always {
            cleanWs()
        }
    }
}
