# secret-patterns
RegExp patterns for code secrets. This project is meant to be used by popular repository scanners 
that search for embedded secrets.

## Scanners
- [git-secrets](https://github.com/awslabs/git-secrets)
- [gitHound](https://github.com/ezekg/git-hound)
- [truffleHog](https://github.com/dxa4481/truffleHog)

## Getting Started
### `common`
Collection variables containing popular snippets used in patterns. You can use `${quote}` in the `patterns.json` as a short hand.
### `patterns.json`
Collection of Regexp patterns for various types of secrets
### `allowed.json`
Collection of allowed strings. ie fake/examples secrets

## Testings
Just run `npm test`. This will also run the build script prior to testing.

## Build
Just run `npm run build`.


## Contributing

Please read [CONTRIBUTING.md](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/willfarrell/secret-patterns/tags). 

## Authors

* **will Farrell** - *Initial work* - [willfarrell](https://github.com/willfarrell)

See also the list of [contributors](https://github.com/willfarrell/secret-patterns/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [dxa4481/truffleHog](https://github.com/dxa4481/truffleHogRegexes/blob/master/truffleHogRegexes/regexes.json)
* [awslabs/git-secrets](https://github.com/awslabs/git-secrets/blob/master/git-secrets#L233)


TODO:
- [ ] [`.pgpass / pgpass.conf`](https://www.postgresql.org/docs/9.3/libpq-pgpass.html) pattern `"PostgreSQL PGPASS File": "[^:]+:[0-9]{2,6}:[a-z][a-z0-9_]+:[^:]+:[^:]+",`
- [ ] list of files that should be ignored/skipped
- [ ] make npm package
- [ ] add docs on how to curl file one needs w/ version tag
