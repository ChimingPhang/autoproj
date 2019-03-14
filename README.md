## Create your project folders structure quickly

### Install autoproj as global command
```
  npm i autoproj -g
```

``` bash
Usage: autoproj [options] <folder>

Options:
  -V, --version                                 output the version number
  -s, --setting <folders>                       setting default folders
  -c, --collection <collectionName>:<folders>   setting your collection folders
  -n, --new <collectionName>:<projectName>      create the projectName accodring to your collection
  -l, --list                                    list all collections
  -h, --help                                    output usage information

```

### Create project with default collection

``` base
autoproj ProjectName
```

### Set default collection

``` base
autoproj -s FolderPath1 FolderPath2 FolderPath3
```

### Set a new collection

``` base
autoproj -c CollectionName:FolderPath1 FolderPath2 FolderPath3
```

### Create project with a choosed collection

``` base
autoproj -n CollectionName:ProjectName
```


#### If you like the command, plz make a star