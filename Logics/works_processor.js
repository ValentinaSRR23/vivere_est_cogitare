
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
  for(let i = 2; i < spl.length; i++){
    spl_no_link.push(spl[i]);
  }

  let link_ref = spl[0];
  let link_near_label = spl[1];
  let text = spl_no_link.join(" ");


  let link = "<div>"+link_near_label+"<a href=\""+link_ref+"\" target=\"_blank\" class=\"article_content_link\">"+text+"</a></div>";
  return link;
}

function buildImageSliderHtml(list_imgs) {

  return "";
}
