pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Info') {
      steps {
        sh '''
          echo "Branch: ${BRANCH_NAME:-unknown}"
          echo "Commit: $(git rev-parse --short HEAD)"
          echo "Workspace:"
          pwd
          echo "Repo structure:"
          find . -maxdepth 3 -type f | sort
        '''
      }
    }
  }
}
