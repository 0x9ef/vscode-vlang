import { window } from 'vscode';
import { execVInTerminal, execV } from './exec';
import { getCurrentFilePath, saveCurrentFile } from './utils';

/**
 * Run current file.
 */
export async function run() {
	await saveCurrentFile();

	const filePath = getCurrentFilePath();
	execVInTerminal(`run ${filePath}`);
}

/**
 * Build an optimized executable from current file.
 */
export async function prod() {
	await saveCurrentFile();

	const filePath = getCurrentFilePath();
	execVInTerminal(`-prod ${filePath}`);
}

/**
 * Show help info.
 */
export function help() {}

/**
 * Show version info.
 */
export function ver() {
	execV('-v', (err, stdout) => {
		if (err) {
			window.showErrorMessage(
				'Unable to get the version number. Is V installed correctly?'
			);
			return;
		}

		window.showInformationMessage(stdout);
	});
}

/**
 * Show local paths info.
 */
export function path() {}

/**
 * Test current file.
 */
export function testFile() {}

/**
 * Test current package.
 */
export function testPackage() {}

/**
 * Upload and share current code to V playground.
 */
export function playground() {}
