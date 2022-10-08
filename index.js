// ## Acceptance Criteria

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README


// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const genMd = require('./utils/generateMarkdown.js');
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
  },
  {
    type: 'editor',
    name: 'description',
    message: 'Enter the Description section content (press ESC and SHIFT-Z twice to exit the Editor):',
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
    type: 'list',
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
  console.log('Please follow the prompts to create a professional README.md markdown file for your porject.')
  inquirer
  .prompt(questions)
  .then((response) => {
    console.log(response);  
    writeToFile('README.md',genMd.generateMarkdown(response));

  });

}
// Function call to initialize app
init();
