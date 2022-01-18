
let container = document.getElementsByClassName('container-fluid');

//Ancres Consoles
let anchorNintendo = document.getElementById("Nintendo");
let anchorPlaystation = document.getElementById("Playstation");
let anchorXbox = document.getElementById("Xbox");

//Listes des produits par catégorie
let listArticles = [];

//Ancre Panier
let Panier = document.getElementById("Panier")

//Créer objet product
function product(name, ref, price, img_src,qte,category_name, desc) {
    this.name = name;
    this.ref = ref;
    this.img_src = img_src;
    this.qte = qte;
    this.category_name = category_name;
    this.price = price;
    this.desc = desc;
  
  }

  //Créer objet category
  function category(category_name,listProducts)
  {
    this.category_name=category_name;
    this.listProducts= listProducts=[];

   
  }
    //associer produit à une catégorie
    function associateProductByCategorie(product,category)
    {
        if (product.category_name==category.category_name)
  {
      category.listProducts.push(product);
     
  }   
    }
    
    // Produits à déclarer
    
    let MetroidDread = new product("Metroid Dread", "01234","59.99",`img_products\\metroid-dread-shadows-i116583.jpg`,'1',"Nintendo","desc");
    let MarioKart = new product("MarioKart8 Deluxe", "56789","49.99","img_products\\MarioKart 8 Deluxe.jpg","1","Nintendo","desc");
    let GofOfWar = new product("GodOfWar","13579","69.99","img_products\\God of war.jpg","1","Playstation","desc");
    let Forza = new product("Forza","02468","69.99","img_products\\Forza.jpg","1","Xbox","desc");
    
    
    // Catégories à associer aux produits
    let Nintendo = new category("Nintendo","Switch");
    let Playstation = new category("Playstation","PS5");
    let Xbox = new category("Xbox","Xbox-series-X");
     
    associateProductByCategorie(MetroidDread,Nintendo);
    associateProductByCategorie(MarioKart,Nintendo);
    associateProductByCategorie(GofOfWar,Playstation);
    associateProductByCategorie(Forza,Xbox);
    


