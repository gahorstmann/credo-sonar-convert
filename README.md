![Test](https://github.com/gahorstmann/credo-sonar-convert/workflows/NPM%20Test/badge.svg)

# Action credo sonar convert 

Convert json generated in the `CREDO Elixir` to the Sonarqube format.

## Inputs

### `input-file`
**Required** File generate from credo.

### `output-file`

**Required** File to use for importing into sonarqube.

## Usage

```yaml
- name: Credo 
  run: |
    mix credo --strict --verbose --format json 2>&1 | tee credo_result.json

- uses: gahorstmann/credo-sonar-convert@v1
  with:
    input-file: 'credo_result.json'
    output-file: 'credo_sonarqube.json'
```

## Usage in sonar-scanner:
```
sonar.externalIssuesReportPaths=credo_sonarqube.json
```