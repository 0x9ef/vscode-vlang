#!/usr/bin/env node
// @ts-check
"use strict";

const { exec } = require("child_process");
const { writeFileSync, copyFileSync, renameSync } = require("fs");
const { resolve } = require("path");

const jsonFiles = [
	"../syntaxes/v.tmLanguage.json",
	"../language-configuration.json",
	"../snippets/snippets.json",
];

const shouldRestore = process.argv.includes('--restore');
jsonFiles.forEach((jsonFile) => {
	const absolutePath = resolve(__dirname, jsonFile);
	const tmpFile = resolve(__dirname, jsonFile.replace('.json', '.tmp.json'));
	if (shouldRestore) {
		renameSync(tmpFile, absolutePath);
	} else {
		copyFileSync(absolutePath, tmpFile);
		exec("npx json-minify " + absolutePath, (error, stdout) => {
			if (!!error) throw error;
			writeFileSync(absolutePath, stdout);
		});
	}
});
