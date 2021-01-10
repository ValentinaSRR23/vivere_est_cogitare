
var Pages = ["Home", "Info", "Indice Articoli", "Indice Progetti SSML Gregorio VII"];

function getNodeAndSetClick(type, data, classLabel, callback) {
    let el = getNode(type,data,classLabel);
    el.setAttribute("onclick",callback);
    return el;
}

function getNode(type, data, classLabel){

  let el = document.createElement(type);

  if(type == "img" && data != null){
    el.src = data;
  }

  if(type == "div" && data != null){
    el.innerHTML = data;
  }

  if(classLabel != null){
    el.className = classLabel;
  }

  return el;
}

function boot() {
  showPage(0);
  initAllWorks();
  handleResize();
}



function handleResize() {

  document.body.style.fontSize = "";

  let width = window.innerWidth;
  if(width < 650) {
    document.body.style.fontSize = "0.7rem";
    return;
  }
  if(width < 800) {
    document.body.style.fontSize = "0.8rem";
    return;
  }
  if(width < 1000) {
    document.body.style.fontSize = "0.9rem";
    return;
  }
  document.body.style.fontSize = "1rem";
}


function showPage(page_index) {
    // home
    if(page_index == 0){
        showPage_1(Pages[0]);
    }
    // info
    if(page_index == 1){
      showPage_2(Pages[1]);
    }
    // articoli indice
    if(page_index == 2){
      showPage_3(Pages[2]);
    }
    // gregorio indice
    if(page_index == 3){
      showPage_4(Pages[3]);
    }
    // articolo view
    if(page_index == 4){
      showPage_article();
    }
    // leace a comment
    if(page_index == 5){
      showPage_5();
    }

    setTimeout(() =>{document.body.scrollTop = 0;},300);
}

function createIndex(target_list) {

  let index_wrap = getNode("div",null, "index");

    for(let i = 0; i < target_list.length; i++){

      let index_element = target_list[i];

      let element = getNode("div", null, "index_row");

      let index_row_image = getNode("img", index_element["preview_image"], "index_preview_image");

      let wrap = getNode("table",null, "index_row_wrap");
      let row = getNode("tr",null,null);
      let d1 = getNode("td",null,null);
      let d2 = getNode("td",null,null);
      wrap.appendChild(row);
      row.appendChild(d1);
      row.appendChild(d2);

      let index_row_title = getNode("div", index_element["title"], "index_row_title");
      let index_row_preview = getNode("div", cropPreview(index_element["content"]) + "[...]", "index_row_preview");
      let see_more_link = getNode("div", "Continua a leggere...", "index_row_link");
      see_more_link.setAttribute("onclick", "showIndexElementByTitle('"+index_element["id"]+"');");

      d1.appendChild(index_row_image);

      d2.appendChild(index_row_title);
      d2.appendChild(index_row_preview);
      d2.appendChild(see_more_link);

      element.appendChild(wrap);

      index_wrap.appendChild(element);
    }

    return index_wrap;
}

function cropPreview(content) {
  return content.split("<div style=\"display:none;\">END_PREVIEW</div>")[0];
}

function showIndexElementByTitle(title) {
  let doc = searchWorkByTitle(title);
  if(doc != null){
    showPage_article(doc);
  }
}

function showPage_article(article) {

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeaderArticle(article);
  base.appendChild(toolbar);

  base.appendChild(getNode("div", article["content"], "article_page_wrap"));

  base.appendChild(pageCloser());

}


function searchWorkByTitle(title){
  let Blogs = ValeProgetti.Blogs;
  let GregorioWorks = ValeProgetti.Gregorios;
  for(let i = 0; i < Blogs.length; i++){
    if(Blogs[i]["id"] == title){
      return Blogs[i];
    }
  }
  for(let i = 0; i < GregorioWorks.length; i++){
    if(GregorioWorks[i]["id"] == title){
      return GregorioWorks[i];
    }
  }

  return null;
}


function getPageHeader(nome){

  let wrap = getNode("div",null, null);
  wrap.appendChild(getToolbar());
  wrap.appendChild(getNode("img", "./Home/toolbar.png" ,"toolbar_sphere_image"));
  wrap.appendChild(getNode("div", "- "+nome+" -", "page_title_label_separator"));

  return wrap;
}

function getPageHeaderArticle(article){

  let wrap = getNode("div",null, null);
  wrap.appendChild(getToolbar());
  wrap.appendChild(getNode("img", article["preview_image"] ,"article_toolbar_sphere_image"));
  wrap.appendChild(getNode("div", "- "+article["title"]+" -", "page_title_label_separator"));

  return wrap;
}

function getCleanNavigationPanel(){
  while(document.body.firstChild){
    document.body.removeChild(document.body.firstChild);
  }
  return document.body;
}

