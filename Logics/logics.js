
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

  // must be first thing
  initAllWorks();

  window.addEventListener('hashchange', pageNavigate, false);
  pageNavigate();
}



function handleResize() {

  document.body.style.fontSize = "";

  let width = window.innerWidth;

  resizeNavButton(width);


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

function resizeNavButton(width){

  let navbutton = document.getElementsByClassName("toolbar_nav_label");
  let menu = document.getElementsByClassName("nav_main_menu");
  let button = document.getElementsByClassName("nav_main_menu_button");

  if(navbutton.length == 0){
    navbutton = document.getElementsByClassName("toolbar_nav_label_small_screen");
    menu = document.getElementsByClassName("nav_main_menu_small_screen");
    button = document.getElementsByClassName("nav_main_menu_button_small_screen");
  }

  if(width > 700){
    for(let i = 0; i < navbutton.length; i++){
      navbutton[i].className = "toolbar_nav_label";
    }
    for(let i = 0; i < menu.length; i++){
      menu[i].className = "nav_main_menu";
    }
    for(let i = 0; i < button.length; i++){
      button[i].className = "nav_main_menu_button";
    }

  }else{
    for(let i = 0; i < navbutton.length; i++){
      navbutton[i].className = "toolbar_nav_label_small_screen";
    }
    for(let i = 0; i < menu.length; i++){
      menu[i].className = "nav_main_menu_small_screen";
    }
    for(let i = 0; i < button.length; i++){
      button[i].className = "nav_main_menu_button_small_screen";
    }
  }
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
      let index_row_preview = getNode("div", cropPreview(index_element["content"]), "index_row_preview");
      let see_more_link = getNode("div", "Continua a leggere...", "index_row_link");
      see_more_link.setAttribute("onclick", "setNavigation('article_"+index_element["id"]+"');");

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
  return content.split("<div style=\"display:none;\">END_PREVIEW</div>")[0].replace("article_text_preview_change","article_text");
}


function showArticlePage(article_url) {

  let article = searchWorkById(article_url.split("article_")[1]);
  let base = getCleanNavigationPanel();

  if(article == null){
    base.appendChild(getPageHeaderArticle("Articolo non trovato"));
    base.appendChild(getNode("div", "Non è stato selezionato alcun articolo", "article_page_wrap"));
  }
  else{
    base.appendChild(getPageHeaderArticle(article));
    base.appendChild(getNode("div", article["content"], "article_page_wrap"));

  }

  base.appendChild(pageCloser());
}


function searchWorkById(title){
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


function getPageHeaderInfo(nome){

  let wrap = getNode("div",null, null);
  wrap.appendChild(getToolbar());
  wrap.appendChild(getNode("img", "./Home/toolbar.png" ,"toolbar_sphere_image"));
  wrap.appendChild(getNode("div", "- "+nome+" -", "page_title_label_separator"));

  return wrap;
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
  wrap.appendChild(getNode("div", article["title"], "page_title_label_separator"));

  return wrap;
}

function getCleanNavigationPanel(){
  while(document.body.firstChild){
    document.body.removeChild(document.body.firstChild);
  }
  return document.body;
}

function showHomePage(){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Home");
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
  info_1.appendChild(getNodeAndSetClick("div", "Maggiori informazioni su di me", "home_page_info_link", "avigation('info')"));

  info_2.appendChild(getNode("div",'Spazio per voi', "home_page_info_title"));
  info_2.appendChild(getNode("div", "Dubbi, cursiosità o suggerimenti sono ben accetti. <br>Chiunque voglia condividere la sua opinione può cliccare sul link qui sotto:", "home_page_info_text"));
  info_2.appendChild(getNodeAndSetClick("div", "Lascia un commento", "home_page_info_link", "avigation('comments')"));


  info_3.appendChild(getNode("div",'Altri articoli', "home_page_info_title"));
  info_3.appendChild(getNode("div", "Siamo spiacenti, non è stato trovato alcun articolo.", "home_page_info_box_fake"));


  wrap.appendChild(inline_info_wrap);

  base.appendChild(wrap);

  base.appendChild(pageCloser());
}

function showInfoPage(){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeaderInfo("Info");
  base.appendChild(toolbar);

  let wrap = getNode("div", null, "page_wrap");

  wrap.appendChild(getNode("div",'Mi presento', "home_page_title"));

  wrap.appendChild(getNode("div",'Ciao a tutti!', "home_page_text"));
  wrap.appendChild(getNode("div",'Sono Valentina, laureanda in mediazione linguistica all’Università SSML Gregorio VII di Roma.', "home_page_text"));

  wrap.appendChild(getNode("br",null,null));

  wrap.appendChild(getNode("div",'Ho un debole per le lingue straniere fin da quando ho memoria, una passione che inconsciamente mi è stata trasmessa da mia madre e dai suoi viaggi di lavoro all’estero, che puntualmente finivano per includere tutta la mia famiglia. Quei momenti di condivisione familiare li porto nel cuore e ne custodisco gelosamente il ricordo. Per me viaggiare ha un ruolo rilevante anche da un punto di vista personale perché è sempre stato in grado di appagare la mia incessante curiosità nei confronti dell’ambiente esterno.', "home_page_text"));

  wrap.appendChild(getNode("div",'Col tempo sono cresciuta e in me è cresciuto il desiderio di comprendere l’essenza di ciò che fino ad allora avevo solo osservato con gli occhi: la cultura, i costumi e le tradizioni dei luoghi che visitavo.', "home_page_text"));

  wrap.appendChild(getNode("div",'Ecco come è iniziato il mio viaggio con le lingue straniere.', "home_page_text"));
  wrap.appendChild(getNode("br",null,null));
  wrap.appendChild(getNode("br",null,null));

  wrap.appendChild(getNode("div",'Oggi, oltre alla mia lingua madre, posso affermare di avere una buona conoscenza della lingua inglese, spagnola e tedesca. Inoltre, sebbene sia ancora alle prime armi con l’arabo, mi piacerebbe in futuro poterlo aggiungere alla mia lista.', "home_page_text"));
  wrap.appendChild(getNode("br",null,null));
  wrap.appendChild(getNode("br",null,null));
  wrap.appendChild(getNode("br",null,null));

  wrap.appendChild(getNode("div",'Come nasce questo blog?', "home_page_text"));
  wrap.appendChild(getNode("div",
  "Questo blog si propone come angolo di condivisione affinché possa essere fonte di riflessioni tramite quelle che spero possano rivelarsi letture piacevoli e stimolanti. "+
  "Solitamente tengo molto alle opinioni degli altri, soprattutto quando non combaciano con le mie, perché sono convinta che rappresentino un’insostituibile fonte di ispirazione, che permette di donare una visione più ampia e aperta al cambiamento. "+
  "Per questo motivo ho aggiunto una sezione dedicata ai vostri commenti. "+
  "Il mio blog, dunque, nasce con l’intento di offrire un’opportunità di confronto e di approfondimento sui temi che tratterò."
  , "home_page_text"));

  wrap.appendChild(getNode("br",null,null));

  wrap.appendChild(getNode("div",
  'Come probabilmente avrete notato ispezionando il “Menu”, ho inserito la categoria "Indice Progetti SSML GREGORIO VII" dedicata agli articoli che saranno oggetto di valutazione per il corso universitario che sto seguendo di "Italian Art and Creative Culture". Mi farebbe piacere se qualche volta deste un’occhiata anche lì, dove periodicamente vi aggiornerò con delle curiosità particoli.'
    , "home_page_text"));

  wrap.appendChild(getNode("br",null,null));

  wrap.appendChild(getNode("div",
  'Buona lettura.'
    , "home_page_text"));




  base.appendChild(wrap);

  base.appendChild(pageCloser());

}

function showUnknownPage() {
  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Pagina sconosciuta");
  base.appendChild(toolbar);

  base.appendChild(getNode("div", "Siamo spiacenti, ma la pagina richiesta non esiste.", "article_count"));

  base.appendChild(pageCloser());
}

function showBlogIndexPage(){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Indice Articoli");
  base.appendChild(toolbar);

  if(ValeProgetti.Blogs.length == 1){
    base.appendChild(getNode("div", "È presente <strong>1</strong> articolo.", "article_count"));
  }else{
    base.appendChild(getNode("div", "Sono presenti <strong>" + ValeProgetti.Blogs.length.toString() + "</strong> articoli.", "article_count"));
  }

  base.appendChild(createIndex(ValeProgetti.Blogs));

  base.appendChild(pageCloser());

}

function showGregorioIndexPage(){

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Indice Progetti SSML Gregorio VII");
  base.appendChild(toolbar);

  if(ValeProgetti.Gregorios.length == 1){
    base.appendChild(getNode("div", "È presente <strong>1</strong> articolo.", "article_count"));
  }else{
    base.appendChild(getNode("div", "Sono presenti <strong>" + ValeProgetti.Gregorios.length.toString() + "</strong> articoli.", "article_count"));
  }

  base.appendChild(createIndex(ValeProgetti.Gregorios));

  base.appendChild(pageCloser());
}

function showCommentsPage() {
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
      let width = window.innerWidth;

      let menu_class = "";
      let buttons_class = "";

      if(width > 700){
        menu_class = "nav_main_menu";
        buttons_class = "nav_main_menu_button";
      }else{
        menu_class = "nav_main_menu_small_screen";
        buttons_class = "nav_main_menu_button_small_screen";
      }

      menu = getNode("div", null, menu_class);
      menu.id = "nav_main_menu";

      let voices = [
        {
            "label": Pages[0],
            "onclick": "setNavigation('home')"
        },
        {
            "label": Pages[1],
            "onclick": "setNavigation('info')"
        },
        {
            "label": Pages[2],
            "onclick": "setNavigation('index_blog')"
        },
        {
            "label": Pages[3],
            "onclick": "setNavigation('index_gregorio')"
        }
      ];

      for(let i = 0; i < voices.length; i++){
        let el = voices[i];
        let button = getNode("div", el["label"] , buttons_class);
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

function getUrlSection(segment) {

    if (segment != 0 && segment != 1) {
        return;
    }

    let default_page = "home";
    let curr_url = decodeURI(window.location.href);


    // has page defined
    if (curr_url.split("#").length > 1) {
        return curr_url.split("#")[segment];
    } else {
        window.location.href = encodeURI(window.location.href + "#" + default_page);
        return default_page;
    }
}


function setNavigation(pagerequest) {

    if (pagerequest != getUrlSection(1)) {
        let new_url = encodeURI(getUrlSection(0) + "#" + pagerequest);
        history.pushState(null, null, new_url);

        pageNavigate();
    }

    return ''; // chrome requires return value
}


function pageNavigate() {

    let page = getUrlSection(1);

    let page_no_args = page.split("?")[0];

    let found = false;

    if (page_no_args == "home") {
        found = true;
        showHomePage();
    }
    if (page_no_args == "info") {
        found = true;
        showInfoPage();
    }
    if (page_no_args == "index_blog") {
        found = true;
        showBlogIndexPage();
    }
    if (page_no_args == "index_gregorio") {
        found = true;
        showGregorioIndexPage();
    }
    if (page_no_args.substr(0,"article".length) == "article") {
        found = true;
        showArticlePage(page_no_args);
    }


    if(!found){
      showUnknownPage();
    }

    initSlideShowerEventListeners();

    handleResize();
}
