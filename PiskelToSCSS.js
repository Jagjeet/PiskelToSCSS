let fs = require('fs');
let path = require('path');


//Print Usage if user does not include data files to convert
if (process.argv.length < 3) {
  console.log('Usage: node PiskelToSCSS.js <file1> {fileN}');
}

//Process the data files 
process.argv.forEach(function(val, index, array) {
  if (index >= 2) {
    // console.log(val);
    let __dirname = process.cwd();
    let dataFile = path.join(__dirname, val);
    let readPiskelDataPromise = null;
    let piskelData = null;

    if (fs.existsSync(dataFile)) {
      // console.log("FIle exists"); 

      readPiskelDataPromise = new Promise((resolve, reject) => {
        fs.readFile(dataFile, 'utf8', function(err, data) {
          if (err) {
            reject();
          }
          resolve(data);
        });
      });

      readPiskelDataPromise.then((data) => {
        let dataObj = JSON.parse(data);

        let colors = dataObj.pixels.reduce( (prev, cur) => {
          let found = prev.find(function(element) {
            return element === cur.color;
          });
          if (!found) {
            prev.push(cur.color);
          }
          return prev;
        }, []);

        let firsRow = null;
        let firstCol = null;
        let image = dataObj.pixels.reduce( (prev, cur) => {
          
          if (firstCol === null) {
            firstCol = cur.col;
            firstRow = cur.row;
          }

          // console.log(cur.row - firstRow); 
          // First item in the row so new array must be added
          if(typeof prev[cur.row - firstRow] === 'undefined') {
            // does not exist
            prev.push([]);
          }

          let colorHex = cur.color.toString(16).split('').slice(6, 8).join('') +
          cur.color.toString(16).split('').slice(4, 6).join('') +
          cur.color.toString(16).split('').slice(2, 4).join('');
          // Append the item to the current row
          prev[cur.row - firstRow].push('$p' + colors.indexOf(cur.color));
          // console.log(prev);

          return prev;
        }, []);
 
        //console.log(dataObj);
        // console.log(colors);
        console.log('//pallet');
        colors.map((val, index) => {
          if (typeof val === 'string') {
            console.log('$p' + index + ': ' + val + ';');
          }
          else {
            let colorHex = val.toString(16).split('').slice(6, 8).join('') +
                            val.toString(16).split('').slice(4, 6).join('') +
                            val.toString(16).split('').slice(2, 4).join('');
            console.log('$p' + index + ': #' + colorHex + ';');
          }
        });

        console.log('');
        console.log('// Define pixel art by line');
        console.log('// Just list the colors in order');
        console.log('// and seperate lines with a ","');
        image.map((row, index, arr) => {
          let rowText = row.reduce((prev, cur) => {
            prev = prev + ' ' + cur;
            return prev;
          }, '');

          if (index === 0) {
            console.log('$image: ' + rowText + ','); 
          }
          else if (index + 1 === arr.length) {
            console.log(rowText + ';'); 
          }
          else {
            console.log(rowText + ','); 
          }
        });
        // console.log(image);
      });
    } // if
    else {
      throw Error("File " + val + " does not exist");
    }
  } // if
}); // forEach