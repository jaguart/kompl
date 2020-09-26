# Development Notes

## Modified Git Workflow

Develop on **master** using **rel-<semver>** branches for 2-digit semver releases, with **add-something** feature branches, and **try-something** experimental branches.

Do **not** use '/' in branch names.

* **master** - main development branch
    - you should mostly be developing on a fix- or add- branch
    - merge back to **master** with --no-ff to retain full master-merge history
* **rel-<2digit-emver>** - release version
    - release preparation branch
    - 2 digit semver e.g. rel-0.1
    - all 0.1.n tags will be on this branch
    - create branch - `git -n rel-0.1`
    - bump version - `
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

workflow

  master
    main development flow

    feature-branch - aka topic branch - naming
      always from master
        git checkout -b feat-cool1 master
      always to master
        git checkout master
        git merge --no-ff feat-cool1
        # --no-ff means full commit history of feature is retaines
        # enabled easy reversion of full feature merge

  release
    from master to create a release
    git checkout -b rel-0.0.4 master
    bump version to 0.0.4
    git commit -am 'bumped version to 0.0.4'
    ...
    release process
    git checkout master
    git merge --no-ff release-0.0.4
    git tag -a 0.0.4
