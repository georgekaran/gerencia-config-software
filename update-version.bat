
:: usage: update-version 1.99.9
SET home=%cd%

:: BACKEND
cd %home%\backend\
mvnw versions:set -DnewVersion=%1 -DgenerateBackupPoms=false -DprocessAllModules=true

:: FRONT-END
cd %home%\app\
npm version %1