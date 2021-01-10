

var DocuVale = [
  {
      "type": "Blog",
      "preview_image": null,
      "title": "titolo del mio blog",
      "content": [
        {
          "type": "text",
          "value": "Ecco un testo di prova molto molto lungo e interessante"
        },
        {
          "type": "video",
          "value": "url_del_video"
        },
        {
          "type": "image_slide",
          "value": ["img1", "img2", "img3"]
        }
      ]
  }
];


var ValeProgetti = {
  "Blogs": [],
  "Gregorios": []
};

function initAllWorks(){

  for(let i = 0; DocuVale.length; i++){

    let docu = DocuVale[i];
    let type = docu["type"];
    let img = docu["preview_image"];
    let title = docu["title"];
    let content = processContent(docu["content"]);

    let processed = {
      "title": title,
      "preview_image": img,
      "content": content
    }

    if(type == "Blog"){
      ValeProgetti["Blogs"].push(processed);
    }
    if(type == "Gregorio"){
      ValeProgetti["Gregorios"].push(processed);
    }
  }

}

function processContent(content) {

  for(let i = 0; content.length; i++){
    let el = content[i];


  }

}

function addProgect() {

}

function addTitle(){

}

function addText(){

}

function addVideo(){

}

function addImageSlider() {

}
