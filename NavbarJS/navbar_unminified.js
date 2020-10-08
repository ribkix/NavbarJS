const NavbarJS_ITEM_LINK = "NavbarJS_ITEM_LINK";
const NavbarJS_ITEM_BUTTON = "NavbarJS_ITEM_BUTTON";
const NavbarJS_ITEM_DIV = "NavbarJS_ITEM_DIV";

const NavbarJS_ARGMODE_VALUE = "NavbarJS_ARGMODE_VALUE";
const NavbarJS_ARGMODE_ATTRIBUTE = "NavbarJS_ARGMODE_ATTRIBUTE";
const NavbarJS_ARGMODE_CLASSLIST = "NavbarJS_ARGMODE_CLASSLIST";

var NavbarJS_custom_items = [];

var NavbarJS_navbar;

function NavbarJS_set_navbar(nav){
    NavbarJS_navbar = nav;
}

function NavbarJS_get_navbar(){
    return NavbarJS_navbar;
}

function NavbarJS_create_custom_item_type(config){
    if (config.name){
        if (config.elements){
            NavbarJS_custom_items.push(config);
        } else {
            console.error("NavbarJS: Specify the 'elements' value.");
        }
    } else {
        console.error("NavbarJS: Specify the 'name' value.");
    }
}

function NavbarJS_create_item(config){
    if (config.type == NavbarJS_ITEM_LINK){
        if (!config.ignore_li){
            var li = document.createElement("LI");
        }
        var lia = document.createElement("A");
        if (config.inner) {
            lia.innerHTML = config.inner;
        }
        if (config.id){
            lia.id = config.id;
        }
        if (config.href){
            lia.href = config.href;
        }
        if (config.target){
            lia.target = config.target;
        }
        if (config.classlist_item){
            for (var i=0;i<config.classlist_item.length;i++){
                li.classList.add(config.classlist_item[i]);
            }
        }
        if (config.classlist_link){
            for (var i=0;i<config.classlist_link.length;i++){
                lia.classList.add(config.classlist_link[i]);
            }
        }
        if (config.ignore_li){
            NavbarJS_navbar.appendChild(lia);
        } else {
            li.appendChild(lia);
        }
        if (config.parent){
            if (config.ignore_li){
                config.parent.appendChild(lia);
            } else {
                config.parent.appendChild(li);
            }
        } else {
            if (!config.ignore_li){
                NavbarJS_navbar.appendChild(li);
            }
        }
    } else if (config.type == NavbarJS_ITEM_BUTTON){
        if (!config.ignore_li){
            var li = document.createElement("LI");
        }
        var libutton = document.createElement("BUTTON");
        if (config.inner){
            libutton.innerHTML = config.inner;
        }
        if (config.id){
            libutton.id = config.id;
        }
        if (config.onclick){
            libutton.onclick = config.onclick;
        }
        if (config.classlist_item){
            for (var i=0;i<config.classlist_item.length;i++){
                li.classList.add(config.classlist_item[i]);
            }
        }
        if (config.classlist_button){
            for (var i=0;i<config.classlist_button.length;i++){
                libutton.classList.add(config.classlist_button[i]);
            }
        }
        if (config.ignore_li){
            NavbarJS_navbar.appendChild(libutton);
        } else {
            li.appendChild(libutton);
        }
        if (config.parent){
            if (config.ignore_li){
                config.parent.appendChild(libutton);
            } else {
                config.parent.appendChild(li);
            }
        } else {
            if (!config.ignore_li){
                NavbarJS_navbar.appendChild(li);
            }
        }
    } else if (config.type == NavbarJS_ITEM_DIV){
        if (!config.ignore_li){
            var li = document.createElement("LI");
        }
        var lidiv = document.createElement("DIV");
        if (config.inner){
            lidiv.innerHTML = config.inner;
        }
        if (config.id){
            lidiv.id = config.id;
        }
        if (config.classlist_item){
            for (var i=0;i<config.classlist_item.length;i++){
                li.classList.add(config.classlist_item[i]);
            }
        }
        if (config.classlist_div){
            for (var i=0;i<config.classlist_div.length;i++){
                lidiv.classList.add(config.classlist_div[i]);
            }
        }
        if (config.ignore_li){
            NavbarJS_navbar.appendChild(lidiv);
        } else {
            li.appendChild(lidiv);
        }
        if (config.parent){
            if (config.ignore_li){
                config.parent.appendChild(lidiv);
            } else {
                config.parent.appendChild(li);
            }
        } else {
            if (!config.ignore_li){
                NavbarJS_navbar.appendChild(li);
            }
        }
    } else {
        var success = false;
        var type;
        for (var i=0;i<NavbarJS_custom_items.length;i++){
            if (NavbarJS_custom_items[i].name == config.type){
                type = NavbarJS_custom_items[i];
                success = true;
                break;
            }
        }
        if (success){
            var items = [];
            for (var i=0;i<type.elements.length;i++){
                if (type.elements[i].type){
                    var ip = document.createElement(type.elements[i].type);
                    items.push(ip);
                } else {
                    console.error("NavbarJS: Type '" + type.name + "' element " + i.toString() + " doesn't have the 'type' value.")
                }
                if (type.elements[i].arguments){
                    for (var a=0;a<type.elements[i].arguments.length;a++){
                        if (type.elements[i].arguments[a].mode){
                            if (type.elements[i].arguments[a].value != null){
                                if (type.elements[i].arguments[a].name){
                                    if (type.elements[i].arguments[a].mode == NavbarJS_ARGMODE_VALUE){
                                        eval("ip." + type.elements[i].arguments[a].value + " = config." + type.elements[i].arguments[a].name);
                                    } else if (type.elements[i].arguments[a].mode == NavbarJS_ARGMODE_ATTRIBUTE){
                                        eval("ip.setAttribute(\"" + type.elements[i].arguments[a].value + "\",config." + type.elements[i].arguments[a].name + ");");
                                    } else if(type.elements[i].arguments[a].mode == NavbarJS_ARGMODE_CLASSLIST){
                                        eval("for (var b=0;b<config." + type.elements[i].arguments[a].name + ".length;b++){ip.classList.add(config." + type.elements[i].arguments[a].name + "[b])};")
                                    }
                                } else {
                                    console.error("NavbarJS: Type '" + type.name + "' element " + i.toString() + " argument " + a.toString() + " doesn't have the 'name' value.");
                                }
                            } else {
                                console.error("NavbarJS: Type '" + type.name + "' element " + i.toString() + " argument " + a.toString() + " doesn't have the 'value' value.");
                            }
                        } else {
                            console.error("NavbarJS: Type '" + type.name + "' element " + i.toString() + " argument " + a.toString() + " doesn't have the 'mode' value.");
                        }
                    }
                }
                if (type.elements[i].parent != null){
                    items[type.elements[i].parent].appendChild(ip);
                } else {
                    if (config.parent){
                        config.parent.appendChild(ip);
                    } else {
                        NavbarJS_navbar.appendChild(ip);
                    }
                }
            }
        } else {
            console.error("NavbarJS: Failed getting type, or the type you specified doesn't exist or you didn't specify it at all.");
        }
    }
}