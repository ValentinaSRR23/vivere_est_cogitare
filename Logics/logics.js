2
var Pages = ["Home", "Info", "Indice Articoli", "Indice Progetti SSML Gregorio VII", "Comunità"];

var DynamiClasses = [
  "home_page_button",
  "toolbar_label",
  "toolbar_nav_label",
  "nav_main_menu",
  "nav_main_menu_button",
  "home_page_info_title",
  "home_page_info_text",
  "home_page_info_link",
  "page_title_label_separator",
  "article_count",
  "article_content_link_label",
  "sign_input_text",
  "sign_input_area"
];


function isNullOrUndefined(value) {
  return value === undefined || value == null;
}

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

async function boot() {

  // must be first thing
  initAllWorks();

  window.addEventListener('hashchange', pageNavigate, false);
  pageNavigate();

  await visitorsGetAll();

  sendVisitorIfNewVisit();
}

function sendVisitorIfNewVisit() {
  if(localStorage.getItem("did_visit") == null){
    localStorage.setItem("did_visit", "true");
    let amount = JSON.parse(localStorage.getItem("visitors"));
    amount = amount + 1;
    localStorage.setItem("visitors", JSON.stringify(amount));
    visitorsSendToDB();
  }
}


function handleResize() {

  document.body.style.fontSize = "";

  let width = window.outerWidth;

  if(width < 650) {
    document.body.style.fontSize = "0.7rem";
  }
  else if(width < 800) {
    document.body.style.fontSize = "0.8rem";
  }
  else if(width < 1000) {
    document.body.style.fontSize = "0.9rem";
  }
  else{
    document.body.style.fontSize = "1rem";
  }

  resizeComplexElements(width);

}

function getDynamicElements(className) {
  let elements = document.getElementsByClassName(className);
  if(elements.length == 0){
    elements = document.getElementsByClassName(className + "_small_screen");
  }

  let list = [];
  for(let i = 0; i < elements.length;i++){
    list.push(elements[i]);
  }

  return list;
}

function toggleDynamiClass(element_list, baseclass, isToggle){
  for(let i = 0; i < element_list.length; i++){
    let element = element_list[i];

    if(isToggle){
      element.className = baseclass;
    }else{
      element.className = baseclass + "_small_screen";
    }

  }
}


