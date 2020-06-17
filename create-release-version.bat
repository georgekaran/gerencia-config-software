CALL update-version.bat %1
git add .
git commit -m "version bump"

git tag -a %1 -m "Release %1"