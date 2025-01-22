const sqlite3 = require('sqlite3').verbose();

describe('SQLite Database', () => {
  let db;

  beforeAll((done) => {
    db = new sqlite3.Database(':memory:', done);
  });

  afterAll((done) => {
    db.close(done);
  });

  beforeEach((done) => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`, done);
    });
  });

  afterEach((done) => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS users`, done);
    });
  });

  test('should create the users table', (done) => {
    db.all(`PRAGMA table_info(users)`, (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toHaveLength(3);
      const columns = rows.map(row => row.name);
      expect(columns).toEqual(expect.arrayContaining(['id', 'username', 'password']));
      done();
    });
  });

  test('should insert a user into the users table', (done) => {
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['testuser', 'securepassword'], function(err) {
      expect(err).toBeNull();
      expect(this.lastID).toBeGreaterThan(0);

      db.get(`SELECT * FROM users WHERE id = ?`, [this.lastID], (err, row) => {
        expect(err).toBeNull();
        expect(row).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            username: 'testuser',
            password: 'securepassword',
          })
        );
        done();
      });
    });
  });

  test('should not allow duplicate usernames', (done) => {
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['uniqueuser', 'password1'], (err) => {
      expect(err).toBeNull();

      db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['uniqueuser', 'password2'], (err) => {
        expect(err).not.toBeNull();
        expect(err.message).toMatch(/UNIQUE constraint failed/);
        done();
      });
    });
  });
});
