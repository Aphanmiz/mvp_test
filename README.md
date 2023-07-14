# Full Stack Journal App (Powered by AWS Amplify)

Welcome to the repository of our full stack journal app, a robust and user-friendly application that allows users to create, manage, and store journal entries seamlessly. This application is built using AWS Amplify, a set of tools and services that enables end-to-end secure, scalable, and robust cloud-based applications.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Deployment](#deployment)

## Features

- **User Authentication**: Sign up and log in using AWS Cognito.
- **Journal Management**: Create, update, delete, and read journal entries.
- **Secure Data Storage**: All data is securely stored in an AWS DynamoDB table.
- **Offline Support**: Sync data when back online with AWS AppSync.
- **Search Functionality**: Full-text search with Amazon Elasticsearch.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js and npm
- AWS CLI
- AWS Amplify CLI

## Installation

1. Clone this repository

```
git clone https://github.com/your_username/full-stack-journal-app.git 
cd full-stack-journal-app
```
 

2. Install the dependencies
```
npm install
```

3. Initialize the Amplify project
```
amplify init
```
Follow the prompts to configure your AWS credentials and select your preferred region.

4. Deploy the back end
```
amplify push
```

## Deployment
To deploy the application:
```
npm run build
```
