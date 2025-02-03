# Cloud Computing Final Project Group 9

## Frontend

this project is used to authenticate users and optionally update their profile picture.

built with React and Vite. Deployed on AWS CloudFront.

### Run Locally

```bash
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000) in your browser

### production build

```bash
npm run build
```

## Description

We created a 'cloudformation-template-fe.yaml' file,
that can used in an AWS stack.
This stack automatically creates an entire CodePipeline,
and the necessary ressources
(S3-Bucket, CloudFormation distribution, Lambda for Cache Invalidation, and their Roles)
for the Frontend.

The Pipeline is connected to the GitHub-Repo (Source), so every time a push is made,
the frontend is redeployed automatically.

## Instructions for deploying the Frontend

1. Fork the GitHub-Repo to your account:
   https://github.com/bennetstrauch/cloud-final-project-frontend

2. Ceate a GitHub-Connection
   (if you already have a connection that can access all your github repos you can use this one)
   Open your AWS-Console --> CodePipeline --> Settings --> Connections --> Create Connection
   When you are asked to select an app --> Install a new app --> Repository access: Choose All repositories OR Select your forked repository from step 1.
   After creation, copy the connection Arn (arn:aws:codeconnections:....)

3. Replace your own connection Arn with the one in the .yaml-template
   Search the cloudformation-template-fe.yaml for ConnectionArn and replace with your own Arn (Line 92)
4. In same file, one Line below, at: 'FullRepositroyId', Replace the Github-repo-Link with your own forked  
   repo from step 1. Save file.
   (This step is necessary because one needs admin right to the repo so that the Pipeline can automatically deploy on pushes)

5. Create Stack in AWS
   In your AWS-console, open CloudFormation --> Create Stack --> With new ressources --> Upload a template file --> Choose the in previous steps modified .yaml-file --> ALl other settings can be left default

6. Access your Cloudfront
   After Stack creation is finished:
   AWS-Console --> Cloudfront --> Click on distribution with description: 'Frontend CloudFront distribution',
   copy 'Distribution Domain Name' and open in your Browser
   Tadaaaaa!
