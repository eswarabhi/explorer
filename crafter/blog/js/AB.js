define(['jquery'],function(){

    var obj={
      init:function(){
        //Caching DomElements :)

        this.searchBox=$("input[name='search']");
        this.nav=$(".nav");
        this.searchIcon=$(".fa-search");
        this.menuBtn=$(".fa-bars");
        this.resolutionCheck();
        this.bindEvents();
      },
      resolutionCheck:function(){
        var pointer=this;
        if(window.innerWidth<800)
        {
          this.toggleMenuList();//for hiding the menu list
          pointer.searchIcon.css({"position":"absolute","right":"60px"});
          pointer.searchBox.closest(".search").css({"display": 'flex',"width":"100%"});
          pointer.menuBtn.css("display","block");
          pointer.nav.find("li").each(function(){
            //for adding the borders to menu list
            $(this).toggleClass("m_nav_li");

          });

          pointer.searchBox.removeClass("search_bar").addClass("m_search_bar");
        }
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
