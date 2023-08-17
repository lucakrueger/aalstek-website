const fs = require('fs')

const { Command } = require('commander')
const program = new Command()

program.name('builder')
    .description('Builds necessary files')
    .version('0.1.0')

program.command('functions-library')
    .description('Generates a js Object containing external ts library definitions. *.d.ts -> object field in *.js')
    .argument('<path>', 'Specifies path for typescript libararies')
    .argument('<out>', 'Specifies output file')
    .action((path, out) => {

        fs.readdir(path, (err, files) => {
            if(path[path.length - 1] == '/') path = path.substring(0, path.length - 1)

            let libs = {}

            for(let file of files) {
                libs[file] = fs.readFileSync(`${path}/${file}`, {encoding: 'utf-8'})
            }

            if(out.includes('.json') == false) out += out[out.length - 1] == '/' ? 'libs.json' : '/libs.json'

            fs.writeFile(out, JSON.stringify(libs, null, 4), (err) => {
                if(err != null) {
                    console.error(err)
                    return
                }

                console.log(`Sucessfully wrote ${out}`)
            })

        })

    })

program.parse(process.argv)