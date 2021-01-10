
var initedWorks = false;

var ValeProgetti = {
  "Blogs": [],
  "Gregorios": []
};

function initAllWorks(){

  if(initedWorks){
    return;
  }

  for(let i = 0; i < DocuVale.length; i++){

    let docu = DocuVale[i];
    let type = docu["type"];
    let img = docu["preview_image"];
    let title = docu["title"];
    let id = docu["id"];
    let content = processContent(docu["content"]);

    let processed = {
      "title": title,
      "id": id,
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

  initedWorks = true;

}

function processContent(content) {

  let html = "<div>";

  for(let i = 0; i < content.length; i++){

    let el = content[i];

    let type = el["type"];
    let val = el["value"];

    if(type == "end_preview"){
      html += "<div style=\"display:none;\">END_PREVIEW</div>";
    }
    if(type == "text"){
      html += "<div class=\"article_text\">" + val + "</div>";
    }
    if(type == "video"){
      html += "<iframe class=\"video_iframe\" src=\""+val+"\"></iframe>";
    }
    if(type == "link_ref"){
      html += buildLink(val);
    }
    if(type == "image_slide"){
      html += buildImageSliderHtml(val);
    }
  }

  html += "</div>";

  return html;

}

function buildLink(val) {

  let spl = val.split(" ");
  let spl_no_link = [];
  for(let i = 1; i < spl.length; i++){
    spl_no_link.push(spl[i]);
  }
  let text = spl_no_link.join(" ");


  let link = "<a src=\""+spl[0]+"\" target=\"_blank\">"+text+"</a>";
  return link;
}

function buildImageSliderHtml(list_imgs) {

  return "";
}
