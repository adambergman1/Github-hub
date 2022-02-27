# Github-Hub

For a better overview of your many repositories spread out along different organizations on Github

## Abilities

* View your repositories or by organization  
        * Limited to repositories with admin access  
        * Limited to the 100 most recent updated
* View statistics for push, issues and releases on user & organization level  
* Subscribe to repositories and choose to receive all or any of the following events:  
        * Releases  
        * Issues  
        * Push  
* Get live updates on your repo(s) based on your subscription settings
* Add a custom webhook URL to receive notifications while you are offline

## Demo

![screenshot-github-app adambergman me-2021 03 26-13_31_20](https://user-images.githubusercontent.com/14334381/112631808-a22aee00-8e37-11eb-97d4-3a6d2642ac5b.png)

## Environment
 
**Client**: Built with React.js, Recharts, Notistack & Material UI.  
**Server**: Built with JavaScript.

Deployed on AWS using Serverless Framework.

## Development

### Client

1. In terminal, type `npm install`
2. Go to `src/compontents/Login.js` and set your Github clientID
3. Go to `src/components/Dashboard/Notifications.js` and set your WebSocket URL
4. `npm start`

### Server

1. In terminal, type:

    ```
    npm install serverless -g
    npm install
    ```

2. Open `serverless.yml` and edit the following:

    ```
    service:
    app:
    org:
    CLIENT_URL:
    SERVER_URL:
    bucketName:
    domainName:
    ```

3. In AWS Parameter Store, set your `clientId`, `clientSecret` & `secretToken`
4. In terminal, type `serverless deploy`
