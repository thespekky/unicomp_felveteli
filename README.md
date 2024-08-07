# unicomp_felveteli

Unicomp Informatikai Kft cég felvételi feladat

Lépések ahoz hogy elindujon a weboldal

1. A github repót le kell klónozni
2. a.env file-okat létrekell hozni a frontendben és a backendben, az .env_example ben találhatók hogy hogyan kell lérehozni.A NÉV=' ' helyekre szöveget vár például: NÉV="token" ,valahol csak számot vár PORT= esetén például: PORT=1203
   a felhasználó név:unicomp és a jelszó:0jAQhF1DRNK0rvTM az adatbázis csatlakozásához,és a frontenden és a backenden meg a swagger.json tetején az url-ben a portoknak meg kell hogy egyezzenek
3. ezután a node modulokat importálni kell az npm i segígtésével a backend és a frontend mappában
4. Két terminálban el kell indítani npm run dev el ,egyit terminál a Backend mappában a másik pedig a Frontend mappában
5. a frontend terminál adni fogy egy localhost os linket ahol a webolal van.

Ha mégis hibát dob a backend az azért lehet mert a mongodb ben az ip cím nincs whitelistelve, akkor szóljanak nekem és megoldom azt.

Az api dokumentációja:localhost:PORT/api-docs miután el lett indítva a backend
