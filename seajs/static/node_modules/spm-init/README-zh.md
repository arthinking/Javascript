# Spm init

spm 初始化命令

---

## 安装

```
$ npm install spm-init -g
```

## 使用

```
$ spm-init
```

如果已经安装 [spm2](https://github.com/spmjs/spm2) 可运行

```
$ spm init
```

## 模板

模板文件默认路径为 `~/.spm/init`，可以通过配置（`~/.spm/spmrc`）修改

```
[init]
template = ~/.spm-init
```

下载模板

```
$ git clone https://github.com/spmjs/template-cmd ~/.spm/init/cmd
```
