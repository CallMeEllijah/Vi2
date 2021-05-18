# Vi2 Tutoring Chatbot

Run the ff to setup: `npm install` then `cd client && npm install`

Do the ff to start:
1. `npm run start` for the front end
2. `cd backend && node server.js` for the backend
---
## To add:
- unrelated questions (conversational aspect)
- hinting / other helpful tips to user
- assessment determined based on total correct/wrong answers
-- calculate assessment level (db will contain array of assessment level per question to be averaged once everything is finished)
- types where the student is lacking (saved to db with assessment level)
-- comprehension / procedural fluency / (visualization)
---
## To test:
- perfect answering of questions
- mistakes on some questions
---
## Notes:
- strategic competence—ability to formulate, represent, and solve mathematical problems
-- first 8 - conceptual understanding and strategic competence
-- last 4 - procedural fluency skill
-- expert being 12 point = intermediate being 8 points = beginner being 4 points
- everytime mag checheck check points
-- this is done by checking muna if wrong kung sinabi na wrong sorry try again or something ganun subtract points
-- if reply is like wanna go to the next question then add points
-- then at the pinaka end where the bot says we dont foo we calculate point then update user model