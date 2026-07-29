import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const configPath = path.join(projectRoot, 'jsconfig.json');

function loadTypeScript() {
  try {
    const projectRequire = createRequire(path.join(projectRoot, 'package.json'));
    const storybookPackage = projectRequire.resolve('@storybook/react-vite/package.json');
    const storybookRequire = createRequire(storybookPackage);
    return storybookRequire('typescript');
  } catch (error) {
    throw new Error(
      `TYPECHECK_COMPILER_UNAVAILABLE: install the frozen component lockfile first (${error.code ?? error.name})`,
    );
  }
}

function formatDiagnostics(typescript, diagnostics) {
  return typescript.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => projectRoot,
    getNewLine: () => '\n',
  });
}

function main() {
  const typescript = loadTypeScript();
  const config = typescript.readConfigFile(configPath, typescript.sys.readFile);
  if (config.error) {
    throw new Error(formatDiagnostics(typescript, [config.error]));
  }

  const parsed = typescript.parseJsonConfigFileContent(
    config.config,
    typescript.sys,
    projectRoot,
    { noEmit: true },
    configPath,
  );
  if (parsed.errors.length) {
    throw new Error(formatDiagnostics(typescript, parsed.errors));
  }
  if (!parsed.fileNames.length) {
    throw new Error('TYPECHECK_SCOPE_EMPTY: jsconfig.json selected no component files');
  }

  const componentRoot = `${path.resolve(projectRoot, 'src', 'components')}${path.sep}`;
  const escaped = parsed.fileNames.filter(
    (fileName) => !path.resolve(fileName).startsWith(componentRoot),
  );
  if (escaped.length) {
    throw new Error(`TYPECHECK_SCOPE_ESCAPE: ${escaped.join(', ')}`);
  }

  const program = typescript.createProgram(parsed.fileNames, parsed.options);
  const diagnostics = typescript.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    throw new Error(formatDiagnostics(typescript, diagnostics));
  }

  process.stdout.write(
    `${JSON.stringify({
      compiler: `typescript@${typescript.version}`,
      files: parsed.fileNames.length,
      mode: 'noEmit',
      scope: 'src/components/**/*.{js,jsx}',
      status: 'PASS',
    })}\n`,
  );
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
