// display / list the Trigger Response pairs.
// useful for when there are many, and you cannot remember how each is spelled.
const fs = require('fs');

module.exports = {
	name: 'listTR',
	description: 'List trigger response pairs',
	args: false,
	level: 1,
	usage: 'listTR',
	// a space before '\n' is needed so that listTR is not cutoff / omitted...
	helpMsg: 'listTR \n\
\n\
	List the local trigger response pairs. No arguments required',
	execute(msg, args){
		fs.readFile('./guilds/'+msg.guild.id+'.json', 'utf8', (err, data) => {
			if(err) {
				var emptyGob = {clearance:{1:[]},info:{},Trob:{}};
				fs.appendFile('./guilds/'+msg.guild.id+'.json', JSON.stringify(emptyGob), (err) => {
					if(err) throw err;
					console.log('New file created');
				});
			} else {
				var gob = JSON.parse(data);	// read the Trob from file
				var lenMax = 0;

				for(const th in gob.Trob){	if(th.length > lenMax) lenMax = th.length;	}
				var response = '```';
				for(const th in gob.Trob){
					//console.log(th+' '.repeat(lenMax-th.length)+' => '+gob.Trob[th]);
					response += th+' '.repeat(lenMax-th.length)+' => '+gob.Trob[th]+'\n';
				}
				if(lenMax)	msg.channel.send(response+'```');
				else msg.channel.send('No trigger response pairs saved.\nAdd one with the updateTrigResp command');
			}
		});
	}
}