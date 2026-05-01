const bcrypt = require('bcrypt');
const pool = require('./pool');

const SALT_ROUNDS = 8;

const seed = async () => {
    await pool.query('DROP TABLE IF EXISTS rsvps')
    await pool.query('DROP TABLE IF EXISTS events')
    await pool.query('DROP TABLE IF EXISTS users')

    await pool.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL)`)

    await pool.query(`CREATE TABLE events (
        event_id SERIAL PRIMARY KEY, 
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        location TEXT NOT NULL, 
        event_type TEXT NOT NULL,
        max_capacity INT NOT NULL, 
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE)`)

    await pool.query(`CREATE TABLE rsvps (
        rsvp_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
        UNIQUE (user_id, event_id))`)
    
    const [gabeHash, willHash, chrisHash, lupeHash, jojoHash] = await Promise.all([
    bcrypt.hash('password123', SALT_ROUNDS),
    bcrypt.hash('password456', SALT_ROUNDS),
    bcrypt.hash('password789', SALT_ROUNDS),
    bcrypt.hash('password!!!', SALT_ROUNDS),
    bcrypt.hash('password???', SALT_ROUNDS),
  ]);    

  const { rows: users } = await pool.query(`
    INSERT INTO users (username, password_hash) VALUES
      ('gabe', $1),
      ('will', $2),
      ('chris', $3),
      ('lupe', $4),
      ('jojo', $5)
    RETURNING user_id
  `, [gabeHash, willHash, chrisHash, lupeHash, jojoHash]);

  const [gabe, will, chris] = users;

  const eventQuery = 'INSERT INTO events (title, description, date, location, event_type, max_capacity, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)';
   
  const { rows: events } = await Promise.all([
    pool.query(eventQuery, [
    'Brooklyn Tech Hackathon',
    'A 24-hour hackathon for developers, designers, and entrepreneurs to build innovative solutions.',
    '2025-03-15',
    'Brooklyn Navy Yard, Brooklyn, NY',
    'other',
    150,
    1
  ]),
    pool.query(eventQuery, [
    'Jazz in the Park',
    'An outdoor jazz concert featuring local NYC artists. Bring a blanket and enjoy the evening.',
    '2025-04-20',
    'Prospect Park, Brooklyn, NY',
    'concert',
    500,
    2
  ]),
    pool.query(eventQuery, [
    'Full Stack Workshop: React & Node',
    'Hands-on workshop covering React hooks, REST APIs, and deploying to the cloud.',
    '2025-05-10',
    'General Assembly, Manhattan, NY',
    'workshop',
    30,
    1
  ]),
    pool.query(eventQuery, [
    'NYC Startup Pitch Night',
    'Early-stage founders pitch their ideas to a panel of investors. Networking reception to follow.',
    '2025-05-22',
    'WeWork Soho, New York, NY',
    'networking',
    200,
    3
  ]),
    pool.query(eventQuery, [
    'Community 5K Fun Run',
    'A casual 5K run through Central Park open to all fitness levels. Medals for all finishers!',
    '2025-06-07',
    'Central Park, New York, NY',
    'sports',
    300,
    4
  ]),
    pool.query(eventQuery, [
    'Women in Tech Summit',
    'A full-day conference with keynotes, panels, and mentorship sessions for women in technology.',
    '2025-06-18',
    'Javits Center, New York, NY',
    'conference',
    400,
    2
  ]),
    pool.query(eventQuery, [
    'Rooftop Movie Night: Classic Films',
    'Watch iconic films under the stars on a Manhattan rooftop. Drinks and snacks available.',
    '2025-07-04',
    '230 Fifth Rooftop Bar, Manhattan, NY',
    'social',
    80,
    5
  ]),
    pool.query(eventQuery, [
    'Urban Photography Walk',
    'Guided photo walk through the streets of DUMBO. Tips on street photography and composition.',
    '2025-07-19',
    'DUMBO, Brooklyn, NY',
    'workshop',
    20,
    3
  ]),
]);

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
  ($19, $20)`

  const { rows: rsvps} = await pool.query(rsvpQuery, [
    2, 1, 
    3, 1, 
    1, 2, 
    4, 2,  
    5, 3, 
    2, 3, 
    1, 4, 
    5, 5,  
    3, 6,  
    4, 7,  
  ])

  console.log('Database seeded.');
}

seed()
.catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  })
  .finally(() => pool.end());