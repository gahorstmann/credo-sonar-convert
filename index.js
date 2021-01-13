const core = require('@actions/core');
var fs = require('fs');

function severity(item){
  //console.log(item);
  var result;
  switch (true) {
    case (item >= 20):
      result = "BLOCKER"
      break;
    case (item >= 10):
      result = "CRITICAL"
      break;
    case (item >= 1):
      result = "MAJOR"
      break;
    case (item >= -10):
      result = "MINOR"
      break;
    case (item >= -100):
      result = "INFO"
      break;
    default:
      result = "INFO"
  }
  return result;
}

function type(item){
  var result;
  switch (item) {
    case "warnings":
      result = "BUG"
      break;
    case "refactor":
      result = "VULNERABILITY"
      break;
    default:
      result = "CODE_SMELL"
  }
  return result;
}

try {
  const inputfile = core.getInput('input-file');
  const outputfile = core.getInput('output-file');
  console.log(`Input: ${inputfile}!`);
  console.log(`Output: ${outputfile}!`);
  const filePath = process.env['GITHUB_WORKSPACE'] || '';
  var json = require(filePath + "/" + inputfile);
  var out = '{ "issues" : ['
  for(var k in json.issues) {
    var credo = json.issues[k];
    var issue = {
      engineId: "",
      ruleId: credo.scope,
      severity: severity(credo.priority),
      type: type(credo.category),
      primaryLocation: {
        message: credo.message,
        filePath: credo.filename,
        textRange: {
          startLine: credo.line_no,
          startColumn: credo.column,
          endColumn: credo.column_end
        }
      }
    }
    var jsonString= JSON.stringify(issue);
    out = out + jsonString + ','
  }
  out = out.slice(0, -1) + ']}'
  var obj = JSON.parse(out);
  console.log(obj)

  fs.writeFile(filePath + "/" + outputfile, out, function (err) {
    if (err) throw err;
    console.log("File "+ outputfile + " generated!");
  });

} catch (error) {
  core.setFailed(error.message);
}