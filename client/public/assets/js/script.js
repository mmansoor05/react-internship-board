window.onload = function() {
    document.getElementById("download").addEventListener("click", () => {
        const invoice = this.document.getElementById("invoice");
        console.log(invoice)
        console.log(window)
        html2pdf().from(invoice).save();
    })
}

function addRow()
{
    // get input values
    var fname = document.getElementById('name').value;
     var lname = document.getElementById('start').value;
      
      // get the html table
      // 0 = the first table
      var table = document.getElementsByTagName('table')[0];
      
      // add new empty row to the table
      // 0 = in the top 
      // table.rows.length = the end
      // table.rows.length/2 = the center
      var newRow = table.insertRow(table.rows.length/2);
      
      // add cells to the row
      var cel1 = newRow.insertCell(0);
      var cel2 = newRow.insertCell(1);

      // add values to the cells
      cel1.innerHTML = fname;
      cel2.innerHTML = lname;
}

let button = document.querySelector("body a");
button.addEventListener("click",()=> {
const span = document.querySelector("a span");
button.style.paddingRight = "10px";
span.style.visibility="visible";
setTimeout(() => {
span.style.visibility="hidden";
button.style.transition = ".3s ease-in-out";
button.style.paddingRight = "0px";
}, 3000);
})