var grammar = {
    "comment": "ECMA-262 5th Edition, 15.12.1 The JSON Grammar. Parses JSON strings into objects.",
    "author": "Zach Carter",

    "lex": {
        "macros": {
            "digit": "[0-9]",
            "esc": "\\\\",
            "int": "-?(?:[0-9]|[1-9][0-9]+)",
            "exp": "(?:[eE][-+]?[0-9]+)",
            "frac": "(?:\\.[0-9]+)"
        },
        "rules": [
            ["\\s+", "/* skip whitespace */"],
            ["{int}{frac}?{exp}?\\b", "return 'NUMBER';"],
            ["\"(?:{esc}[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"\\\\])*\"", "return 'STRING';"],
            ["\\{", "return '{'"],
            ["\\}", "return '}'"],
            ["\\[", "return '['"],
            ["\\]", "return ']'"],
            [",", "return ','"],
            [":", "return ':'"],
            ["true\\b", "return 'TRUE'"],
            ["false\\b", "return 'FALSE'"],
            ["null\\b", "return 'NULL'"]
        ]
    },

    "tokens": "STRING NUMBER { } [ ] , : TRUE FALSE NULL",
    "start": "JSONText",

    "bnf": {
        "JSONString": [[ "STRING", "$$ = { type: 'string', value: yytext };" ]],

        "JSONNumber": [[ "NUMBER", "$$ = { type: 'number', value: yytext };" ]],

        "JSONNullLiteral": [[ "NULL", "$$ = { type: 'null' };" ]],

        "JSONBooleanLiteral": [[ "TRUE", "$$ = { type: 'boolean', value: yytext };" ],
                               [ "FALSE", "$$ = { type: 'boolean', value: yytext };" ]],


        "JSONText": [[ "JSONValue", "return $$ = $1;" ]],

        "JSONValue": [[ "JSONNullLiteral",    "$$ = $1;" ],
                      [ "JSONBooleanLiteral", "$$ = $1;" ],
                      [ "JSONString",         "$$ = $1;" ],
                      [ "JSONNumber",         "$$ = $1;" ],
                      [ "JSONObject",         "$$ = $1;" ],
                      [ "JSONArray",          "$$ = $1;" ]],

        "JSONObject": [[ "{ }", "$$ = { type: 'object', items: [] };" ],
                       [ "{ JSONMemberList }", "$$ = { type: 'object', items: $2 };" ]],

        "JSONMember": [[ "JSONString : JSONValue", "$$ = { name: $1, value: $3 };" ]],

        "JSONMemberList": [[ "JSONMember", "$$ = [ $1 ];" ],
                           [ "JSONMemberList , JSONMember", "$$ = $1; $1.push($3);" ]],

        "JSONArray": [[ "[ ]", "$$ = { type: 'array', items: [] };" ],
                      [ "[ JSONElementList ]", "$$ = { type: 'array', items: $2 };" ]],

        "JSONElementList": [[ "JSONValue", "$$ = [$1];" ],
                            [ "JSONElementList , JSONValue", "$$ = $1; $1.push($3);" ]]
    }
};

module.exports = grammar;