/** 
 Property of Emblem
 Written by Maria Galebach 
 7/11/18
**/


/*
Takes a pdf input and turns it into a url 
Passable to gettext() 
*/
window.URL = window.URL || window.webkitURL;

var fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");


function handleFiles(files) {
	console.log('FILES ', files);
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    var list = document.createElement("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      list.appendChild(li);
      
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        //window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement("span");
      setText(`${files[i].name}: ${files[i].size} bytes ${img.src} text: `, info, li, img.src);
    }
  }
}

/*
Extracts the text from the pdf
*/


function setText(prefix, info, li, pdfUrl){
	PDFJS.getDocument(pdfUrl)
	.then( pdf => pdf.getPage(1)) // pages start at 1
	.then( page => page.getTextContent())
	.then( joinTextData )
	.then( data => {
		info.innerHTML = prefix + data;
		li.appendChild(info)
	})
	.catch( function(err) {
		console.log('Get Text Error: ', err)
	})
}

/*
Parses the data from the shitshow of a datastructure
*/
function joinTextData(textData) {
	// data structure of textData is {items: [
	// 	{
	// 		str: *TEXT*
	// 	}
	// ]}
	return textData.items.map( item => item.str ).join(' ')
}








