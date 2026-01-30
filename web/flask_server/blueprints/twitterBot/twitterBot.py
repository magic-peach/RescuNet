from flask import Blueprint, request
import os

DEMO_MODE = os.environ.get("DEMO_MODE", "false").lower() == "true"

twitterBot = Blueprint("twitterBot", __name__)

# Twitter API setup - mock in demo mode
client = None
if DEMO_MODE:
    print("[DEMO MODE] Twitter API mocked - tweets will be logged to console")
else:
    try:
        import tweepy

        client = tweepy.Client(
            bearer_token=os.environ.get("TWITTER_BEARER_TOKEN"),
            consumer_key=os.environ.get("TWITTER_CONSUMER_KEY"),
            consumer_secret=os.environ.get("TWITTER_CONSUMER_SECRET"),
            access_token=os.environ.get("TWITTER_ACCESS_TOKEN"),
            access_token_secret=os.environ.get("TWITTER_ACCESS_SECRET"),
        )
        print("Connected to TwitterAPI Successfully")
    except Exception as e:
        print(f"Warning: Could not initialize Twitter client: {e}")


@twitterBot.route("/test")
def index():
    return "Twitter Bot."


@twitterBot.post("/reply")
def replyToPost():
    tweet_id = request.form.get("tweet_id")
    content = request.form.get("content")
    print(tweet_id, content)

    if tweet_id and content:
        if DEMO_MODE or client is None:
            print(f"[DEMO MODE] Would reply to tweet {tweet_id}: {content}")
            return {"Status": "Success (Demo Mode)"}
        else:
            client.create_tweet(text=content, in_reply_to_tweet_id=tweet_id)
            return {"Status": "Success"}
    else:
        return {"Status": "Error"}
