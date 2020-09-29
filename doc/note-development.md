# Development Notes

## Modified Git Workflow

Develop on **master** using **rel-<semver>** branches for 2-digit semver releases, with **add-something** feature branches, and **try-something** experimental branches.

Do **not** use '/' in branch names - it translates to folders on the filesystem and can lead to folder/subfolder/subsub issues.

* **master** - main development branch
    - you should mostly be developing on a fix- or add- branch
    - merge back to **master**
      - some peep like --no-ff to force a commit even when there are no changes...
      - but that seems like an idea carried from other VCS

* **rel-<2-digit-semver>** - release version
    - release preparation branch
    - e.g. rel-0.1 - 2 digit semver
    - all 0.1.n tags will be on this branch
    - create branch - `git checkout -b rel-0.1`
    - bump version - `npm version ...`
    - testing, development, make changes
    - tag 0.1.0
    - merge back into master
    - create release on Github

* **try-<something>** - experimental
  - may be abandoned
  - any merge to master must be --no-ff

* **add-<something>** - feature aka topic branch
  - expected to be merged back into master
  - `git checkout master;git pull;git checkout -b add-expire`
  - `git commit -m 'some comment' some-file.ts`
  - `git push -u origin add-expire`
  - create a pull-request on Github
  - merge the pull-request on Github
  - delete the branch on Github
  - fix up local repo :( - still has branch etc
  - must be a better way...

---

### Rename a git tag

```bash
git tag new old
git tag -d old
git push origin :refs/tags/old
git push --tags
```

The colon in the push command removes the tag from the remote repository. If you don't do this, Git will create the old tag on your machine when you pull.

Finally, make sure that the other users remove the deleted tag. Please tell them (co-workers) to run the following command:

```bash
git pull --prune --tags
```
