**1. What did you ask the AI to help you with, and why did you choose to use AI for that specific task?**

Your response...

- creating seed data and debugging previous data
- ai is good at creating data

Once I completed the schema inside of the `seed.js` file, I knew I needed data to populate the tables I had just created. Rather than spending considerable time to create and insert data that could potentially be inserted wrong,  
I asked AI:
_I need some data for my seed file written in JavaScript for a Postgres database. Here is the schema for the data: [schema here]_
_Please insert the data following this format:_
_const { rows: events } = await Promise.all([_
_// pool.query(eventQuery, [''])_
_])_

Once the data was created, I also asked AI to debug some errors I was getting, as I inserted some of the code that was AI-generated into pre-existing code.  
I sought out AI for this task as it could insert data quickly without having to worry about correctly filling in all the parameters. Additionally, AI can quickly point out any issues that occurred when inserting the AI code vs. the pre-written code. For example, AI had notified me one of my errors was due to my pre-written query statement lacking commas between some of the values.

- **2. How did you evaluate whether the AI's output was correct or useful before using it?**

Your response...

- tested through psql and looked at tableplus to ensure columns were correctly filled

I evaluated the data AI had given by first running the seed file to check for any errors along with filling the database, then opening the database through psql. For each table, I queried `SELECT * FROM [table_name];` to confirm the data was inserted successfully. Despite that, since the `events` table had many columns, I decided to more adequately check if the data was correct through TablePlus. Once opening the table, I saw that each event was inserted with the right values for each column.  
As for the errors in the seed file, I confirmed AI was correct as I tested the suggested code and received no errors in return. Once tested, I hand typed the suggestions themselves into my pre-existing code to ensure there was no other code that could be fixing the issue. Once I typed it out, I got no errors which confirmed AI was correct.

**3. How did what the AI produced differ from what you ultimately used, and what does that tell you about your own understanding of the problem?**

- filling rsvp table only required one pool.query call and not promise.all
- thought i had to individually call each query
- added syntax to query i forgot,
  Your response...

- **4. What did you learn from using AI in this way?**
- reminder to double check syntax
- helpful for seeding data
  Your response...
