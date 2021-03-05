

# Generate Documentation

## Prerequisites

- [Python and pip](https://www.python.org/downloads/)
or
- [Chocolatey](https://chocolatey.org/install)

## Install Python and pip with Chocolatey

```
choco install python3 --pre
```

## Install

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

## Generate the documentation

```bash
cd docs
```

```bash
.\make.bat html
```

## Generate the documentation with Hot Reload

### Install

```bash
py -m pip install sphinx-autobuild
```

### Start

```bash
cd docs
```

```bash
.\autobuild.bat
```