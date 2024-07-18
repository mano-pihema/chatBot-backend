# Job Interview Bot Back-End
Back end for a interview chatbot with streamed responses.

## Set up

This repo depends on the frontend [repo](https://github.com/mano-pihema/chatBot-frontEnd) for use. 

1. **Clone the repository**:
   ```sh
   git clone https://github.com/mano-pihema/chatBot-backend.git
   ```
2. **Change dir**:
   ```sh
   cd chatBot-backend
   ```

3. **Create a .env file**:
   ```env
   API_KEY=YOUR GOOGLE AI STUDIO KEY
   SPEECH_API_URL=https://texttospeech.googleapis.com/v1beta1/text:synthesize
   GOOGLE_API_KEY= YOUR TEXT TO SPEECH KEY
   SYSTEM="Act as an interviewer based on the job title that the user has stated, using a formal tone. \nStep 1: Ask the user \'Tell me more about yourself.\' \nStep 2: Ask the user six interview questions related to the job title, one by one. Waiting for a response from user before asking the next question\nStep 3: Give the user feedback on how well they answered the questions at the end, after they have finished answering all the questions."

   ```
4. **Install dependencies**:
   ```sh
   npm install
   ```
5. **Run App**:
    ```sh
   npm run dev
   ```