function resizeComplexElements(width){

  let dynamicClasses = DynamiClasses;

  let dynamics = [];
  for(let i = 0; i < dynamicClasses.length; i++){
    let dclass = dynamicClasses[i];
    dynamics.push([getDynamicElements(dclass),dclass]);
  }

  let toggle = width > 700;
  for(let i = 0; i < dynamics.length; i++){
    let current = dynamics[i];
    toggleDynamiClass(current[0], current[1], toggle);
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

    let wrap = getNode("div", null, "page_wrap");
    wrap.appendChild(getNode("div", article["title"],"home_page_title"));
    wrap.appendChild(getNode("div", article["content"], "article_page_wrap"));

    base.appendChild(wrap);

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
  wrap.appendChild(getNode("div", "- " + article["main_title"] + " -", "page_title_label_separator"));

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
  button.setAttribute("onclick","findOutMore()");
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
  info_1.appendChild(getNodeAndSetClick("div", "Maggiori informazioni su di me", "home_page_info_link", "setNavigation('info')"));

  info_2.appendChild(getNode("div",'Spazio per voi', "home_page_info_title"));
  info_2.appendChild(getNode("div", "Dubbi, cursiosità o suggerimenti sono ben accetti. <br>Chiunque voglia condividere la sua opinione può cliccare sul link qui sotto:", "home_page_info_text"));
  info_2.appendChild(getNodeAndSetClick("div", "Lascia un commento", "home_page_info_link", "setNavigation('comments')"));


  info_3.appendChild(getNode("div",'Altri articoli', "home_page_info_title"));
  info_3.appendChild(getNode("div", "Siamo spiacenti, non è stato trovato alcun articolo.", "home_page_info_box_fake"));


  wrap.appendChild(inline_info_wrap);

  base.appendChild(wrap);

  base.appendChild(pageCloser());
}

function findOutMore() {
  if(ValeProgetti.Blogs.length == 0){
    setNavigation("empty_page");
  }else{
    setNavigation("article_" + ValeProgetti.Blogs[0]["id"]);
  }
}

function showEmptyPage() {
  let base = getCleanNavigationPanel();
  let toolbar = getPageHeaderInfo("Pagina in arrivo");
  base.appendChild(toolbar);

  let wrap = getNode("div", null, "page_wrap");

  wrap.appendChild(getNode("div",'Articolo in costruzione', "home_page_title"));

  wrap.appendChild(getNode("div","In questa pagina apparirà il primo articolo dell'indice dei Blog appena sarà disponibile.", "home_page_text"));


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
  'Come probabilmente avrete notato ispezionando il “Menu”, ho inserito la categoria “Indice Progetti SSML GREGORIO VII” dedicata agli articoli che saranno oggetto di valutazione per il corso universitario che sto seguendo di “Italian Art and Creative Culture”. Mi farebbe piacere se qualche volta deste un’occhiata anche lì, dove periodicamente vi aggiornerò con delle curiosità particoli.'
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

async function showCommentsListPage() {

  toggleApiSpinner(true);
  await commentGetAll();
  toggleApiSpinner(false);

  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Comunità");
  base.appendChild(toolbar);

  let wrap = getNode("div", null, "page_wrap");

  wrap.appendChild(getNode("div",'Commenti di tutti gli utenti', "home_page_title"));

  wrap.appendChild(getNode("br",null,null));
  wrap.appendChild(getNode("div", "Dubbi, cursiosità o suggerimenti sono ben accetti. Chiunque voglia condividere la sua opinione può andare al <div class=\"home_page_info_link_inline\" onclick=\"setNavigation('comments')\">form per i commenti</div>.", "home_page_text"));
  wrap.appendChild(getNode("div", "Il tuo commento sarà subito reso visibile assieme agli altri commenti del sito. I commenti con contenuti inadatti saranno rimossi appena individuati.", "home_page_text"));

  wrap.appendChild(getCommentsFromAllUsers());

  base.appendChild(wrap);

  base.appendChild(pageCloser());
}

function getCommentsFromAllUsers() {

  let comments = JSON.parse(localStorage.getItem("comments"));

  if(comments == null){
    return getNode("div",null,"comments_main_wrap");
  }

  let main = getNode("div",null,"comments_main_wrap");

  for(let i = 0; i < comments.length; i++){

    let wrap = getNode("div",null, "comment_wrap");
    let sign = getNode("div","Inviato da: " + comments[i]["sign"], "comment_sign");
    let text = getNode("div",comments[i]["text"], "comment_text");

    wrap.appendChild(sign);
    wrap.appendChild(text);

    main.appendChild(wrap);
  }

  return main;
}

function showCommentsPage() {
  let base = getCleanNavigationPanel();
  let toolbar = getPageHeader("Condivisione");
  base.appendChild(toolbar);

  let wrap = getNode("div", null, "page_wrap");

  wrap.appendChild(getNode("div",'Lascia un commento', "home_page_title"));

  wrap.appendChild(getNode("div", "In questa sezione potete lasciare un commento che rimarrà visibile sul sito. Non occorre essere registrati. I commenti da noi ritenuti non idonei saranno eliminati appena individuati.", "home_page_text"));

  wrap.appendChild(getAcceptCommentNode());
  wrap.appendChild(getNode("br",null,null));
  wrap.appendChild(getNode("div", "Una volta aggiunto il commento, sarai reindirizzato alla pagina della Comunità.", "home_page_text"));

  base.appendChild(wrap);

  base.appendChild(pageCloser());
}

function getAcceptCommentNode() {

  let w = getNode("div", null, null);
  w.style.marginTop = "2em";

  let firma_label = getNode("div", "Firma", "sign_input_label");
  let firma_input = getNode("input", null, "sign_input_text");
  firma_input.id = "comment_sign";
  firma_input.placeholder = "La tua firma";
  firma_input.setAttribute("maxlength", "50");

  let commento_label = getNode("div", "Il tuo commento", "sign_input_label");
  let commento_input = getNode("textarea", null, "sign_input_area");
  commento_input.id = "comment_text";
  commento_input.setAttribute("maxlength", "400");
  commento_input.placeholder = "Il tuo commento";

  let comment_error = getNode("div",null, "comment_error");
  comment_error.id = "comment_error";

  let button = getNode("div", "Commenta".toUpperCase(), "home_page_button");
  button.setAttribute("onclick","postComment()");


  w.appendChild(firma_label);
  w.appendChild(firma_input);
  w.appendChild(commento_label);
  w.appendChild(commento_input);
  w.appendChild(comment_error);
  w.appendChild(button);

  return w;
}

function tellCommentError(error_msg) {
  let error = document.getElementById("comment_error");
  error.innerHTML = error_msg;
  error.style.display = "block";
}

async function postComment() {

  let sign = document.getElementById("comment_sign").value;
  let text = document.getElementById("comment_text").value;

  let error = document.getElementById("comment_error");
  error.style.display = "none";

  if(sign.length < 5){
    tellCommentError("Errore: devi inserire la tua firma, e deve essere almeno di 5 caratteri.");
    return;
  }
  if(text.length < 30){
    tellCommentError("Errore: devi inserire il tuo commento, e deve essere almeno di 30 caratteri.");
    return;
  }

  let comments = JSON.parse(localStorage.getItem("comments"));
  comments.push({"sign": sign, "text": text});
  localStorage.setItem("comments", JSON.stringify(comments));

  toggleApiSpinner(true);
  await commentSendToDB();
  toggleApiSpinner(false);
  setNavigation("comments_list");
}

function toggleApiSpinner(toggle) {

  if(toggle){
    document.body.style.overflow = "hidden";

    let inkdrop = getNode("div",null,"spinner_ink_drop");
    inkdrop.id = "spinner_ink_drop";
    let spinner = getNode("div",null,"spinner");
    inkdrop.appendChild(spinner);
    document.body.appendChild(inkdrop);

  }else{
    document.body.style.overflow = "";

    let inkdrop = document.getElementById("spinner_ink_drop");
    document.body.removeChild(inkdrop);
  }
}

function pageCloser() {

  let v = JSON.parse(localStorage.getItem("visitors"));
  if(v == null){
    setTimeout(lateVisitorsUpdate,1000);
    v = 0;
  }

  let cl = document.createElement("div");
  cl.innerHTML = "<br><br><br><br><div id=\"visitors_counter\"class=\"number_of_visitors\">Visitatori del sito: "+v.toString()+"</div><br><br><br><br><br><br><br><br><br><br>";
  return cl;
}

function lateVisitorsUpdate() {
  let v = JSON.parse(localStorage.getItem("visitors"));
  if(v == null){
    setTimeout(lateVisitorsUpdate,1000);
    return;
  }
  let l = document.getElementById("visitors_counter");
  l.innerHTML = "Visitatori del sito: "+v.toString();
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
      let width = window.outerWidth;

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
        },
        {
            "label": Pages[4],
            "onclick": "setNavigation('comments_list')"
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
    if(page_no_args == "empty_page"){
      found = true;
      showEmptyPage();
    }
    if(page_no_args == "comments"){
      found = true;
      showCommentsPage();
    }
    if(page_no_args == "comments_list"){
      found = true;
      showCommentsListPage();
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

    document.body.scrollTop = 0;
}
