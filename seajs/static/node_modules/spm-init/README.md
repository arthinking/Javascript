# Spm init 

[![David Status](https://david-dm.org/spmjs/spm-init.png)](https://david-dm.org/spmjs/spm-init)

spm-init is a scaffolding tool used to automate project creation.

---

## Install

```
$ npm install spm-init -g
```

## Usage

```
$ spm-init
```

If you have installed [spm2](https://github.com/spmjs/spm2):

```
$ spm init
```

## Template

The default template path is `~/.spm/init`, you can config `~/.spm/spmrc`

```
[init]
template = ~/.spm-init
```

Install a template:

```
$ git clone https://github.com/spmjs/template-cmd ~/.spm/init/cmd
```
