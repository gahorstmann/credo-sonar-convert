![NPM Build and Test](https://img.shields.io/github/workflow/status/gahorstmann/credo-sonar-convert/NPM%20Build%20and%20Test?label=Build%20and%20Test) 
![Issues](https://img.shields.io/github/issues/gahorstmann/credo-sonar-convert?label=Issues) 
![Issues](https://img.shields.io/github/stars/gahorstmann/credo-sonar-convert?label=Stars)

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