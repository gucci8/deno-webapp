//Configurations for testing database

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = {
      //tässä olisi testausta varten tietokannan salasanat jne. mutta git ei anna pitää niitä näkyvillä
    }
  }

export { config }; 
