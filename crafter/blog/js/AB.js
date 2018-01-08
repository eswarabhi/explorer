define(['jquery'],function(){

    var obj={
      init:function(){
        //Caching DomElements :)

        this.searchBox=$("input[name='search']");
        this.nav=$(".nav");
        this.nav_li=$(".nav li");
        this.searchIcon=$(".fa-search");
        this.menuBtn=$(".fa-bars");
        this.bindEvents();
      },
      bindEvents:function(){
        var pointer=this;
        //search Bar Expand : Input handler
        this.searchIcon.on("click",function(){
          pointer.searchIcon.toggleClass("search_icon_toggle");
          pointer.searchBox.toggleClass("search_toggle");
        });
        //search box input : Input handler
        this.searchBox.on("input",function(){


        });
        //menu item : click handler
        this.nav_li.click(function(){
              $(".body_title").text($(this).text());
              pointer.toggleMenuList();
        });
        //mobile menu btn: Click handler
        this.menuBtn.on("click",function(){
          pointer.toggleMenuList();
        });
      },
      toggleMenuList:function(){
        this.nav.toggleClass("m_nav");

      }
    }; //end of module definition
    obj.init();
});
