--- Selitystä ---

config:
  Kansiossa sijaitsee paikallisen ajon tapauksessa tietokannan konfiguraatiot. Tietokanta sijaitsisi ElephantSQL-palvelussa
  
database:
  Tietokantayhteyteen liittyvät funktiot. Joillakin frameworkeilla tietokantakyselyitä ei kirjoiteta ollenkaan, mutta tässä kyselyt voi kirjoittaa raakana.
  Tietokantayhteydessä käytetään connection poolingia eli suorituskykyä parantavaa menetelmää: tietokantaan voi luoda 5 rinnakkaista yhteyttä samaan aikaan. Lisäksi caching-menetelmä nopeuttaa kyselyitä hieman, missä on kyse usein toistuvien kyselyiden tulosten säilömisestä. Heti kun tietokantaan lisätään tai poistetaan jotain, cache tyhjenee.
  
middlewares:
  Jokaisen sivupyynnön yhteydessä suoritetaan järjestyksessä nämä muutama tukitoiminto virheenraportoinnista, pyynnön ajoituksesta ja autentikaatiosta.
  
routes:
  Kannattaa lukea HTTP-requesteista lisää. Tässä kansiossa on funktiot, joita kutsutaan kuhunkin polkuun GET- tai POST-pyyntöä lähettäessä.
  apis-alakansiossa sijaitsee toteutus ohjelmointirajapinnalle eli objektin palauttavalle polulle, joita monilla sivuilla tarjotaan tai käytetään mm. ajantasaisen tiedon tarjoamiseen tai saamiseen, kuten valuuttakurssi-API:t
  controllers-alakansiossa sijaitsee renderöivät funktiot eli funktiot, jotka luo jonkin tietyn sivun antamalla vaadittujen muuttujien arvot.
  
services:
  Täällä on eri toiminnallisuudet funktioina. Pienenä tyylimokana tässä projektissa on kutsua näitä antamalla parametrina pyyntö ja istuntotietoja.
  
static:
  Ylimääräinen kansio, tässä sijaitsisi a) selaimessa suoritettavat skriptit ja b) CSS-tyylien määritykset. Tässä projektissa CSS-kirjasto tuodaan suoraan html-dokumenttiin.
  
tests:
  Testit, joita en kerennyt ennen deadlinea kirjoittamaan
  
utils:
  Apufunktioita, kuten tässä projektissa päivämäärän validointi ja formatointi tietokantakyselyitä varten.
  
views:
  Muissa projekteissa tätä voidaan kutsua myös "templates"-nimellä: HTML-dokumentteja .ejs-tiedostoina. Huomioitavaa on, että html-dokumenteista toistuvat osat (header.ejs, navbar.ejs, footer.ejs) voi jakaa omiksi dokumenteikseen ja vähentää templateissa toisteisuutta.
