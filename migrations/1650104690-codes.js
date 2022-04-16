exports.up = async (sql) => {
  await sql`
    CREATE TABLE codes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      code varchar(30) NOT NULL UNIQUE
    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE codes
  `;
};