function showPage_1(name){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader(name);
  base.appendChild(toolbar);

  let wrap = getNode("div", null, "page_wrap");

  wrap.appendChild(getNode("div",'Ciao a tutti e benvenuti nel mio blog!', "home_page_title"));

  wrap.appendChild(getNode("div",
    'Qui troverete vari articoli e spunti di riflessione personali sul concetto e sul valore del pensiero umano; per tale motivo, ho scelto accuratamente come locuzione riassuntiva del blog la frase latina <strong>“Vivere est cogitare”</strong>. <br><br>'+
    'Pronunciata da Cicerone (106 a.C - 43 a.C) e ribadita da Cartesio (1596 - 1650) con il suo più noto detto <strong>“Cogito ergo sum”</strong>, viene tradotta letteralmente come <strong>“Vivere è pensare”</strong>. <br><br>'+
    'Dietro queste tre parole, infatti, si cela un concetto affascinante, probabilmente sottovalutato, che mi piacerebbe condividere con voi. <br><br>'+
    'Ma andiamo a scoprirne il significato insieme...', "home_page_text"));


  let button = getNode("div", "scopri di più".toUpperCase(), "home_page_button");
  wrap.appendChild(button);

  let img_wrap = getNode("div", null, "image_wrapper");
  let img_1 = getNode("img", "./Home/home_page_1.png", "img_homepage_right img_homepage");
  let img_2 = getNode("img", "./Home/home_page_2.png", "img_homepage");
  img_wrap.appendChild(img_1);
  img_wrap.appendChild(img_2);
  wrap.appendChild(img_wrap);

  //let separator = getNode("div",null, "separator_homepage");
  //wrap.appendChild(separator);

  let inline_info_wrap = getNode("div", null, "inline_homepage_info_wrap");
  let info_1 = getNode("div", null, "inline_homepage_info_wrap_element");
  let info_2 = getNode("div", null, "inline_homepage_info_wrap_element");
  let info_3 = getNode("div", null, "inline_homepage_info_wrap_element");


  inline_info_wrap.appendChild(info_3);
  inline_info_wrap.appendChild(info_1);
  inline_info_wrap.appendChild(info_2);


  info_1.appendChild(getNode("div",'Su di me', "home_page_info_title"));
  info_1.appendChild(getNode("div", "Ciao a tutti! <br>Sono Valentina, laureanda in mediazione linguistica all'Università SSML Gregorio VII di Roma...", "home_page_info_text"));
  info_1.appendChild(getNodeAndSetClick("div", "Maggiori informazioni su di me", "home_page_info_link", "showPage(1)"));

  info_2.appendChild(getNode("div",'Spazio per voi', "home_page_info_title"));
  info_2.appendChild(getNode("div", "Dubbi, cursiosità o suggerimenti sono ben accetti. <br>Chiunque voglia condividere la sua opinione può cliccare sul link qui sotto:", "home_page_info_text"));
  info_2.appendChild(getNodeAndSetClick("div", "Lascia un commento", "home_page_info_link", "showPage(5)"));


  info_3.appendChild(getNode("div",'Altri articoli', "home_page_info_title"));
  info_3.appendChild(getNode("div", "Siamo spiacenti, non è stato trovato alcun articolo.", "home_page_info_box_fake"));


  wrap.appendChild(inline_info_wrap);

  base.appendChild(wrap);

  base.appendChild(pageCloser());
}

function showPage_2(name){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader(name);
  base.appendChild(toolbar);

  base.appendChild(pageCloser());

}

function showPage_3(name){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader(name);
  base.appendChild(toolbar);

  if(ValeProgetti.Blogs.length == 1){
    base.appendChild(getNode("div", "È presente <strong>1</strong> articolo.", "article_count"));
  }else{
    base.appendChild(getNode("div", "Sono presenti <strong>" + ValeProgetti.Blogs.length.toString() + "</strong> articoli.", "article_count"));
  }

  base.appendChild(createIndex(ValeProgetti.Blogs));

  base.appendChild(pageCloser());

}

function showPage_4(name){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader(name);
  base.appendChild(toolbar);

  if(ValeProgetti.Gregorios.length == 1){
    base.appendChild(getNode("div", "È presente <strong>1</strong> articolo.", "article_count"));
  }else{
    base.appendChild(getNode("div", "Sono presenti <strong>" + ValeProgetti.Gregorios.length.toString() + "</strong> articoli.", "article_count"));
  }

  base.appendChild(createIndex(ValeProgetti.Gregorios));

  base.appendChild(pageCloser());
}

function showPage_5() {
  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Lascia un commento");
  base.appendChild(toolbar);


  base.appendChild(pageCloser());
}

function pageCloser() {
  let cl = document.createElement("div");
  cl.innerHTML = "<br><br><br><br><br><br><br><br><br><br>";
  return cl;
}

function getToolbar(){

  let navbar = getNode("div", null, "navbar");

  let label_1 = getNode("div", "Vivere est cogitare","toolbar_label");

  let wrap = getNode("div", null, "toolbar_nav_label_wrap");

  let label_2 = getNode("div", "Menu","toolbar_nav_label");
  label_2.setAttribute("onclick", "toggleMenu()");
  label_2.id = "nav_button";

  navbar.appendChild(label_1);
  wrap.appendChild(label_2);
  navbar.appendChild(wrap);

  return navbar;
}



function toggleMenu() {

  let menu = document.getElementById("nav_main_menu");

  if(menu == null)
  {
      menu = getNode("div", null, "nav_main_menu");
      menu.id = "nav_main_menu";

      let voices = [
        {
            "label": Pages[0],
            "onclick": "showPage(0)"
        },
        {
            "label": Pages[1],
            "onclick": "showPage(1)"
        },
        {
            "label": Pages[2],
            "onclick": "showPage(2)"
        },
        {
            "label": Pages[3],
            "onclick": "showPage(3)"
        }
      ];

      for(let i = 0; i < voices.length; i++){
        let el = voices[i];
        let button = getNode("div", el["label"] , "nav_main_menu_button");
        button.setAttribute("onclick",  el["onclick"]);
        menu.appendChild(button);
      }

      document.body.appendChild(menu);
  }
  else
  {
      while(menu.firstChild){
        menu.removeChild(menu.firstChild);
      }
      menu.parentNode.removeChild(menu);
  }
}
