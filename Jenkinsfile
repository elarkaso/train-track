pipeline {
  agent none

  environment {
    FRONTEND_IMAGE = 'ghcr.io/elarkaso/train-track-frontend'
    BACKEND_IMAGE = 'ghcr.io/elarkaso/train-track-backend'
  }

  stages {
    stage('Build and push frontend') {
      agent {
        kubernetes {
          yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-config
          mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      emptyDir: {}
'''
        }
      }
      steps {
        checkout scm
        container('kaniko') {
          withCredentials([usernamePassword(credentialsId: 'ghcr', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
            sh '''
              cat > /kaniko/.docker/config.json <<EOF
{
  "auths": {
    "ghcr.io": {
      "username": "${GHCR_USER}",
      "password": "${GHCR_TOKEN}"
    }
  }
}
EOF

              /kaniko/executor \
                --context "${WORKSPACE}/apps/frontend" \
                --dockerfile "${WORKSPACE}/apps/frontend/Dockerfile" \
                --destination "${FRONTEND_IMAGE}:latest" \
                --build-arg VITE_API_BASE_URL=/api
            '''
          }
        }
      }
    }

    stage('Build and push backend') {
      agent {
        kubernetes {
          yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-config
          mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      emptyDir: {}
'''
        }
      }
      steps {
        checkout scm
        container('kaniko') {
          withCredentials([usernamePassword(credentialsId: 'ghcr', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
            sh '''
              cat > /kaniko/.docker/config.json <<EOF
{
  "auths": {
    "ghcr.io": {
      "username": "${GHCR_USER}",
      "password": "${GHCR_TOKEN}"
    }
  }
}
EOF

              /kaniko/executor \
                --context "${WORKSPACE}/apps/backend" \
                --dockerfile "${WORKSPACE}/apps/backend/Dockerfile" \
                --destination "${BACKEND_IMAGE}:latest"
            '''
          }
        }
      }
    }
  }
}