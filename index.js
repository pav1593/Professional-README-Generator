// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const genMd = require('./utils/generateMarkdown.js');

// support variable defs for GitHub license info
const licenseArrayName = [];
const licenseArrayKey = [];
const licenseListGitHub = [
  {
    "key": "agpl-3.0",
    "name": "GNU Affero General Public License v3.0",
    "spdx_id": "AGPL-3.0",
    "url": "https://api.github.com/licenses/agpl-3.0",
    "node_id": "MDc6TGljZW5zZTE="
  },
  {
    "key": "apache-2.0",
    "name": "Apache License 2.0",
    "spdx_id": "Apache-2.0",
    "url": "https://api.github.com/licenses/apache-2.0",
    "node_id": "MDc6TGljZW5zZTI="
  },
  {
    "key": "bsd-2-clause",
    "name": "BSD 2-Clause \"Simplified\" License",
    "spdx_id": "BSD-2-Clause",
    "url": "https://api.github.com/licenses/bsd-2-clause",
    "node_id": "MDc6TGljZW5zZTQ="
  },
  {
    "key": "bsd-3-clause",
    "name": "BSD 3-Clause \"New\" or \"Revised\" License",
    "spdx_id": "BSD-3-Clause",
    "url": "https://api.github.com/licenses/bsd-3-clause",
    "node_id": "MDc6TGljZW5zZTU="
  },
  {
    "key": "bsl-1.0",
    "name": "Boost Software License 1.0",
    "spdx_id": "BSL-1.0",
    "url": "https://api.github.com/licenses/bsl-1.0",
    "node_id": "MDc6TGljZW5zZTI4"
  },
  {
    "key": "cc0-1.0",
    "name": "Creative Commons Zero v1.0 Universal",
    "spdx_id": "CC0-1.0",
    "url": "https://api.github.com/licenses/cc0-1.0",
    "node_id": "MDc6TGljZW5zZTY="
  },
  {
    "key": "epl-2.0",
    "name": "Eclipse Public License 2.0",
    "spdx_id": "EPL-2.0",
    "url": "https://api.github.com/licenses/epl-2.0",
    "node_id": "MDc6TGljZW5zZTMy"
  },
  {
    "key": "gpl-2.0",
    "name": "GNU General Public License v2.0",
    "spdx_id": "GPL-2.0",
    "url": "https://api.github.com/licenses/gpl-2.0",
    "node_id": "MDc6TGljZW5zZTg="
  },
  {
    "key": "gpl-3.0",
    "name": "GNU General Public License v3.0",
    "spdx_id": "GPL-3.0",
    "url": "https://api.github.com/licenses/gpl-3.0",
    "node_id": "MDc6TGljZW5zZTk="
  },
  {
    "key": "lgpl-2.1",
    "name": "GNU Lesser General Public License v2.1",
    "spdx_id": "LGPL-2.1",
    "url": "https://api.github.com/licenses/lgpl-2.1",
    "node_id": "MDc6TGljZW5zZTEx"
  },
  {
    "key": "mit",
    "name": "MIT License",
    "spdx_id": "MIT",
    "url": "https://api.github.com/licenses/mit",
    "node_id": "MDc6TGljZW5zZTEz"
  },
  {
    "key": "mpl-2.0",
    "name": "Mozilla Public License 2.0",
    "spdx_id": "MPL-2.0",
    "url": "https://api.github.com/licenses/mpl-2.0",
    "node_id": "MDc6TGljZW5zZTE0"
  },
  {
    "key": "unlicense",
    "name": "The Unlicense",
    "spdx_id": "Unlicense",
    "url": "https://api.github.com/licenses/unlicense",
    "node_id": "MDc6TGljZW5zZTE1"
  }
];

//helper function to create a license list choices
function extractLicenses() {
  let i=0;
  licenseArrayName.push(`none`);
  for(const lic of licenseListGitHub) {
      i++;
      licenseArrayName.push(`${lic.name}`);
      licenseArrayKey.push(lic.key);
  }
}

