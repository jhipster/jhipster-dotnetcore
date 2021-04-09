

# Generate Documentation

## Prerequisites

- [Python and pip](https://www.python.org/downloads/)<br>
or
- [Chocolatey](https://chocolatey.org/install)

## Install Python and pip with Chocolatey

```
choco install python3 --pre
```

## Prerequisites

Install Sphinx
```bash
py -m pip install sphinx
```

Install Theme
```bash
py -m pip install sphinx_rtd_theme
```

Install Recommark
```bash
py -m pip install Recommonmark
```

## Generate the documentation HTML files 

```bash
cd ./docs/
```

```bash
.\make.bat html
```

Your documentation is now generated in `./_build/html`

## Generate the documentation with Hot Reload

### Requirements

```bash
py -m pip install sphinx-autobuild
```

### Start autobuild

```bash
cd ./docs/
```

```bash
.\autobuild.bat
```

Your documentation is now auto-generated on `http://127.0.0.1:8000`