//Affiche les produits d'une categorie
  function displayProductsByCategory(category)
  {
      container[0].innerHTML="";
    
    for(let article of category.listProducts)
    {
        // à mettre dans une carte
        let div=document.createElement("div");
        let title= document.createElement('div');
        let body=document.createElement("div");
        let cadrimg = document.createElement("div")
        let img = document.createElement("img");
        let  desc= document.createElement("p");
        let price = document.createElement("p");

            title.classList.add("card-title", "py-3", "border-bottom", "border-dark", "w-100");
            title.textContent=article.name;
            div.classList.add("card","w-25","d-flex","align-items-center","m-3", "text-center","py-3","border-success");
            cadrimg.classList.add("cadrimg","h-75", 'w-100', 'd-flex',"overflow-hidden","mb-4");
            img.classList.add('w-100');
            img.src=article.img_src;
            body.classList.add("card-body", "w-100");
            desc.classList.add("card-text",'mb-4');
            desc.textContent=article.desc;
            price.classList.add("card-text");
            price.textContent=article.price+'€';
            
            container[0].append(div);
            div.append(title,body);
            body.append(cadrimg,desc,price);
            cadrimg.append(img);
           
            
            div.addEventListener("click", function LoadOneProduct()
            {
              container[0].innerHTML="";
              
              displayOneProduct(article)
            })
        
    }

  }
  anchorNintendo.addEventListener("click",function PageNintendo()
  {
      displayProductsByCategory(Nintendo);
      
  });
  anchorPlaystation.addEventListener("click", function PagePlaystation()
  {
    displayProductsByCategory(Playstation);
  });
  
  anchorXbox.addEventListener("click",function PageXbox()
  {
    displayProductsByCategory(Xbox);
  });


  

  function displayOneProduct(article)
  {
    let div=document.createElement("div");
    let title= document.createElement('div');
    let body=document.createElement("div");
    let cadrimg = document.createElement("div")
    let img = document.createElement("img");
    let  desc= document.createElement("p");
    let price = document.createElement("p");
    let purchaseButton = document.createElement("button"); 

      title.classList.add("card-title", "py-3", "border-bottom", "border-dark", "w-100");
      title.textContent=article.name;
      div.classList.add("card","w-25","d-flex","align-items-center","m-3", "text-center","border-success");
      cadrimg.classList.add("cadrimg","h-75", 'w-100', 'd-flex',"overflow-hidden");
      img.classList.add('w-100');
      img.src=article.img_src;
      body.classList.add("card-body", "w-100");
      desc.classList.add("card-text",'my-4');
      desc.textContent=article.desc;
      price.classList.add("card-text");
      price.textContent=article.price+'€';
      purchaseButton.classList.add("btn-success","rounded")
      purchaseButton.textContent="Ajouter au panier";

        
        container[0].append(div);
        div.append(title);
        div.append(cadrimg);
        cadrimg.append(img);
        div.append(body);
        body.append(desc,price,purchaseButton);

        purchaseButton.addEventListener("click", function LoadShoppingCart()
            {
              container[0].innerHTML="";
              registerClientChoice(article);
              displayClientChoice();
            })
    
  }

  // Panier
  //utiliser localStorage
  
  function registerClientChoice(article)
  {
    listArticles.push(article);
    registeredList =localStorage.setItem("shoppingCartList",JSON.stringify(listArticles));

  }

  function displayClientChoice()
  {
    container[0].innerHTML="";
  
    choices=JSON.parse(localStorage.getItem("shoppingCartList"));
    
    for (choice of choices)
    {
      
    let div=document.createElement("div");
    div.classList.add('border-bottom','border-warning','w-75','my-4', 'd-flex','flex-column', 'align-items-center','text-center')
    let title= document.createElement('div');
    title.classList.add("my-2")
    let body=document.createElement("div");
    let price = document.createElement("p");
    let ref = document.createElement("p");
    let qte = document.createElement("input");
    qte.setAttribute("type","number");
    qte.setAttribute("placeholder","1");
    let deleteButton = document.createElement("button");
   
  
    title.textContent=choice.name;
    price.textContent=choice.price+'€';
    ref.textContent="ref:"+choice.ref;
    qte.textContent=choice.qte;
    deleteButton.textContent="Enlever de votre liste";
    deleteButton.classList.add("my-2");
    



    container[0].append(div);
    div.append(title,body,deleteButton);
    body.append(price,ref,qte);

    qte.addEventListener('change',function calcPrice()
    {
      choice.qte=qte.value;
      qte.textContent = qte.value;      
   
    
    })

    deleteButton.addEventListener("click", function deleteAndReload()
    {
      deleteArticle(choice)
    })

    }

    let rowTotal = document.createElement("div");
    rowTotal.classList.add("row","w-100",'d-flex','justify-content-center','my-4');
    let displayTotal = document.createElement("button");
    displayTotal.classList.add("btn-success","rounded","text-center")

    displayTotal.textContent="Total";
    container[0].insertAdjacentElement("beforeend",rowTotal);
    rowTotal.append(displayTotal);
    displayPrice=document.createElement("p");
    container[0].insertAdjacentElement("beforeend",displayPrice);
    displayTotal.addEventListener("click",function Total()
    {
      
      let Total =[];
     
      for (choice of choices)
      {
        Total.push(choice.qte*choice.price);
        var priceTotal =Total.reduce((a,b)=>a+b,0).toFixed(2);
       
      }

      if (priceTotal>0)
      {
        
        displayPrice.textContent=priceTotal+"€";
        
      }
     

    })
    
      
  }


  function deleteArticle(choice)
  {
    listArticles.pop(choice);
    localStorage.setItem("shoppingCartList",JSON.stringify(listArticles));
    displayClientChoice();
  }

  Panier.addEventListener("click",function loadShoppingCart()
  {
    container[0].innerHTML="";
    displayClientChoice();
  })

// Affiche tous les produits
  function listProducts()
  {
      let listProduct = []
      listProduct.push(GofOfWar,MetroidDread,MarioKart,Forza)
        for (Product of listProduct)
        {
          let div=document.createElement("div");
          let title= document.createElement('div');
          let body=document.createElement("div");
          let cadrimg = document.createElement("div")
          let img = document.createElement("img");
          let  desc= document.createElement("p");
          
     
              title.classList.add("card-title", "py-3", "border-bottom", "border-dark", "w-100");
              title.textContent=Product.name;
              div.classList.add("card","w-25","d-flex","align-items-center","m-3", "text-center","py-3","border-success");
              cadrimg.classList.add("cadrimg","h-75", 'w-100', 'd-flex',"overflow-hidden","mb-4");
              img.classList.add('w-100');
              img.src=Product.img_src;
              body.classList.add("card-body", "w-100");
              desc.classList.add("card-text",'mb-4');
              desc.textContent=Product.desc;
             
              
              container[0].append(div);
              div.append(title,body);
              body.append(cadrimg,desc);
              cadrimg.append(img);
             
              
              div.addEventListener("click", function LoadOneProduct()
              {
                container[0].innerHTML="";
               
                displayOneProduct(Product)
              })
        }
  }

  

document.addEventListener("DOMContentLoaded",()=>{
  listProducts(product);
});

 





  