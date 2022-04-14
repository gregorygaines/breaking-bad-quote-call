# Breaking Bad Quote Call
A Twilio application that plays Breaking Bad quotes when called

# Usage
Install packages with the command:
```
npm install
```

Start the server using the command:

```
node app.js
```

A ngrok url should print out like:

```angular2html
Connected to url: https://xxxx-xx-xx-xxx-xx.ngrok.io
```

Go to Twilio and attach the ngrok url to the incoming call webhook for your
Twilio number:

![Webhook](docs/webhook.png)

After saving, you're now able to call your Twilio number and hear Breaking Bad Quotes!!

## Testing

Create an `.env` file and add your Twilio api keys and number.

```javascript
TWILIO_ACCOUNT_SID=<YOU_ACCOUNT_SID>
TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN>
TWILIO_NUMBER=<YOUR_GENERATED_TWILIO_NUMBER> # Ex. +14045555555
```

Then uncomment this code in `app.js` and when you start the server,
you should get a phone call playing the quote.

```javascript
 twilioClient.calls.create({
  to: '<TARGET_PHONE_NUMBER',
  from: process.env.TWILIO_NUMBER,
  url: voiceUrl,
  method: 'POST'
}).then((call) => {
  console.log(call);
}).catch((err) => {
  console.log("Error making call " + err);
});
```