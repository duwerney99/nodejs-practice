check-group:
ifndef ENV
	$(error Please set ENV=[dev|test|prod])
endif

check-project:
ifndef PROJECT_ID
	$(error Please set PROJECT_ID)
endif

check-commit-sha:
ifndef COMMIT_SHA
	$(error Please set COMMIT_SHA)
endif

check-service-name:
ifndef SERVICE_NAME
	$(error Please set SERVICE_NAME)
endif

prerequisites=check-project check-group check-service-name

deploy: check-project check-commit-sha check-service-name
	gcloud builds submit --project $(PROJECT_ID) --verbosity debug --substitutions=_PROJECT_ID=$(PROJECT_ID),_COMMIT_SHA=$(COMMIT_SHA),_SERVICE_NAME=$(SERVICE_NAME) .

base64:
	openssl base64 -A -in .env -out .env.txt

replace-files:
	envsubst
