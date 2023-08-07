import * as fs from 'fs';
function saveInput(){
    //var blob = Model.getFileBlob()
    //var text = await new Response(blob).text()

    //var blob = Model.getTemplateInput();
    //blob = new Blob([Model.data.mol],{type:"chemical/x-gaussian-input"});
    //saveAs(blob, document.title + ".gau");
    //return blob
    //document.write(text);
    var gaussstr = "%nproc=24 \n%mem=2000MB \n%Chk=neopentane13diol \n#P RB3LYP/cc-pVDZ Pop=(Reg) GFInput GFPrint Iop(6/7=3) Opt Freq \n \nneopentane13diol #P RB3LYP/cc-pVDZ Pop=(Reg) GFInput GFPrint Iop(6/7=3) Opt Freq \n \n0 1";
    fs.appendFile('C:\\Users\\aishw\\airavata-sandbox\\gsoc2022\\seagrid-rich-client\\molview_lite\\src\\', gaussstr+"\n", function (err) {
        if (err) throw err
        else{
            document.write(gaussstr);
        }
    });
    fs.readFile("C:\\Users\\aishw\\Downloads\\MolView.mol", (err, inputD) =>{ 
    if (err) throw err;
        var words = inputD.toString().split("\n")
        var arr = words[3].split(" ")
        var atomlen = parseInt(arr[1])
        for(var i = 4; i<28; i++)
        {
            var arrwords = new Array();
            arrwords = words[i].split(" ");
            document.write(arrwords);
            var size = arrwords.length;
            for(var j = 0;j<size; j++)
            {
            if(arrwords[j]=="") {
                arrwords.splice(j,1);
                j--; // Prevent skipping an item
            }
            }
            document.write(arrwords[3] + " "+ arrwords[0] + " "+ arrwords[1] + " "+ arrwords[2] + "\n");
            fs.appendFile('input_1.gjf', arrwords[3] + " "+ arrwords[0] + " "+ arrwords[1] + " "+ arrwords[2] + "\n", function (err) {
            if (err) throw err
            });
            
        }  
        
    })

    var buffer = fs.readFileSync("input_1.gjf");
    Model.data.gau = buffer.toString();
    document.write(this.data.gau);
    blob = new Blob([this.data.gau],{type:"chemical/x-gaussian-input"});
    saveAs(blob, document.title + ".gau");
    return blob
}
