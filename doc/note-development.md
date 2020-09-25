# Development Notes

## Modified Git Workflow

Develop on **master** using **rel-<semver>** branches for 2-digit semver releases, with **add-something** feature branches, and **try-something** experimental branches.

Do **not** use '/' in branch names.

* **master** - main development branch
* **rel-<2digit-emver>** - release version
    - release preparation branch
    - 2digit semver e.g. rel-0.1
    - all 0.1.n versions will be on this branch
    - create branch
    - bump version
    - merge back in to master - always using --no-ff
    - testing and make changes
    - tag 0.1.0
    - merge back into master using --no-ff
    - create relese on github
* **try-something** - experimental
  - may be abandoned
  - any merge to master must be --no-ff 
* **add-something** - feature aka topic branch
  - expected to be merged back into master
  - any merge to master must be --no-ff
