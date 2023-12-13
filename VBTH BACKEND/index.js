const app = require("./app");
const { exec } = require('child_process');

// Replace 'script.sh' with the actual name of your shell script file
const scriptPath = 'script.sh';

app.listen(3001, ()=>{
	console.log("\n------------------START-----------------------\n",)
	console.log(
		"%s\x1b[36m\x1b[1m%d\x1b[0m",
		"server is runing on port : ",2001
		);
})
