Пока для указания версий пользуемся тегами git

git commit package.json -m "v1.5.3"
git tag v1.5.3
# Update existing major/minor version tags to point to the new commit.
git tag --force v1.5
git tag --force v1
git push --tags --force
Then in the other project's package.json, I get semver-ish functionality by just referencing the v1 or v1.5 tag:

"dependencies": {
    "mypackage": "git+ssh://server/mypackage.git#v1",
}