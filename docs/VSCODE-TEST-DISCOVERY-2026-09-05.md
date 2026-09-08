# VS Code test discovery correction

The Python extension log at `C:/Users/Elahe/AppData/Roaming/Code/logs/20260905T145743/window1/exthost/ms-python.python/Python.log` records `ImportError: Start directory is not importable: 'd:\\APPS_root_new\\Apps'`.

Workspace settings enabled unittest discovery under `./Apps` with `*test.py`. The language-app suites use Bun; the actual Python unittest suite is under `research/cefr-classification/tests` and uses `test_*.py`.

The workspace discovery start directory now points to that Python test directory, using `test_*.py`. Inspection of the installed Python extension found that its project-testing mode overrides the unittest top-level directory with the workspace root. A tests-package initializer now makes discovery work with that behavior. The actual extension discovery function returned **success** under the selected Python 3.14 interpreter. Running the same project-root suite with the research project's existing Python 3.12 virtual environment passed **32/32**, with zero skips. No Python packages were installed and no model or application code was changed.

`.vscode/tasks.json` provides separate English `bun run check`, German `bun run verify` and Python research unittest tasks. They are available through **Terminal → Run Task**. If Test Explorer still displays the old result, use **Test: Refresh Tests**. The underlying discovery function is verified fixed; the existing editor panel was not controlled or visually rechecked. Evidence is in `artifacts/assessment-feedback-delivery/vscode-discovery.json` and `python-tests.json`.

The running VS Code extension also rediscovered the project at 21:44:52 local time and completed without a discovery error. Its final log segment is preserved as `artifacts/assessment-feedback-delivery/vscode-discovery-extension.log`.

The settings follow the [official VS Code Python testing documentation](https://code.visualstudio.com/docs/python/testing). The separate “GitHub repository already exists” message is not a test failure, and no repository was recreated. Other entries in the Problems panel were not diagnosed from the screenshot.
