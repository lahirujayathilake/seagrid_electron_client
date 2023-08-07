// Modules to control application life and create native browser window
//import fetch from "node-fetch";
//import { Menu, app, dialog, shell } from 'electron';
//import defaultMenu from 'electron-default-menu';
//import {app, BrowserWindow} from 'electron';
//import path from 'path';


const {app, BrowserWindow, MenuItem} = require('electron')
const path = require('path')
const { Menu, dialog, shell } = require('electron')
const defaultMenu = require('electron-default-menu')
var os = require('os');
const { win32 } = require('path')
var child = require('child_process').execFile;
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the login page for app
  mainWindow.loadURL("https://seagrid.org/auth/login")

}

function createMolWindow () {
  // Create the browser window.
  const editorWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  editorWindow.loadURL("http://nglviewer.org/ngl/?script=showcase/ferredoxin")
}
function createJSMEWindow(){
  const JSMEWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if(process.platform == win32)
    JSMEWindow.loadFile(".\\JSME\\dist\\index.html")
  else
    JSMEWindow.loadFile("./JSME/dist/index.html")
}
function createMol3DWindow(){
  const Mol3DWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  Mol3DWindow.loadFile(".\\molview\\index.html")
  //Mol3DWindow.loadFile(".\\molview_lite\\index.html")
  //Mol3DWindow.loadURL("https://molview.org/")
}
function createAvogadro(){
    
    var homedir = process.env.HOME;
    if(os.platform == 'win32')
      var executablePath = 'C:\\Program Files\\Avogadro2\\bin\\avogadro2.exe';
    else
      var executablePath = homedir + '/Applications/avogadro2';
    child(executablePath, function (err, data) {
            console.log(err)
            console.log(data.toString());
    });
}
function g16ExpCreate(){
  const gaussianWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the login page for app
  gaussianWindow.loadURL("https://seagrid.org/workspace/applications/Gaussian16_3e749c7d-6b02-4356-acc3-a58423210bda/create_experiment")
}
function namdExpCreate(){
  const namdWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the login page for app
  namdWindow.loadURL("https://seagrid.org/workspace/applications/namd_0a8b1e00-e6b6-46ed-b944-6a8fbb5056c9/create_experiment")
}
function psi4ExpCreate(){
  const psi4Window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the login page for app
  psi4Window.loadURL("https://seagrid.org/workspace/applications/PSI4.0_80cfebe1-fef8-49c3-a8eb-00b735bd817f/create_experiment")
}
function createVMD(){
  var homedir = process.env.HOME;
  if(os.platform == 'win32')
    var executablePath = 'C:\\Program Files\\VMD\\vmd.exe';
  else
    var executablePath = homedir + '/Applications/vmdelectron';
  child(executablePath, function (err, data) {
      console.log(err)
      console.log(data.toString());
  });
}
function createGaussView(){
  var homedir = process.env.HOME;
  if(os.platform == 'win32')
    var executablePath = 'C:\\Program Files\\GaussView\\GaussView.exe';
  else
  {
    //var homedir = process.env.HOME;
    var executablePath = homedir + '/Documents/Professional/Applications/Gaussian_Minwei/gv/gview.sh';
      let spawn = require("child_process").spawn;
      const process = spawn('bash', [executablePath]);
      process.on('exit', (code) => {
        console.log("Child exited");
      });
  }
  //child(executablePath, function (err, data) {
  //    console.log(err)
  //    console.log(data.toString());
  //});
}
function createMultiwfn(){
  var homedir = process.env.HOME;
  //const { spawn } = require('node:child_process');

  if(os.platform == 'win32')
  {

  const bat = spawn('cmd.exe', ['/c', 'test.bat']);
  bat.stdout.on('data', (data) => {
  console.log(data.toString());
  });

  bat.stderr.on('data', (data) => {
  console.error(data.toString());
  });

  bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
  });
  }
  else{

      var executablePath = homedir + '/Applications/runMultiwfn.sh';
      //var executablePath = homedir + '/Applications/Multiwfn_3.7_src_Mac/Multiwfn';
      var wfnargs = '/Users/spamidig/Applications/Multiwfn_3.7_bin_Mac/examples/benzene.wfn < /Users/spamidig/Applications/airavata-sandbox/gsoc2022/seagrid-rich-client/ins.txt';
      let spawn = require("child_process").spawn;
      const process = spawn('bash', [executablePath]);
      process.on('exit', (code) => {
        console.log("Child exited");
      });

  }
  
  /*
  if(os.platform == 'win32')
  {
  console.log("win32")
  var executablePath = 'C:\\Users\\aishw\\airavata-sandbox\\gsoc2022\\seagrid-rich-client\\Multiwfn_3.7_bin_Win32\\Multiwfn.exe';
  console.log(executablePath)
  }
  else
  {
    var executablePath = homedir + '/Applications/Multiwfn_3.7_src_Mac/Multiwfn';
  }
    
  child(executablePath, function (err, data) {
      console.log("error")
      console.log(err)
      console.log(data.toString());
  });*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  const menu = defaultMenu(app, shell);  
  
  // Add custom menu
  menu.splice(1,0,{
    label: 'Molecule Viewer',
    submenu: [
      {
        label: 'NGLViewer',
        click: (item, focusedWindow) => {
          createMolWindow()
        }
      }
    ]
  });
  menu.splice(2,0,{
    label: 'Molecule Editor',
    submenu: [
      {
        label: 'JSME Editor',
        click: (item, focusedWindow) => {
          createJSMEWindow()
        }
      },
      {
        label: 'Mol3DEditor',
        click: (item, focusedWindow) => {
          createMol3DWindow()
        }
      }
    ]
  });
  menu.splice(3,0,{
    label: 'Create Experiment',
    submenu: [
      {   
        label: 'Gaussian 16',
        click: (item, focusedWindow) => {
          g16ExpCreate()
        }   
      },
      {
        label: 'namd2.4',
        click: (item, focusedWindow) => {
          namdExpCreate()
        }
      },
      {
        label: 'PSI4',
        click: (item, focusedWindow) => {
          psi4ExpCreate()
        }
      }
   
    ]   
  }); 
  menu.splice(4,0,{
    label: 'External Applications',
    submenu: [
      {
        label: 'Avogadro Editor',
        click: (item, focusedWindow) => {
          createAvogadro()
        }
      },
      {
        label: 'VMD',
        click: (item, focusedWindow) => {
          createVMD()
        }
      },
      {
        label: 'GaussView',
        click: (item, focusedWindow) => {
          createGaussView()
        }
      },
      {
        label: 'Multiwfn',
        click: (item, focusedWindow) => {
          createMultiwfn()
        }
      }
    ]
  });
  
  
  // Set application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
if (require('electron-squirrel-startup')) app.quit();
///Users/spamidig/Applications/Multiwfn_3.7_src_Mac/Multiwfn /Users/spamidig/Appli    cations/Multiwfn_3.7_bin_Mac/examples/benzene.wfn < ins.txt
