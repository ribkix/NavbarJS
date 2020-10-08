NavbarJS_set_navbar(document.getElementById("navbar"));

var page = location.pathname.split("/").pop().replace(".html","");

var classlist_home, classlist_download, classlist_docs;
if (page == "index" || page == ""){
    classlist_home = ["uk-active"];
} else if (page == "download"){
    classlist_download = ["uk-active"];
} else if (page == "docs"){
    classlist_docs = ["uk-active"];
}

NavbarJS_create_item({
    type: NavbarJS_ITEM_LINK,
    classlist_link: ["uk-navbar-item","uk-logo"],
    href: "index.html",
    inner: "<img src=\"./img/logo.png\" width=\"50px\">",
    parent: document.getElementById("navbar-left"),
    ignore_li: true
});
NavbarJS_create_item({
    type: NavbarJS_ITEM_LINK,
    inner: "Home",
    href: "index.html",
    classlist_item: classlist_home
});
NavbarJS_create_item({
    type: NavbarJS_ITEM_LINK,
    inner: "Download",
    href: "download.html",
    classlist_item: classlist_download
});
NavbarJS_create_item({
    type: NavbarJS_ITEM_LINK,
    inner: "Docs",
    href: "docs.html",
    classlist_item: classlist_docs
});
NavbarJS_create_item({
    type: NavbarJS_ITEM_LINK,
    inner: "Support",
    href: "mailto:mr.bruh.dev@gmail.com",
    target: "_blank"
});

document.getElementById("navbar-left").removeAttribute("id");

hljs.initHighlightingOnLoad();