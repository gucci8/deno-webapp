let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = {
      hostname: "hattie.db.elephantsql.com",
      database: "sevnishb",
      user: "sevnishb",
      password: "zAU7BtCem2FUzO-3aLzGxzRVDsV7iMpr",
      port: 5432
    }
  }

export { config }; 