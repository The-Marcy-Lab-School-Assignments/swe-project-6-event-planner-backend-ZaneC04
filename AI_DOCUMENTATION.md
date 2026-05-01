**1. What did you ask the AI to help you with, and why did you choose to use AI for that specific task?**

Once I completed the schema inside of the `seed.js` file, I knew I needed data to populate the tables I had just created. Rather than spending considerable time to create and insert data that could potentially be inserted wrong,  
I asked AI:
_I need some data for my seed file written in JavaScript for a Postgres database. Here is the schema for the data: [schema here]_
_Please insert the data following this format:_
_const { rows: events } = await Promise.all([_
_// pool.query(eventQuery, [''])_
_])_

Once the data was created, I also asked AI to debug some errors I was getting, as I inserted some of the code that was AI-generated into pre-existing code.  
I sought out AI for this task as it could insert data quickly without having to worry about correctly filling in all the parameters. Additionally, AI can quickly point out any issues that occurred when inserting the AI code through the pre-written code. For example, AI had notified me one of my errors was due to my pre-written query statement lacking commas between some of the values.

- **2. How did you evaluate whether the AI's output was correct or useful before using it?**

I evaluated the data AI had given by first running the seed file to check for any errors along with filling the database, then opening the database through psql. For each table, I queried `SELECT * FROM [table_name];` to confirm the data was inserted successfully. Despite that, since the `events` table had many columns, I decided to more adequately check if the data was correct through TablePlus. Once opening the table, I saw that each event was inserted with the right values for each column.  
As for the errors in the seed file, I confirmed AI was correct as I tested the suggested code and received no errors in return. Once tested, I hand typed the suggestions themselves into my pre-existing code to ensure there was no other code that could be fixing the issue. Once I typed it out, I got no errors which confirmed AI was correct.

**3. How did what the AI produced differ from what you ultimately used, and what does that tell you about your own understanding of the problem?**

What the AI had produced had some syntax differences on how I was meant to insert data. As mentioned before, AI had solved the syntax issues I was experiencing from my query statements. Similarly though, it gave suggestions on syntax that was not causing issues, but was redundant to use. For example, for the `events` table, I had used ` await Promise.all` to do multiple queries without having to write `await` for each query. Following this logic, I thought I had to follow the same logic for adding data to the `rsvps` association table using this query statement:

```js
const rsvpQuery = `INSERT INTO rsvps (user_id, event_id) VALUES
  ($1, $2),
  ($3, $4),
  ($5, $6),
  ($7, $8),
  ($9, $10),
  ($11, $12),
  ($13, $14),
  ($15, $16),
  ($17, $18),
  ($19, $20)`;
```

Once I had asked the AI to add data following this statement and a pre-written `await Promise.all` call, I was informed that `Promise.all` was not necessary as the data could be added with one query.  
This made me understand the importance of how query statements are written and how that translates to how you query using JavaScript. If I had written one `(col1, col2)` value pair, I would have to use `Promise.all`. Similarly when I asked AI about the errors I was receiving, the AI had given feedback on my syntax for my queries.

- **4. What did you learn from using AI in this way?**

What I learned from using AI in this manner was being more intentional in my queries from JavaScript to PostgreSQL. Moving forward, I want to understand how JavaScript interacts with a database, rather than understanding how to query in order to write less redundant code. Additionally, I learned how useful AI is in repetitive tasks that require attention to detail in each repetition. I saved a significant amount of time using AI that gave correct results rather than writing out fake data by hand and incorrectly doing so.
