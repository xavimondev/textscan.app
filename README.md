<p align="center">
  <a href="https://textscan.vercel.app" target="_blank">
    <img src="./public/img/banner.png" width="100%" alt="Banner" />
  </a>
</p>

# Textscan

Textscan is a web app that detects and extracts text from any image using OCR(optical character recognition), a feature from [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr).

## How to run locally

1. Clone this project.
2. Run `npm install`.
3. Rename `.env.example` to `.env`.
4. Go to [Vision API](https://cloud.google.com/vision/docs/setup) to create an account and generate your credentials.json file.
5. Open your credentials file and copy the following values: `client_id`, `client_email`, `private_key`, `project_id` to the corresponding environment variables. Keep in mind that when you're working on localhost you'll need to have `GOOGLE_CLIENT_PRIVATE_KEY` in double quotes.
6. Run `npm run dev` and go to [localhost:3000](http://localhost:3000).
