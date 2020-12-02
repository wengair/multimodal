# CS 539 Multimodal
## Getting start
1. Clone this repository by running
```
$ git clone https://github.com/Yoark/multimodal-tool.git
```

2. Get into the root folder `/` by `$ cd multimodal-tool` and then run `$ npm install` to install all necessary libraries.  
If you don't have such command, you need to install Node.  
I recommand [this video](https://www.youtube.com/watch?v=9hb_0TZ_MVI&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=2), I feel it's pretty clear.  

3. Put the original data into the `/public/data` folder, notice that the folder name should be lower case.  
```
public
├── data
│   ├── 100_sample_from_val_predicted.json
│   ├── 100_val-ground.json
│   └── image_val_100
│       └── image folders...
└── index.html...
```

4. Run `$ npm start` to open your [localhost:3000](http://localhost:3000/) and check the work.