// TODO: Create an array of questions for user input
const questions = [      
  {
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title',
    validate(text) {
      if (text==="") {
        return `Project must have a title.`;
      }

      return true;
    },
  },
  {
    type: 'editor',
    name: 'description',
    message: 'Enter the Description section content (press ESC and SHIFT-Z twice to exit the Editor):',
    validate(text) {
      if (text==="") {
        return `Description content can't be empty.`;
      }

      return true;
    },
    waitUserInput: true,
  },
  {
    type: 'editor',
    name: 'installation',
    message: 'Enter the Installation section content (press ESC and SHIFT-Z twice to exit the Editor):',
    waitUserInput: true,
  },
  {
    type: 'editor',
    name: 'usage',
    message: 'Enter the Usage section content (press ESC and SHIFT-Z twice to exit the Editor):',
    waitUserInput: true,
  },
  {
    type: 'rawlist',
    name: 'license',
    message: 'Select a license to apply to License section:',
    choices: licenseArrayName,
  },
  {
    type: 'editor',
    name: 'contributing',
    message: 'Enter the Contributing section content (press ESC and SHIFT-Z twice to exit the Editor):',
    waitUserInput: true,
  },
  {
    type: 'editor',
    name: 'tests',
    message: 'Enter the Tests section content (press ESC and SHIFT-Z twice to exit the Editor):',
    waitUserInput: true,
  },
  {
  type: 'input',
  name: 'github',
  message: 'Enter your GitHub profile:',
},
{
  type: 'input',
  name: 'email',
  message: 'Enter your e-mail address:',
}
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
      
    fs.writeFile(fileName,data,(error) =>
              error 
              ? console.error(error) 
              : console.log('README.MD file created!'));
}

// fancy header banner
const header =
`=====================================================================================================
=       ===        =====  =====       ===  =====  ==        ============       ===       =====    ===
=  ====  ==  ==========    ====  ====  ==   ===   ==  ==================  ====  ==  ====  ===  ==  ==
=  ====  ==  =========  ==  ===  ====  ==  =   =  ==  ==================  ====  ==  ====  ==  ====  =
=  ===   ==  ========  ====  ==  ====  ==  == ==  ==  ==================  ====  ==  ===   ==  ====  =
=      ====      ====  ====  ==  ====  ==  =====  ==      ====        ==       ===      ====  ====  =
=  ====  ==  ========        ==  ====  ==  =====  ==  ==================  ========  ====  ==  ====  =
=  ====  ==  ========  ====  ==  ====  ==  =====  ==  ==================  ========  ====  ==  ====  =
=  ====  ==  ========  ====  ==  ====  ==  =====  ==  ==================  ========  ====  ===  ==  ==
=  ====  ==        ==  ====  ==       ===  =====  ==        ============  ========  ====  ====    ===
=====================================================================================================
                                                                                                     
┌┐ ┬ ┬  ╔╗╔┬┌─┐┬┌─  ╔═╗┌─┐┬  ┬┬  ┌─┐┬  ┬┬┌─┐
├┴┐└┬┘  ║║║││  ├┴┐  ╠═╝├─┤└┐┌┘│  │ │└┐┌┘││  
└─┘ ┴   ╝╚╝┴└─┘┴ ┴  ╩  ┴ ┴ └┘ ┴─┘└─┘ └┘ ┴└─┘`;



// TODO: Create a function to initialize app
function init() {

  extractLicenses();
  console.log("\n");  
  console.log(header);
  console.log("\n");
  console.log('Please follow the prompts to create a professional README.md markdown file for your porject. The README file requires at a minimum a Title and a Description.\n')
  inquirer
  .prompt(questions)
  .then((response) => {
   
    writeToFile('README_sample.md',genMd.generateMarkdown(response));

  });

}
// Function call to initialize app
init();
